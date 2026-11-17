/**
 * '직접 해 보기'의 엔진 — 작은 창(iframe)을 띄우고, 그 안에서 난 일을 기록 줄로 옮긴다.
 *
 * 작은 창은 public/labs/html/play.html이다. 블로그와 같은 출처라 이 페이지가 그 창의
 * window를 그대로 만질 수 있다. 그래서 흉내가 아니라 브라우저가 실제로 낸 이벤트를 받아 적는다.
 * 코드는 iframe 요소에 실어 두고(lab.code), play.html이 읽는 도중 document.write로 써 넣는다.
 * 주소(?code=)로 넘기지 않는 이유는, 그러면 누구나 링크 하나로 이 출처에서 스크립트를 돌릴 수
 * 있어서다. frameElement는 같은 출처의 부모 안에서만 보이므로 그 길이 막힌다.
 *
 * 브라우저에서만 돈다(LiveLab이 마운트된 뒤에 만든다).
 */

export type LabCheck = { label: string; expr: string };

export type LabTag = "click" | "addr" | "guess" | "real" | "stop" | "ready" | "out" | "err";

export type LabRow = { id: number; tag: LabTag | "sep"; text: string; ms: string };

/** 기록 줄의 꼬리표 — 무엇이 적은 줄인지 */
export const LAB_TAGS: Record<LabTag, string> = {
  click: "클릭",
  addr: "주소",
  guess: "예상",
  real: "실제",
  stop: "막힘",
  ready: "준비",
  out: "출력",
  err: "에러",
};

export type LabOptions = {
  checks?: LabCheck[];
  logFocus?: boolean;
  logInput?: boolean;
};

export type LabOutput = {
  rows: (rows: LabRow[]) => void;
  url: (url: string) => void;
  checks: (values: string[]) => void;
};

const PLAY = "/labs/html/play.html";
const CHANNEL = "html-lab";
/** 누른 뒤 이만큼 아무 일이 없으면 '조용했다'고 적는다 */
const QUIET_MS = 1500;
/** 이보다 가까운 두 클릭은 한 번의 동작이다 (label을 누르면 input에도 클릭이 간다) */
const SAME_ACT_MS = 80;
const MAX_ROWS = 300;

type LabHost = HTMLIFrameElement & {
  lab?: { code: string; early: (win: Window) => void };
};

type ToggleLike = Event & { newState?: string; oldState?: string };

// ── 모양 만들기 ──────────────────────────────────────────

const clip = (text: string, max = 60) => (text.length > max ? `${text.slice(0, max - 1)}…` : text);

/** 비어 있어도 뜻이 있는 속성 — 이름만 적으면 안 된다 */
const KEEP_EMPTY = new Set(["href", "src", "alt", "value", "action", "srcset", "name", "title"]);

/** <a href="…" target="_blank"> — 기록에 요소를 적을 때의 모양 */
export function openTag(el: Element): string {
  const attrs = Array.from(el.attributes).map((attr) => {
    if (attr.name.startsWith("on") || attr.name === "style" || attr.name === "srcdoc") {
      return `${attr.name}="…"`;
    }
    if (attr.value === "" && !KEEP_EMPTY.has(attr.name)) return attr.name;
    return `${attr.name}="${clip(attr.value, 48)}"`;
  });
  return `<${el.localName}${attrs.length > 0 ? ` ${attrs.join(" ")}` : ""}>`;
}

const isElement = (value: unknown): value is Element =>
  typeof value === "object" && value !== null && (value as Node).nodeType === 1;

const isList = (value: unknown): value is ArrayLike<unknown> =>
  Array.isArray(value) ||
  (typeof value === "object" &&
    value !== null &&
    typeof (value as NodeList).length === "number" &&
    typeof (value as NodeList).item === "function");

