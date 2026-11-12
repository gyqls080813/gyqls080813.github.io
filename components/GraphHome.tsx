"use client";

import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactFlowInstance } from "@xyflow/react";
import TopBar from "./TopBar";
import KnowledgeGraph from "./graph/flow/KnowledgeGraph";
import { sizeOnScreen, type GraphFlowNode } from "./graph/flow/sizes";
import NodeTree from "./post/NodeTree";
import SheetColumns from "./content/SheetColumns";
import SheetNav from "./content/SheetNav";
import SheetPorts from "./content/SheetPorts";
import { useSheetView } from "./content/SheetView";
import sheetStyles from "./content/Sheet.module.css";
import { annotatedGraphNodes, navOf, portsOf } from "@/lib/outline";
import { fullGraphBackdrops, fullGraphEdges } from "@/lib/graphData";
import type { NodeOpenKind } from "@/lib/nodeKinds";
import { nodeDestination, nodeOpenKind } from "@/lib/nodeTarget";
import { cx } from "@/lib/util";
import styles from "./GraphHome.module.css";

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Expanding {
  kind: NodeOpenKind;
  nodeId: string;
  /** 누른 노드 카드의 자리 */
  from: Rect;
  /** 열린 시트의 자리 */
  to: Rect;
  /** 시트가 서는 무대(상단 바 아래 전부) — 포트가 이 안에 자리를 잡는다 */
  stage: Rect;
}

/* 겹침 화면의 본문 — 본문 모듈·코드 색칠을 끌고 오므로 첫 번들에서 뺀다 (ExpandArticle 참고) */
const loadExpandArticle = () => import("./ExpandArticle");
const ExpandArticle = lazy(loadExpandArticle);

/** 그래프 밖에서 들어왔을 때 노드로 옮겨 가는 동작 */
const FOCUS_ZOOM = 1.35;
const FOCUS_MS = 520;

const rectOf = (box: DOMRect): Rect => ({
  top: box.top,
  left: box.left,
  width: box.width,
  height: box.height,
});

/** 노드 카드 자리만 보이게 잘라 두는 창 — 시트 자리 기준의 안쪽 여백으로 적는다 */
function clipFrom({ from, to }: Expanding): string {
  const top = from.top - to.top;
  const left = from.left - to.left;
  const right = to.left + to.width - (from.left + from.width);
  const bottom = to.top + to.height - (from.top + from.height);
  return `inset(${top}px ${right}px ${bottom}px ${left}px round 8px)`;
}

/**
 * 시트를 노드 카드 자리·폭으로 줄여 두는 변환 — 시트 왼쪽 위를 기준으로
 * 카드 자리로 옮기고 카드 폭만큼 줄인다. 시트 본문과 포트가 같은 변환을 써서
 * 한 강체로 함께 커진다.
 */
function shrinkToCard({ from, to }: Expanding): string {
  return `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width})`;
}