/** 지금 값·출력 줄에 적을 모양. 작은 창의 객체라 instanceof 대신 모양으로 가린다 */
export function formatValue(value: unknown, depth = 0): string {
  if (typeof value === "string") {
    /* 식이 이미 JSON.stringify로 감싼 글자면(\n을 보이게 하려고) 다시 감싸지 않는다 */
    if (/^"[\s\S]*"$/.test(value)) {
      try {
        JSON.parse(value);
        return value;
      } catch {
        /* 따옴표로 시작하고 끝날 뿐인 보통 글자 */
      }
    }
    return value.includes("\n") ? value : JSON.stringify(value);
  }
  if (value === null || value === undefined) return String(value);
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value);
  }
  if (typeof value === "function") return "(함수)";
  if (isElement(value)) return openTag(value);
  if (depth > 1) return "…";
  if (isList(value)) {
    const items = Array.from(value);
    const shown = items.slice(0, 12).map((item) => formatValue(item, depth + 1));
    return `[${shown.join(", ")}${items.length > 12 ? `, … 모두 ${items.length}개` : ""}]`;
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

const hashOf = (url: string) => {
  const at = url.indexOf("#");
  return at < 0 ? "(# 없음)" : url.slice(at);
};

const stripHash = (url: string) => {
  const parsed = new URL(url);
  parsed.hash = "";
  return parsed.href;
};

// ── 예상: 브라우저 규칙을 그대로 옮겨 어느 길로 갈지 미리 읽는다 ─────────

export type Guess = { text: string; quiet?: string };

type LinkLike = Pick<HTMLAnchorElement, "href" | "target" | "getAttribute" | "hasAttribute">;

/**
 * 링크를 누르면 브라우저가 고르는 길 — HTML 표준의 '하이퍼링크 따라가기' 순서대로 본다.
 * download → javascript: → 외부 앱(mailto:, tel:) → 다른 창(target) → 조각(#) → 새 문서.
 */
export function predictLink(a: LinkLike, here: string, inFrame: boolean): Guess {
  const url = new URL(a.href);
  const origin = new URL(here).origin;
  if (a.hasAttribute("download")) {
    return url.origin === origin
      ? {
          text: "download가 있고 같은 출처입니다. 이동하지 않고 파일로 저장합니다.",
          quiet: "문서는 그대로입니다. 파일이 내려받기 목록에 들어갔습니다.",
        }
      : { text: "download가 있지만 다른 출처라 무시합니다. 그냥 이동합니다." };
  }
  if (url.protocol === "javascript:") {
    return {
      text: "주소가 아니라 코드입니다. 지금 문서에서 이 코드를 실행합니다.",
      quiet: "문서는 그대로입니다. 코드만 실행됐습니다.",
    };
  }
  if (["mailto:", "tel:", "sms:"].includes(url.protocol)) {
    return {
      text: `${url.protocol}은 웹 문서의 주소가 아닙니다. 문서를 바꾸지 않고 주소를 운영체제에 넘깁니다.`,
      quiet: "pagehide, load가 없습니다. 문서는 그대로이고, 주소는 운영체제로 넘어갔습니다.",
    };
  }
  const target = a.target.toLowerCase();
  if (target === "_blank") {
    return {
      text: "새 탭을 만들고 거기서 엽니다. 이 작은 창은 그대로입니다.",
      quiet: "이 작은 창에는 아무 이벤트도 없습니다.",
    };
  }
  if (inFrame && (target === "_top" || target === "_parent")) {
    return { text: `${target}이라 작은 창이 아니라 바깥 페이지(이 블로그) 전체가 이동합니다.` };
  }
  if (target !== "" && target !== "_self") {
    return {
      text: `이름이 "${a.target}"인 창을 찾습니다. 없으면 새 탭을 만들어 그 이름을 붙입니다.`,
    };
  }
  const raw = a.getAttribute("href") ?? "";
  if ((url.hash !== "" || raw.endsWith("#")) && stripHash(url.href) === stripHash(here)) {
    return {
      text: "# 앞부분이 지금 문서와 같습니다. 문서를 새로 받지 않고 # 뒤 이름을 찾아 스크롤합니다.",
      quiet: "문서는 그대로입니다. 이미 그 자리라 스크롤도 없습니다.",
    };
  }
  if (url.href === stripHash(here))
    return { text: "# 없는 지금 주소와 같습니다. 문서를 새로 받습니다." };
  if (url.origin !== origin) {
    return { text: "다른 출처의 주소입니다. 지금 문서를 내리고 그 사이트의 문서를 받습니다." };
  }
  return { text: "같은 사이트의 다른 주소입니다. 지금 문서를 내리고 새 문서를 받습니다." };
}

const CLICKY_INPUTS = new Set([
  "checkbox",
  "radio",
  "submit",
  "reset",
  "button",
  "image",
  "file",
  "color",
]);

/** 링크가 아닌 것을 눌렀을 때의 기본 동작 */
function predictControl(el: Element): string | null {
  const tag = el.localName;
  if (tag === "summary") {
    const details = el.parentElement;
    if (details?.localName !== "details")
      return "details 안의 첫 summary가 아니라 아무 동작도 없습니다.";
    return `부모 <details>를 ${(details as HTMLDetailsElement).open ? "닫습니다" : "엽니다"}. toggle 이벤트가 뒤따릅니다.`;
  }
  if (tag === "label") {
    const control = (el as HTMLLabelElement).control;
    return control
      ? `연결된 칸 ${openTag(control)}에 클릭을 넘깁니다.`
      : "연결된 칸이 없습니다. 눌러도 아무 일이 없습니다.";
  }
  const control = el as HTMLButtonElement | HTMLInputElement;
  if (control.disabled) return "disabled라 아무 동작도 하지 않습니다.";
  const popover = control.popoverTargetElement;
  if (popover) {
    const action = control.popoverTargetAction;
    const verb = action === "show" ? "엽니다" : action === "hide" ? "닫습니다" : "열거나 닫습니다";
    return `popovertarget이라 #${popover.id} 팝오버를 ${verb}. 스크립트 없이 브라우저가 합니다.`;
  }
  const commandFor = control.getAttribute("commandfor");
  if (tag === "button" && commandFor) {
    return `commandfor라 #${commandFor}에 "${control.getAttribute("command")}" 명령을 보냅니다. 스크립트 없이 브라우저가 합니다.`;
  }
  const type = control.type;
  if (type === "checkbox" || type === "radio")
    return "체크 상태를 바꿉니다. 이어서 input, change 이벤트가 납니다.";
  if (type === "file") return "파일을 고르는 창을 엽니다.";
  if (type === "submit" || type === "image") {
    const form = control.form;
    if (!form) return "폼 밖에 있어 보낼 폼이 없습니다. 아무 일도 없습니다.";
    const said =
      tag === "button" && !control.hasAttribute("type")
        ? "type을 적지 않아 기본값 submit입니다. "
        : "";
    const skip = form.noValidate || control.formNoValidate;
    return `${said}${openTag(form)}을 보냅니다. ${skip ? "검증은 건너뜁니다." : "보내기 전에 칸을 검증합니다."}`;
  }
  if (type === "reset") return "폼의 칸을 처음 값으로 되돌립니다.";
  return `type="${type}"은 기본 동작이 없습니다. onclick 같은 페이지 코드만 돕니다.`;
}

const VALIDITY_KEYS = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooLong",
  "tooShort",
  "rangeUnderflow",
  "rangeOverflow",
  "stepMismatch",
  "badInput",
  "customError",
] as const;

// ── 새 탭에서 열린 target.html의 도착 알림 ───────────────────

/** 마지막으로 누른 블록 — 새 탭의 도착 소식을 이 블록의 기록에 적는다 */
const newTab: { lastActive: LabEngine | null } = { lastActive: null };
let channel: BroadcastChannel | null = null;

function listenToNewTabs() {
  if (channel || typeof BroadcastChannel === "undefined") return;
  channel = new BroadcastChannel(CHANNEL);
  channel.onmessage = ({
    data,
  }: MessageEvent<{ inFrame: boolean; opener: boolean; referrer: string }>) => {
    if (data.inFrame || !newTab.lastActive) return;
    newTab.lastActive.note(
      `새 탭에 target.html이 열렸습니다. window.opener = ${data.opener ? "있음" : "null"}, document.referrer = ${data.referrer || '""'}`,
    );
  };
}

// ── 엔진 ────────────────────────────────────────────────

export class LabEngine {
  started = false;
  private frame: LabHost | null = null;
  private rows: LabRow[] = [];
  private nextId = 0;
  private gen = 0;
  private firstLoad = true;
  private t0 = 0;
  private lastAct = Number.NEGATIVE_INFINITY;
  private before = { y: 0, len: 0, href: "" };
  private realCount = 0;
  private act = { invalid: 0, submit: false, submitButton: false };
  private hooked = new WeakSet<Window>();
  private scrollRow: LabRow | null = null;
  private scrollRowAct = 0;
  private scrollTimer = 0;
  private emitQueued = false;
  private checksQueued = 0;
  private lastUrl = "";
  private lastChecks = "";