export default function GraphHome() {
  const router = useRouter();
  const [expanding, setExpanding] = useState<Expanding | null>(null);
  const [opened, setOpened] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  /* 열린 시트가 설 자리를 재는 보이지 않는 상자 — 진짜 시트와 같은 클래스라
     크기·자리를 숫자로 따라 적지 않고 CSS가 정한 그대로 읽는다 */
  const sheetProbeRef = useRef<HTMLDivElement>(null);
  /* 시트 보기 설정은 전역이다 — 겹침 화면도 목적지와 같은 모습이라야 이어진다 */
  const sheetView = useSheetView();
  const flowRef = useRef<ReactFlowInstance<GraphFlowNode> | null>(null);

  /* 다른 페이지의 포트에서 넘어올 때 열어야 할 노드 (`/?node=me`).
     그래프 인스턴스가 준비된 뒤에야 좌표를 알 수 있어 여기 담아 두고 onReady에서 연다 */
  const pendingNodeRef = useRef<string | null>(null);

  /* 이 이펙트는 주소(?node)를 읽고 지운다. StrictMode에서 두 번 돌면
     두 번째에는 이미 지워진 주소를 보고 엉뚱한 노드를 연다 */
  const bootedRef = useRef(false);

  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    const target = new URLSearchParams(window.location.search).get("node");
    if (!target) return;
    pendingNodeRef.current = target;
    /* 주소는 되돌려 둔다 — 새로고침이나 뒤로가기에서 다시 열리면 성가시다 */
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  /* 겹침 화면의 본문을 화면이 한가할 때 미리 받아 둔다 — 누른 뒤에 받기 시작하면
     카메라 이동(0.5초) 안에 못 올 수 있다 */
  useEffect(() => {
    const warm = () => void loadExpandArticle();
    /* Safari에는 requestIdleCallback이 없다 */
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(warm, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(warm, 1500);
    return () => window.clearTimeout(id);
  }, []);

  /* 노드를 화면 가운데로 옮기고 확대한다 — 이동이 끝나는 데 걸리는 ms를 돌려준다 */
  const moveToNode = (nodeId: string): number => {
    const instance = flowRef.current;
    const node = instance?.getNode(nodeId);
    if (!instance || !node) return 0;
    const size = sizeOnScreen(node);
    instance.setCenter(node.position.x + size.width / 2, node.position.y + size.height / 2, {
      zoom: FOCUS_ZOOM,
      duration: FOCUS_MS,
    });
    return FOCUS_MS;
  };

  /* 노드 카드가 제자리에서 시트 크기로 열린다 */
  const expandNode = (nodeId: string, kind: NodeOpenKind) => {
    /* 확장이 끝나면 그 노드의 주소로 넘어간다 */
    const finish = () => {
      const destination = nodeDestination(nodeId);
      if (destination) router.push(destination);
    };

    const nodeElement = document.querySelector(`.react-flow__node[data-id="${nodeId}"]`);
    const stage = stageRef.current?.getBoundingClientRect();
    const sheet = sheetProbeRef.current?.getBoundingClientRect();
    if (!nodeElement || !stage || !sheet) {
      finish();
      return;
    }

    setExpanding({
      kind,
      nodeId,
      from: rectOf(nodeElement.getBoundingClientRect()),
      to: rectOf(sheet),
      stage: rectOf(stage),
    });
    setTimeout(finish, 500);
  };

  /* 노드로 가는 유일한 동작 — 어디서 왔든 같은 순서다: 이동(확대) → 열림.
     포트·트리·노드 직접 클릭, 그리고 다른 페이지에서 넘어온 ?node= 까지 모두
     이 함수 하나를 거쳐 같은 동작이 된다. 열 것이 없는 노드는 이동·확대까지만 하고 멈춘다 */
  function openNode(nodeId: string) {
    if (expanding) return;

    const kind = nodeOpenKind(nodeId);
    /* 직접 누른 노드라도 언제나 그 자리로 데려간 뒤에 연다 — 동작을 하나로 */
    const wait = moveToNode(nodeId);

    if (!kind) return;
    if (wait === 0) {
      expandNode(nodeId, kind);
      return;
    }
    /* 이동이 끝나 카드가 제자리에 선 뒤에 재야 시작 위치가 어긋나지 않는다 */
    window.setTimeout(() => expandNode(nodeId, kind), wait + 40);
  }

  /* 오버레이가 시작 상태로 한 번 그려진 뒤에 열어야 전이가 걸린다 */
  useLayoutEffect(() => {
    if (!expanding || opened) return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpened(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [expanding, opened]);

  const ports = expanding ? portsOf(expanding.nodeId) : null;

  return (
    <div className={cx(styles.screen, opened && styles.expandOpen)}>
      <TopBar />
      <main ref={stageRef} className={styles.graphArea}>
        <KnowledgeGraph
          nodes={annotatedGraphNodes}
          edges={fullGraphEdges}
          backdrops={fullGraphBackdrops}
          hoverHighlight
          onNodeClick={openNode}
          onReady={(instance, graph) => {
            flowRef.current = instance;
            const target = pendingNodeRef.current;
            if (!target) return;
            pendingNodeRef.current = null;
            /* 접힌 갈래 안이면 먼저 편다 — 안 그러면 숨은 노드로 날아간다.
               노드가 한 번 그려진 뒤라야 좌표도 맞다 */
            const settling = graph.reveal(target);
            window.setTimeout(() => requestAnimationFrame(() => openNode(target)), settling);
          }}
        />
        <div
          ref={sheetProbeRef}
          className={cx(
            sheetStyles.sheet,
            sheetView.full && sheetStyles.sheetFull,
            styles.sheetProbe,
          )}
          aria-hidden
        />
      </main>

      {expanding && ports && (
        <>
          <div className={styles.expandScrim} />
          {/* 카드는 처음부터 시트 자리·크기에 서 있고, 보이는 창(clip-path)만 노드
              카드에서 시트로 넓어진다. 위치·크기를 직접 옮기면 매 프레임 레이아웃이
              다시 돌아(시트 안쪽 전체) 느린 기기에서 끊긴다 — clip-path와 transform은
              레이아웃을 건드리지 않는다. */}
          <div
            className={styles.expandCard}
            style={{
              top: expanding.to.top,
              left: expanding.to.left,
              width: expanding.to.width,
              height: expanding.to.height,
              clipPath: opened ? "inset(0 round 14px)" : clipFrom(expanding),
            }}
          >
            {/* 시트 전체가 한 강체 — 노드 카드 자리에서 카드 폭으로 축소돼 있다가 함께 커진다.
                안쪽은 진짜 시트와 같은 세 열(SheetColumns)이다. 지나가는 화면이라 누를 수 없다 */}
            <div
              className={styles.expandContent}
              inert
              style={{ transform: opened ? "none" : shrinkToCard(expanding) }}
            >
              <SheetColumns
                tree={<NodeTree activeNodeId={expanding.nodeId} />}
                nav={<SheetNav items={navOf(expanding.nodeId)} />}
              >
                {/* 본문 조각이 아직 안 왔으면 빈 시트로 열리고, 오는 대로 채워진다 */}
                <Suspense fallback={null}>
                  <ExpandArticle kind={expanding.kind} nodeId={expanding.nodeId} />
                </Suspense>
              </SheetColumns>
            </div>
          </div>

          {/* 포트도 진짜 시트와 같은 컴포넌트가 같은 무대에 그린다 — 자리는 CSS가 정하고,
              시작할 때는 시트 본문과 같은 변환으로 카드 자리에 줄어 있다가 함께 커진다.
              그래서 어느 종류의 노드든 끝 장면이 진짜 시트와 같다 */}
          <div
            className={styles.overlayPorts}
            inert
            style={{
              top: expanding.stage.top,
              left: expanding.stage.left,
              width: expanding.stage.width,
              height: expanding.stage.height,
              transformOrigin: `${expanding.to.left - expanding.stage.left}px ${
                expanding.to.top - expanding.stage.top
              }px`,
              transform: opened ? "none" : shrinkToCard(expanding),
            }}
          >
            <SheetPorts side="left" ports={ports.left} />
            <SheetPorts side="right" ports={ports.right} />
          </div>
        </>
      )}
    </div>
  );
}