  constructor(
    private box: HTMLElement,
    private opts: LabOptions,
    private out: LabOutput,
  ) {
    listenToNewTabs();
  }

  /** 코드를 새 작은 창에 넣는다 — 기록도 처음부터 */
  run(code: string) {
    this.started = true;
    this.gen += 1;
    const gen = this.gen;
    this.rows = [];
    this.emit();
    this.t0 = performance.now();
    this.lastAct = Number.NEGATIVE_INFINITY;
    this.firstLoad = true;
    this.scrollRow = null;
    this.lastUrl = "";
    this.lastChecks = "";
    const frame = document.createElement("iframe") as LabHost;
    frame.title = "직접 해 보기의 작은 창";
    frame.lab = {
      code,
      early: (win) => {
        if (gen === this.gen) this.early(win);
      },
    };
    frame.addEventListener("load", () => {
      if (gen === this.gen) this.onLoad();
    });
    frame.src = PLAY;
    this.box.replaceChildren(frame);
    this.frame = frame;
  }

  /** 주소창 옆 새로 고침 — 작은 창의 location.reload() */
  reload() {
    const win = this.win();
    if (!win) {
      this.log("stop", "다른 출처의 문서라 이 페이지에서 새로 고칠 수 없습니다.");
      return;
    }
    this.begin(win, true);
    this.log(
      "click",
      `작은 창의 새로 고침을 눌렀습니다. 서버에 ${win.location.href}을 다시 묻습니다.`,
    );
    win.location.reload();
  }

  /** 화면에 보이는 동안 0.4초마다 — 주소와 지금 값을 다시 읽는다 */
  tick() {
    if (!this.frame) return;
    const win = this.win();
    const url = win ? win.location.href : "(다른 출처라 주소를 읽을 수 없습니다)";
    if (url !== this.lastUrl) {
      this.lastUrl = url;
      this.out.url(url);
    }
    this.refreshChecks();
  }

  dispose() {
    this.gen += 1;
    window.clearTimeout(this.scrollTimer);
    window.clearTimeout(this.checksQueued);
    this.box.replaceChildren();
    this.frame = null;
    if (newTab.lastActive === this) newTab.lastActive = null;
  }

  /** 새 탭 같은 바깥 소식 — 실제 줄로 적는다 */
  note(text: string) {
    this.real(text);
  }

  // ── 작은 창 안 ──

  private win(): Window | null {
    try {
      const win = this.frame?.contentWindow ?? null;
      void win?.location.href;
      return win;
    } catch {
      return null;
    }
  }

  /** play.html이 코드를 쓰기 직전에 부른다 — 코드가 읽히는 동안 나는 일까지 잡으려고 */
  private early(win: Window) {
    this.log(
      "ready",
      this.firstLoad
        ? "작은 창(play.html)이 위 코드를 문서에 씁니다."
        : "새 문서라 play.html이 위 코드를 처음부터 다시 씁니다.",
    );
    const gen = this.gen;
    const con = (win as Window & typeof globalThis).console;
    const relay =
      (tag: LabTag, original: (...args: unknown[]) => void) =>
      (...args: unknown[]) => {
        original(...args);
        if (gen !== this.gen) return;
        this.log(
          tag,
          args.map((arg) => (typeof arg === "string" ? arg : formatValue(arg))).join(" "),
        );
      };
    con.log = relay("out", con.log.bind(con));
    con.info = relay("out", con.info.bind(con));
    con.error = relay("err", con.error.bind(con));
    this.hook(win);
  }

  private onLoad() {
    const win = this.win();
    if (this.firstLoad) {
      this.firstLoad = false;
      this.log("ready", "작은 창의 load가 났습니다. 이제 눌러 보세요.");
    } else if (!win) {
      this.real(
        "load: 다른 출처의 새 문서가 열렸습니다. 보안 규칙 때문에 그 문서의 주소와 내용은 읽을 수 없습니다.",
      );
    } else {
      const nav = win.performance.getEntriesByType("navigation")[0] as
        (PerformanceNavigationTiming & { responseStatus?: number }) | undefined;
      const status = nav?.responseStatus ? `, 서버 응답 ${nav.responseStatus}` : "";
      this.real(`load: 새 문서가 열렸습니다 → ${win.location.href}${status}`);
      const history =
        this.before.href === ""
          ? `history.length ${win.history.length}`
          : `history.length ${this.before.len} → ${win.history.length}`;
      this.real(`document.referrer = ${win.document.referrer || '""'}, ${history}`);
      this.hook(win);
    }
    this.tick();
  }

  /** 작은 창의 window에 귀를 단다. 창이 새 문서로 바뀌면 window도 새것이라 다시 단다 */
  private hook(win: Window) {
    if (this.hooked.has(win)) return;
    this.hooked.add(win);
    const gen = this.gen;
    const on = <E extends Event>(
      target: EventTarget,
      type: string,
      handler: (event: E) => void,
      capture = true,
    ) => {
      target.addEventListener(
        type,
        (event) => {
          if (gen === this.gen) handler(event as E);
        },
        capture,
      );
    };

    on<MouseEvent>(win, "click", (event) => this.onClick(event, win));
    on<SubmitEvent>(win, "submit", (event) => this.onSubmit(event, win));
    on(win, "reset", (event) =>
      this.real(`reset: ${openTag(event.target as Element)}의 칸이 처음 값으로 돌아갔습니다.`),
    );
    on(win, "invalid", (event) => this.onInvalid(event.target as HTMLInputElement));
    on(win, "change", (event) => this.onChange(event.target as HTMLInputElement));
    if (this.opts.logInput) {
      on(win, "input", (event) => {
        const el = event.target as HTMLElement;
        const value =
          el.isContentEditable || !("value" in el)
            ? `textContent = ${JSON.stringify(clip(el.textContent ?? ""))}`
            : `value = ${JSON.stringify(clip(String((el as HTMLInputElement).value)))}`;
        this.real(`input: ${openTag(el)}, ${value}`);
      });
    }
    on<ToggleLike>(win, "toggle", (event) => {
      const el = event.target as Element;
      const state = event.newState
        ? `${event.oldState} → ${event.newState}`
        : (el as HTMLDetailsElement).open
          ? "open"
          : "closed";
      this.real(`toggle: ${openTag(el)}, ${state}`);
    });
    on(win, "cancel", (event) => {
      if ((event.target as Element).localName !== "dialog") return;
      this.real(`cancel: ${openTag(event.target as Element)}에 닫기 요청이 왔습니다 (Esc 같은).`);
    });
    on(win, "close", (event) => {
      const dialog = event.target as HTMLDialogElement;
      if (dialog.localName !== "dialog") return;
      this.real(
        `close: ${openTag(dialog)}가 닫혔습니다. returnValue = ${JSON.stringify(dialog.returnValue)}`,
      );
    });
    for (const type of ["loadedmetadata", "play", "pause", "ended"]) {
      on(win, type, (event) => this.onMedia(type, event.target as HTMLMediaElement));
    }
    on<ErrorEvent>(win, "error", (event) => {
      if (event.target === win) {
        this.log("err", event.message);
        return;
      }
      const el = event.target as Element;
      this.real(
        `error: ${openTag(el)}${el.localName === "source" ? "" : "를"} 불러오지 못했습니다.`,
      );
    });
    /* 요소의 load는 window까지 올라오지 않는다 — document에서 잡는다 */
    on(win.document, "load", (event) => {
      const el = event.target;
      /* style도 load를 내지만, 받아 온 파일이 없으니 적지 않는다 */
      if (!isElement(el) || el.localName === "style") return;
      const img = el as HTMLImageElement;
      const extra =
        el.localName === "img"
          ? `, currentSrc = ${img.currentSrc.split("/").pop()}, naturalWidth = ${img.naturalWidth}`
          : "";
      this.real(`load: ${openTag(el)}를 다 받았습니다${extra}`);
    });
    on(win, "beforematch", (event) =>
      this.real(
        `beforematch: ${openTag(event.target as Element)}를 찾았습니다. hidden을 지우고 엽니다.`,
      ),
    );
    on(win, "pagehide", () => this.real("pagehide: 지금 문서를 내립니다."));
    on<HashChangeEvent>(win, "hashchange", (event) =>
      this.real(
        `hashchange: ${hashOf(event.oldURL)} → ${hashOf(event.newURL)}, history.length ${this.before.len} → ${win.history.length}`,
      ),
    );
    on(win, "popstate", () => this.real(`popstate: ${win.location.href}`));
    if (this.opts.logFocus) {
      on(win, "focusin", (event) =>
        this.real(`focus: ${openTag(event.target as Element)}가 포커스를 받았습니다.`),
      );
    }
    on(win, "scroll", () => this.onScroll(win), false);
    for (const type of ["transitionend", "animationstart", "animationend"]) {
      on<TransitionEvent & AnimationEvent>(win, type, (event) => {
        const what = type === "transitionend" ? event.propertyName : event.animationName;
        this.real(
          `${type}: ${openTag(event.target as Element)}의 ${what}, ${event.elapsedTime}초 지점`,
        );
      });
    }
    /* 폭 버튼으로 창을 바꾸면 미디어 쿼리가 다시 계산된다 — 멈춘 뒤 한 줄만 */
    let resizeTimer = 0;
    on(
      win,
      "resize",
      () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          if (gen === this.gen) this.real(`resize: 작은 창 폭이 ${win.innerWidth}px가 됐습니다.`);
        }, 150);
      },
      false,
    );
    on<MessageEvent>(win, "message", (event) => {
      const from = event.origin === "null" ? '"null" (불투명 출처)' : event.origin;
      this.real(`message: ${formatValue(event.data)}, 보낸 출처 ${from}`);
    });
  }

  // ── 이벤트마다 ──

  /** 한 번의 동작을 연다 — 구분선, 시간 0, 누르기 전 상태 */
  private begin(win: Window, force = false): boolean {
    const now = performance.now();
    if (!force && now - this.lastAct < SAME_ACT_MS) return false;
    if (this.rows.length > 0) this.push({ id: ++this.nextId, tag: "sep", text: "", ms: "" });
    this.t0 = now;
    this.lastAct = now;
    this.act = { invalid: 0, submit: false, submitButton: false };
    this.before = { y: Math.round(win.scrollY), len: win.history.length, href: win.location.href };
    newTab.lastActive = this;
    return true;
  }

  private onClick(event: MouseEvent, win: Window) {
    const target = event.target as Element | null;
    if (!target?.closest) return;
    /* area도 href가 있으면 링크다 (이미지 지도의 한 칸) */
    const link = target.closest<HTMLAnchorElement | HTMLAreaElement>("a, area");
    if (link) {
      this.onLinkClick(event, win, link);
      return;
    }
    const control = target.closest("button, summary, label, input");
    if (!control) return;
    if (control.localName === "input" && !CLICKY_INPUTS.has((control as HTMLInputElement).type))
      return;
    const fresh = this.begin(win);
    const synthetic = fresh ? "" : " (앞의 동작이 만든 클릭)";
    this.log("click", `${openTag(control)}를 눌렀습니다.${synthetic}`);
    const guess = predictControl(control);
    if (guess) this.log("guess", guess);
    const type = (control as HTMLInputElement).type;
    if ((type === "submit" || type === "image") && (control as HTMLInputElement).form) {
      this.act.submitButton = true;
    }
    window.setTimeout(() => {
      if (event.defaultPrevented)
        this.log("stop", "preventDefault()가 불려 기본 동작이 막혔습니다.");
    }, 0);
    if (fresh) this.expectQuiet(win, event, "아무 이벤트도 없었습니다.");
  }

  private onLinkClick(event: MouseEvent, win: Window, a: HTMLAnchorElement | HTMLAreaElement) {
    this.begin(win);
    this.log("click", `${openTag(a)}를 눌렀습니다.`);
    const raw = a.getAttribute("href");
    if (raw === null) {
      this.log("addr", 'href 속성이 없습니다. a.href = ""');
      this.log("guess", "링크가 아니라서 브라우저가 따라갈 주소가 없습니다.");
      this.expectQuiet(win, event, "아무 일도 없었습니다.");
      return;
    }
    this.log("addr", `href 글자 "${raw}" → 진짜 주소 ${a.href}`);
    const guess = predictLink(a, win.location.href, win !== win.top);
    this.log("guess", guess.text);
    window.setTimeout(() => {
      if (event.defaultPrevented) {
        this.log(
          "stop",
          "preventDefault()가 불렸습니다. 그래서 위 예상과 달리 브라우저는 길을 고르러 가지 않습니다.",
        );
      }
    }, 0);
    this.expectQuiet(win, event, guess.quiet ?? "아무 이벤트도 없었습니다.");
  }

  /** 누른 뒤 QUIET_MS 동안 실제 이벤트가 없으면 그 사실을 적는다 */
  private expectQuiet(win: Window, event: MouseEvent, quiet: string) {
    const count = this.realCount;
    const act = this.lastAct;
    const gen = this.gen;
    window.setTimeout(() => {
      if (gen !== this.gen || act !== this.lastAct) return;
      if (this.act.submitButton && this.act.invalid > 0 && !this.act.submit) {
        this.log("stop", "검증에 걸려 폼을 보내지 않았습니다. submit 이벤트도 나지 않았습니다.");
        return;
      }
      if (this.realCount !== count) return;
      if (event.defaultPrevented) {
        const now = this.win()?.location.href;
        this.real(
          now && now !== this.before.href
            ? `1.5초 동안 load가 없었습니다. 그런데 주소는 바뀌었습니다 → ${now}, history.length ${this.before.len} → ${win.history.length}`
            : "1.5초 동안 load가 없었습니다. 문서도 주소도 그대로입니다.",
        );
        return;
      }
      this.real(`1.5초 동안 ${quiet}`);
    }, QUIET_MS);
  }

  private onSubmit(event: SubmitEvent, win: Window) {
    this.begin(win);
    this.act.submit = true;
    const form = event.target as HTMLFormElement;
    const submitter = event.submitter as HTMLButtonElement | null;
    this.real(`submit: ${openTag(form)}, 누른 버튼 ${submitter ? openTag(submitter) : "(없음)"}`);
    const FormDataOf = (win as unknown as { FormData: typeof FormData }).FormData;
    let data: FormData;
    try {
      /* 누른 버튼의 name=value도 함께 담긴다 */
      data = new FormDataOf(form, submitter);
    } catch {
      data = new FormDataOf(form);
    }
    const pairs: [string, string][] = [];
    data.forEach((value, key) => pairs.push([key, typeof value === "string" ? value : value.name]));
    this.log(
      "addr",
      pairs.length > 0
        ? `보낼 값 (FormData): ${pairs.map(([key, value]) => `${key}=${JSON.stringify(value)}`).join(", ")}`
        : "보낼 값 (FormData): 없음. name이 있는 칸이 없습니다.",
    );
    const method = (
      submitter?.getAttribute("formmethod") ??
      form.getAttribute("method") ??
      "get"
    ).toLowerCase();
    /* button.formAction은 formaction이 없으면 폼의 action이 아니라 문서 주소를 돌려준다 */
    const action = submitter?.hasAttribute("formaction") ? submitter.formAction : form.action;
    if (method === "dialog") {
      this.log(
        "guess",
        "method=dialog라 이동하지 않습니다. 감싼 dialog를 닫고, returnValue에 누른 버튼의 value를 넣습니다.",
      );
    } else if (method === "post") {
      this.log(
        "guess",
        `POST라 값을 요청 본문에 담아 ${action}로 보냅니다. 주소에는 붙지 않습니다.`,
      );
    } else {
      const url = new URL(action);
      url.search = new URLSearchParams(pairs).toString();
      this.log("guess", `GET이라 값을 주소의 ? 뒤에 붙여 이동합니다 → ${url.href}`);
    }
    window.setTimeout(() => {
      if (event.defaultPrevented)
        this.log("stop", "preventDefault()가 불려 폼을 보내지 않았습니다.");
    }, 0);
  }

  private onInvalid(el: HTMLInputElement) {
    this.act.invalid += 1;
    const why = VALIDITY_KEYS.filter((key) => el.validity[key]).join(", ");
    this.real(`invalid: ${openTag(el)}, ${why}, "${el.validationMessage}"`);
  }

  private onChange(el: HTMLInputElement) {
    const value =
      el.type === "checkbox" || el.type === "radio"
        ? `checked = ${el.checked}`
        : el.type === "password"
          ? `value = (비밀번호라 적지 않습니다, ${el.value.length}자)`
          : `value = ${JSON.stringify(clip(String(el.value)))}`;
    this.real(`change: ${openTag(el)}, ${value}`);
  }

  private onMedia(type: string, media: HTMLMediaElement) {
    const where = `${openTag(media)}`;
    if (type === "loadedmetadata") {
      const size =
        media.localName === "video"
          ? `, ${(media as HTMLVideoElement).videoWidth}×${(media as HTMLVideoElement).videoHeight}`
          : "";
      this.real(
        `loadedmetadata: ${where}, 고른 파일 ${media.currentSrc.split("/").pop()}, 길이 ${media.duration.toFixed(2)}초${size}`,
      );
      return;
    }
    this.real(
      `${type}: ${where}, currentTime ${media.currentTime.toFixed(2)}초, muted = ${media.muted}`,
    );
  }

  private onScroll(win: Window) {
    if (performance.now() - this.lastAct > QUIET_MS) return;
    const text = () => `scroll: 위에서 ${this.before.y}px → ${Math.round(win.scrollY)}px`;
    if (!this.scrollRow || this.scrollRowAct !== this.lastAct) {
      this.scrollRow = this.real(text());
      this.scrollRowAct = this.lastAct;
    }
    window.clearTimeout(this.scrollTimer);
    this.scrollTimer = window.setTimeout(() => {
      if (!this.scrollRow) return;
      this.scrollRow.text = text();
      this.emit();
    }, 120);
  }

  // ── 지금 값 ──

  private refreshChecks() {
    const checks = this.opts.checks;
    if (!checks || checks.length === 0) return;
    const win = this.win() as
      (Window & { __labPlay?: boolean; Function: FunctionConstructor }) | null;
    let values: string[];
    if (!win) values = checks.map(() => "(다른 출처라 읽을 수 없습니다)");
    else if (!win.__labPlay)
      values = checks.map(() => "(작은 창이 다른 문서로 옮겨 가 잴 수 없습니다)");
    else {
      values = checks.map((check) => {
        try {
          return formatValue(new win.Function(`return (${check.expr});`)());
        } catch (error) {
          return `에러: ${(error as Error).message}`;
        }
      });
    }
    const joined = values.join("\u0000");
    if (joined === this.lastChecks) return;
    this.lastChecks = joined;
    this.out.checks(values);
  }

  // ── 기록 ──

  private real(text: string): LabRow {
    return this.log("real", text);
  }

  private log(tag: LabTag, text: string): LabRow {
    const row = {
      id: ++this.nextId,
      tag,
      text,
      ms: `+${Math.round(performance.now() - this.t0)}ms`,
    };
    if (tag === "real") this.realCount += 1;
    this.push(row);
    window.clearTimeout(this.checksQueued);
    this.checksQueued = window.setTimeout(() => this.refreshChecks(), 60);
    return row;
  }

  private push(row: LabRow) {
    this.rows.push(row);
    if (this.rows.length > MAX_ROWS) this.rows.splice(0, this.rows.length - MAX_ROWS);
    this.emit();
  }

  /** 한 틱에 여러 줄이 생겨도 화면은 한 번만 다시 그린다 */
  private emit() {
    if (this.emitQueued) return;
    this.emitQueued = true;
    queueMicrotask(() => {
      this.emitQueued = false;
      this.out.rows([...this.rows]);
    });
  }
}
