import type { Theory } from ".";

const BOOK = "https://git-scm.com/book/en/v2";
const GH = "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests";

/**
 * Git — 명령어 목록이 아니라 모델을 먼저 세우는 갈래.
 *
 * 다른 갈래는 공식 문서의 목차를 그대로 옮기지만, 여기는 개념이 쌓이는 순서로
 * 일곱 단계를 세웠다. 뒤 단계는 앞 단계를 알아야 읽히도록 짰고, 각 단계는
 * 핵심 개념 → 명령 → 연습 → 확인 질문의 같은 흐름으로 쓴다. 근거는 Pro Git과
 * git·GitHub 공식 문서다.
 */
export const gitTheories: Theory[] = [
  {
    id: "git",
    name: "Git",
    tagline: "명령어가 아니라 커밋과 이름표로 읽는 도구",
    intro:
      "브랜치를 따서 작업하고 push한다는 흐름은 익숙한데, 브랜치를 지우면 무엇이 사라지는지, pull이 정확히 무엇을 하는지는 설명하지 못했습니다. 명령어를 외워서 쓰면 평소에는 문제가 없다가 예상 밖의 메시지가 나오는 순간 멈춥니다. 그래서 명령보다 모델을 먼저 세웁니다. 커밋은 무엇이고, 브랜치는 무엇을 가리키며, 내 컴퓨터와 GitHub는 어떻게 맞춰지는지. 이 셋이 서면 명령은 그 모델을 움직이는 손잡이로 읽힙니다.",
    blocks: [
      {
        label: "일곱 단계로 나눈 이유",
        body: "세 개의 공간과 커밋, 커밋 사슬과 브랜치, 되돌리기와 복구, 로컬과 원격, 합치기와 충돌, GitHub 협업, 실전 상황 대처 순서입니다. 앞의 둘이 모델이고, 가운데 셋이 그 모델을 움직이는 방법이며, 뒤의 둘이 여럿이 함께 쓸 때 생기는 일입니다. 되돌리기를 원격보다 앞에 둔 것은, 내 컴퓨터 안에서 무엇을 되살릴 수 있는지를 알아야 원격에 올린 것과 안 올린 것의 차이가 읽히기 때문입니다.",
      },
      {
        label: "각 단계는 같은 흐름으로 읽는다",
        body: "핵심 개념을 짧게 세우고, 그 개념을 움직이는 명령을 보고, 연습용 저장소에서 직접 쳐 본 뒤, 확인 질문으로 이해를 점검합니다. 확인 질문에 답하지 못하면 다음 단계로 넘어가지 않습니다. 뒤 단계의 설명이 앞 단계의 개념을 그대로 가져다 쓰기 때문입니다.",
      },
      {
        label: "연습은 버려도 되는 저장소에서",
        body: "실제 프로젝트에서 reset이나 브랜치 삭제를 시험하면 되돌리는 법을 모르는 채로 되돌려야 합니다. 빈 폴더에 저장소를 만들고, 원격 역할을 할 bare 저장소를 하나 더 만들어 붙이면 GitHub 없이도 push와 fetch를 연습할 수 있습니다. 동료 역할의 저장소를 하나 더 clone하면 충돌도 만들어 볼 수 있습니다.",
        code: "mkdir git-practice && cd git-practice\ngit init -b main\n\n# 원격(GitHub) 역할을 할 저장소\ngit init --bare ../git-practice-remote.git\ngit remote add origin ../git-practice-remote.git\n\n# 동료 역할\ngit clone ../git-practice-remote.git ../git-practice-mate",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: 버려도 되는 저장소에서 전부 쳐 봤다",
        body: "이 허브의 '실제로 돌려 보면'은 git 2.55.0(git-scm.com 의 최신 소스 릴리스는 2.56.1)으로 빈 폴더에 저장소를 만들고, bare 저장소를 원격으로, 또 하나를 동료로 clone 해서 돌린 결과입니다. 세 공간·객체·브랜치·충돌·rebase·reset·reflog·stash·push 거절·prune·gc 까지 전부 그 안에서 났고, 메시지는 영어 원문 그대로 적었습니다 — 검색이 되는 쪽이 낫습니다. `git init` 직후 `.git` 안에는 HEAD · config · description · hooks · info · objects · refs 가 있고, 커밋 세 개 뒤 `git count-objects -v` 는 count 9 — 커밋 3 + 트리 3 + 블롭 3 입니다.",
        code: "$ git --version\ngit version 2.55.0\n$ git init -q repo && ls -a repo/.git\nHEAD config description hooks info objects refs\n\n# 커밋 셋 뒤\n$ git count-objects -v | head -1\ncount: 9        # commit 3 + tree 3 + blob 3",
        codeLang: "bash",
      },
      {
        label: "일곱 단계가 각각 어떤 메시지를 설명하는가",
        body: "단계마다 '이 메시지가 왜 나오는가'를 한 줄씩 붙여 두면 지도가 됩니다. 아래 시트들의 '실제로 돌려 보면'에 다시 나옵니다.",
        code: "세 개의 공간    MM a.txt                                   같은 파일이 담긴 것과 고친 것으로 갈렸다\n커밋 사슬       HEAD detached at 5fd1dc1                   이름표 아닌 커밋에 서 있다\n되돌리기        error: the branch 'rb2' is not fully merged  이름표를 떼면 닿지 않는 커밋이 생긴다\n로컬과 원격     fatal: The current branch nostream has no upstream branch.   짝이 없어 push 할 곳을 모른다\n합치기          CONFLICT (content): Merge conflict in a.txt   같은 자리를 양쪽이 고쳤다\nGitHub          ! [rejected] master -> master (fetch first)   원격이 앞서 있다 — 먼저 받아라\n실전            fatal: There is no merge to abort (MERGE_HEAD missing).   되돌릴 병합이 진행 중이 아니다",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "세 개의 공간부터 순서대로입니다. 뒤 단계가 앞 단계의 낱말(이름표·도달·스냅샷)을 그대로 쓰므로 건너뛰면 읽히지 않습니다. 각 시트 끝의 확인 질문에 답할 수 있으면 다음으로 갑니다.",
      },
    ],
    sources: [
      { label: "Pro Git", href: BOOK },
      { label: "Git Branching - Branches in a Nutshell", href: `${BOOK}/Git-Branching-Branches-in-a-Nutshell` },
    ],
  },

  {
    id: "git-areas",
    name: "세 개의 공간과 커밋",
    tagline: "고친 것 · 담은 것 · 확정한 것",
    intro:
      "파일을 고치면 바로 기록되는 것이 아닙니다. git은 작업 폴더, 스테이징 영역, 커밋 기록이라는 세 공간을 두고, 변경이 한 칸씩 옮겨 가게 합니다. 왜 한 번에 커밋하지 않고 add를 거치는지가 이 단계의 질문입니다.",
    blocks: [
      {
        label: "세 공간",
        body: "작업 폴더는 파일을 실제로 고치는 곳입니다. git add는 고친 것 중 이번 커밋에 넣을 것을 스테이징 영역에 담고, git commit은 담긴 것을 되돌릴 수 있는 기록으로 확정합니다. add만 한 상태는 아직 기록이 아닙니다. 다시 add하면 덮어써지고, 커밋되어야 비로소 이력에 남습니다.",
        code: "git status            # 세 공간의 차이를 보여준다\ngit add src/select.ts # 이번 커밋에 담기\ngit commit -m \"feat: 드롭다운을 교체한다\"",
        codeLang: "bash",
        terms: [
          {
            term: "스테이징 영역 (index)",
            body: "다음 커밋에 들어갈 내용을 모아 두는 곳입니다. 장바구니에 비유하면 add는 담기, commit은 결제입니다.",
          },
        ],
      },
      {
        label: "커밋에 들어 있는 것",
        body: "커밋은 그 시점 파일 전체의 스냅샷과 메시지, 작성자, 시간, 그리고 바로 앞 커밋이 무엇이었는지를 담습니다. 변경분(diff)만 저장하는 것이 아니라 스냅샷을 저장하고, 바뀌지 않은 파일은 앞 커밋의 것을 그대로 가리켜 공간을 아낍니다. 우리가 보는 diff는 두 스냅샷을 비교해 그때그때 계산한 결과입니다.",
      },
      {
        label: "두 단계로 나눈 이유는 골라 담기 위해서",
        body: "한 번 작업하면 의미가 다른 변경이 섞입니다. 의존성 추가, 기능 교체, 검증용 임시 페이지가 한 폴더에 같이 있는 식입니다. add가 없으면 바뀐 것을 전부 한 커밋에 넣을 수밖에 없습니다. 스테이징은 이번 커밋에 넣을 것만 고르는 단계이고, 그래서 커밋을 의미 단위로 나눌 수 있습니다. git add .은 이 장점을 버리는 습관이라, 담기 전에 git status로 무엇이 담기는지 보는 편이 안전합니다.",
      },
      {
        label: "실제로 돌려 보면: status -s 의 두 칸과 diff 두 가지",
        body: "`git status --short` 의 두 글자는 왼쪽이 스테이징, 오른쪽이 작업 폴더입니다. 새 파일은 `??`, add 하면 `A `, 커밋 뒤 고치면 ` M`, add 한 뒤 또 고치면 `MM` — 같은 파일이 '담긴 것'과 '고친 것'으로 갈린 상태입니다. 그때 `git diff` 는 담긴 것과 작업 폴더의 차이(+c)만, `git diff --staged` 는 마지막 커밋과 담긴 것의 차이(+b)만 보여 줍니다. add 는 '그 순간의 파일'을 담으므로 add 뒤에 고친 줄은 다시 add 해야 커밋에 들어갑니다 — 문서의 표현대로 '다시 git add 를 실행해야' 합니다.",
        code: "$ printf 'a\\n' > a.txt && git status --short\n?? a.txt\n$ git add a.txt && git status --short\nA  a.txt\n$ git commit -q -m 'add a'; printf 'b\\n' >> a.txt && git status --short\n M a.txt\n$ git add a.txt && printf 'c\\n' >> a.txt && git status --short\nMM a.txt                 # 왼쪽 M: 담긴 b, 오른쪽 M: 아직 안 담긴 c\n\n$ git diff                # 담긴 것 ↔ 작업 폴더\n+c\n$ git diff --staged       # 마지막 커밋 ↔ 담긴 것\n+b",
        codeLang: "bash",
        terms: [
          {
            term: "--staged 와 --cached",
            body: "같은 옵션의 두 이름입니다. 스테이징 영역의 옛 이름이 index(cache)라 --cached 가 먼저 있었고, --staged 는 뜻이 드러나는 별칭입니다.",
          },
        ],
      },
      {
        label: "커밋 안을 열어 보면: 트리와 블롭을 가리키는 메타데이터",
        body: "`git cat-file -p HEAD` 로 커밋 객체를 열면 tree(스냅샷의 뿌리) · parent(앞 커밋) · author · committer · 메시지만 있습니다. 파일 내용은 없습니다. tree 를 열면 `100644 blob de98044… a.txt` 가 나옵니다. 이름과 모드와 블롭의 해시입니다. 블롭을 열면 파일 내용이 그대로 나옵니다. 그래서 커밋은 '그 시점 파일 전체'를 가리킵니다. 다만 바뀌지 않은 파일은 같은 블롭 해시를 다시 가리켜 공간을 아낍니다. 해시는 내용에서 나옵니다. `echo 'a' | git hash-object --stdin` 은 어느 컴퓨터에서나 78981922…입니다.",
        code: "$ git cat-file -t HEAD\ncommit\n$ git cat-file -p HEAD\ntree 5eb56f37d65808cb4cec9d09269ecad72aa06c9b\nparent 5fd1dc12b1e2f3d76214fef7068559f1a631ce02\nauthor probe <probe@example.com> 1794445200 +0900\ncommitter probe <probe@example.com> 1794445200 +0900\n\nadd c\n$ git cat-file -p HEAD^{tree}\n100644 blob de980441c3ab03a8c07dda1ad27b8a11f39deb1e\ta.txt\n$ git cat-file -p HEAD:a.txt\na\nb\nc\n$ echo 'a' | git hash-object --stdin\n78981922613b2afb6025042ff6bd878ac1994e85     # 내용이 같으면 해시가 같다",
        codeLang: "bash",
        terms: [
          {
            term: "블롭 · 트리 · 커밋 (blob · tree · commit)",
            body: "git 객체의 세 종류입니다. 블롭은 파일 내용이며 이름이 없습니다. 트리는 디렉터리이며 이름·모드·하위 해시 목록을 담습니다. 커밋은 트리 하나와 부모·작성자·메시지를 담습니다. 넷째로 주석 달린 태그 객체가 있습니다. 전부 `<type> <size>\\0내용` 의 SHA-1 로 이름이 붙고 .git/objects 에 zlib 압축으로 저장됩니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우: 담기와 무시",
        body: "세 공간 사이에서 자주 보는 어긋남입니다.",
        code: "증상                                       원인                          처방\n─────────────────────────────────────────  ───────────────────────────  ─────────────────────────────\nadd 했는데 커밋에 마지막 수정이 없다         add 는 그 순간의 파일을 담는다    다시 add (MM 상태 확인)\ngit commit 이 'nothing added to commit…' 으로 거절  담긴 것이 없다 (untracked 만 있음)  add 먼저, 또는 commit -a\n                                                                                (추적 파일만)\n.gitignore 에 적은 파일이 계속 추적된다      이미 추적 중인 파일은 ignore 가 안 막음  git rm --cached <file> 로 추적 해제\ngit add 가 'paths are ignored by one of your .gitignore files'  패턴에 걸린 새 파일         정말 필요하면 git\n                                                               add -f\n어느 규칙이 막는지 모른다                    중첩 .gitignore · 전역 ignore    git check-ignore -v <file>\ngit add . 로 임시 파일까지 들어갔다          골라 담지 않았다                status 보고 경로 단위로 add",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 세 공간은 '세 개의 트리' 다",
        body: "Pro Git 의 Reset Demystified 는 세 공간을 세 개의 트리로 부릅니다. HEAD(마지막 커밋의 스냅샷, 다음 커밋의 부모), Index(다음 커밋으로 제안된 스냅샷), Working Directory(모래밭). add 는 작업 폴더 → Index 로 한 파일을 복사하고, commit 은 Index 를 트리 객체로 써서 커밋을 만들고 HEAD(가 가리키는 브랜치)를 옮깁니다. status 는 세 트리를 서로 비교해 두 칸을 채우고, diff 는 그중 두 트리의 차이를 보여 줍니다. 되돌리기 장의 reset --soft/--mixed/--hard 가 '어느 트리까지 되돌리나'인 것이 이 그림 위에서 읽힙니다.",
        code: "Working Directory  ──add──►  Index (다음 커밋 제안)  ──commit──►  HEAD (마지막 커밋)\n      ▲                            │                                 │\n      └──── restore <file> ────────┘                                 │\n      ◄──── restore --staged ──────┘  (Index ← HEAD, 작업 폴더 그대로)│\n                                                                      │\ngit diff          = Index ↔ Working Directory                         │\ngit diff --staged = HEAD  ↔ Index                                     │\ngit status        = 셋을 모두 비교해 두 칸(X Y)으로",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "커밋이 parent 를 가진다는 것을 cat-file 로 봤으니, 다음 장은 그 parent 사슬과 그 위에 붙는 이름표(브랜치·HEAD)입니다. Pro Git 의 Recording Changes 장(status -s · .gitignore · diff · rm --cached)이 이 장의 출처이고, Git Objects 장이 cat-file 의 출처입니다.",
      },
      {
        label: "확인 질문",
        body: "파일을 고치고 add는 했지만 commit은 하지 않은 채 git push를 하면, 동료는 그 변경을 볼 수 있을까요?",
        notes: [
          {
            title: "답",
            body: "볼 수 없습니다. push는 커밋만 보냅니다. 스테이징 영역과 작업 폴더의 변경은 내 컴퓨터에만 있습니다. 브랜치를 처음 push하는 경우라면 브랜치 자체는 원격에 생기지만, 가리키는 커밋이 출발점과 같아 아무 변경도 없는 브랜치로 보입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Git Basics - Recording Changes to the Repository", href: `${BOOK}/Git-Basics-Recording-Changes-to-the-Repository` },
    ],
  },

  {
    id: "git-branch",
    name: "커밋 사슬 · 브랜치 · HEAD",
    tagline: "브랜치는 공간이 아니라 이름표",
    intro:
      "브랜치를 만들면 코드가 복사되거나, 브랜치가 바뀐 부분을 기록한다고 생각하기 쉽습니다. 실제로 브랜치는 커밋 하나를 가리키는 41바이트짜리 파일입니다. 기록은 커밋이 하고, 브랜치는 그 기록의 한 지점에 붙은 이름표입니다. 이 구분이 서면 브랜치 삭제, log에 보이는 범위, 복구가 전부 같은 원리로 읽힙니다.",
    blocks: [
      {
        label: "커밋은 앞 커밋을 기억한다",
        body: "커밋마다 부모 커밋이 기록되어 있어서 커밋들은 사슬로 이어집니다. 일반 커밋의 부모는 하나이고, 병합 커밋의 부모는 둘입니다. 이 사슬이 곧 이력입니다.",
        code: "A ← B ← C ← D        ← main\n\n# 병합 커밋 M은 부모가 둘이다 (D와 Z)\nA ← B ← C ← D ← M\n         ↖     ↙\n           X ← Z",
        codeLang: "text",
      },
      {
        label: "브랜치는 커밋 하나를 가리키는 이름표다",
        body: "브랜치 파일을 열어 보면 커밋 ID 한 줄만 들어 있습니다. 그래서 브랜치를 만드는 일은 아무것도 복사하지 않고, 지금 커밋에 이름표를 하나 더 붙이는 일입니다. 새 커밋을 만들면 현재 브랜치의 이름표가 새 커밋으로 한 칸 옮겨 갑니다. 브랜치에는 부모가 없습니다. 부모가 있는 것은 커밋이고, '어느 브랜치에서 따 왔는지'는 git 어디에도 저장되지 않습니다. 흔히 말하는 부모 브랜치는 사람끼리의 표현이고, GitHub에서는 PR을 만들 때 사람이 base 브랜치로 지정합니다.",
        code: "$ cat .git/refs/heads/feature\n89494c240934aab3f09765696d67d0a34d7611e9\n\n# 커밋 전:  A ← B ← C        ← feature\n# 커밋 후:  A ← B ← C ← D    ← feature (이름표만 이동)",
        codeLang: "bash",
        terms: [
          {
            term: "HEAD",
            body: "지금 내가 서 있는 위치입니다. 보통은 현재 브랜치를 가리키고, 커밋하면 HEAD가 가리키는 브랜치가 움직입니다.",
          },
        ],
      },
      {
        label: "log는 도달할 수 있는 커밋만 보여준다",
        body: "git log는 HEAD에서 출발해 부모를 따라 최초 커밋까지 거슬러 올라갑니다. 병합 커밋을 만나면 두 갈래를 모두 따라가므로 병합된 옆가지도 보입니다. 보이지 않는 것은 갈라져 나간 뒤 한 번도 합쳐지지 않은 가지입니다. 부모는 자식을 모르기 때문에 HEAD에서 그쪽으로 갈 길이 없습니다. log에 없다는 것은 존재하지 않는다는 뜻이 아니라 여기서 도달할 수 없다는 뜻입니다.",
        code: "git log --oneline --graph -15   # 갈래를 선으로 그려 본다\ngit log --all                   # 모든 브랜치에서 도달 가능한 커밋\ngit log main..feature           # feature에서는 닿고 main에서는 안 닿는 커밋\ngit log --first-parent          # 병합의 두 번째 갈래는 건너뛰고 본줄기만",
        codeLang: "bash",
      },
      {
        label: "브랜치를 지워도 커밋은 남는다",
        body: "브랜치 삭제는 이름표를 떼는 일입니다. 다른 이름표에서 도달할 수 있는 커밋은 그대로 안전합니다. PR로 병합된 브랜치를 지워도 되는 이유가 이것입니다. 병합 커밋이 그 브랜치의 마지막 커밋을 부모로 기억하고 있어서 본줄기에서 여전히 닿습니다. git branch -d는 이 조건을 확인해 병합되지 않은 브랜치는 지우지 않고, -D는 확인 없이 지웁니다.",
        code: "git branch -d feature   # 병합되지 않았으면 거절한다\ngit branch -D feature   # 확인 없이 지운다",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: 이름표 파일, HEAD 파일, 떨어진 HEAD",
        body: "`.git/HEAD` 를 열면 `ref: refs/heads/master` 한 줄 — '지금은 master 라는 이름표 위에 있다'. `.git/refs/heads/master` 를 열면 커밋 해시 한 줄(40자 + 줄바꿈 = 41바이트). 브랜치를 만들면 그 폴더에 파일이 하나 늘 뿐이고(실제로 feature master rb rb2 recovered topic), `git for-each-ref` 가 전부를 보여 줍니다. 커밋 해시를 직접 checkout 하면 HEAD 파일에 이름표 대신 해시가 들어가고 status 가 `HEAD detached at 5fd1dc1` 을 찍습니다 — 커밋해도 어느 이름표도 안 움직이니 '브랜치에 영향 없이 버릴 수 있다'는 안내가 그래서 나옵니다. `git init -b main` 이면 HEAD 가 `refs/heads/main` 을 가리키고, 지정하지 않으면(설정도 없으면) 기본 이름은 master 입니다.",
        code: "$ cat .git/HEAD\nref: refs/heads/master\n$ cat .git/refs/heads/master\n5e697d03eaf008da6a589cffa9ce1e5b7ac94932\n$ ls .git/refs/heads\nfeature master rb rb2 recovered topic\n\n$ git checkout 5fd1dc1\nNote: switching to '5fd1dc1'.\n\nYou are in 'detached HEAD' state. You can look around, make experimental\nchanges and commit them, and you can discard any commits you make in this\nstate without impacting any branches by switching back to a branch.\n\nIf you want to create a new branch to retain commits you create, you may\ndo so (now or later) by using -c with the switch command. Example:\n\n  git switch -c <new-branch-name>\n$ git status | head -1\nHEAD detached at 5fd1dc1",
        codeLang: "bash",
      },
      {
        label: "log 의 범위 문법: .. 과 ... 과 --left-right",
        body: "'여기서는 닿고 저기서는 안 닿는' 커밋을 고르는 문법이 `A..B` 입니다. B 에서 도달하되 A 에서는 도달하지 않는 커밋입니다. 실제로 `master..side` 는 side 가 더 쌓은 둘(side 1, side 2)이었습니다. `side..master` 는 master 만 가진 하나(local only)였습니다. `A...B` 는 양쪽 중 한쪽에서만 닿는 커밋 전부입니다. `--left-right` 가 `<`(A 쪽) `>`(B 쪽)로 표시합니다. PR 이 보여 주는 커밋이 정확히 `base..compare` 입니다. push 가 보낼 커밋이 `origin/master..HEAD` 입니다(git cherry -v 도 같은 답입니다). 한쪽을 비우면 HEAD 입니다.",
        code: "$ git log --oneline master..side\nf6f340b side 2\nfec5462 side 1\n$ git log --oneline side..master\n6237d9f local only\n$ git log --oneline --left-right master...side\n> f6f340b side 2\n> fec5462 side 1\n< 6237d9f local only\n\n$ git cherry -v origin/master      # push 하면 갈 커밋\n+ 933221202d3d5ac8398e7a3416e6664bd14bcae6 not pushed yet",
        codeLang: "bash",
        terms: [
          {
            term: "^ 와 ~ (조상 표기)",
            body: "`HEAD^` 는 부모(병합 커밋이면 `^2` 로 둘째 부모), `HEAD~3` 은 첫째 부모를 세 번 따라간 것. `HEAD~~~` 와 `HEAD~3` 은 같습니다. zsh 에서는 `^` 가 글롭이라 `\"HEAD^\"` 처럼 따옴표가 필요하고, `master@{1}` 은 reflog 의 한 칸 전입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: -d 는 닿는지를 보고 거절한다",
        body: "`git branch -d topic` 은 topic 의 끝 커밋이 현재 브랜치에서 닿으면(병합됐으면) 지우고 `Deleted branch topic (was bfbd9a5).` 를 찍습니다. 닿지 않으면 `error: the branch 'rb2' is not fully merged` 와 함께 `-D` 를 안내합니다. 그 판단 기준이 '도달 가능성'이라서, squash 로 합친 브랜치는 내용이 들어갔어도 원래 커밋이 닿지 않아 거절합니다(실제로 `merge --squash` 뒤 `-d sq` 가 같은 문구로 거절). 작업 폴더가 더럽고 전환 대상 브랜치가 그 파일을 다르게 가지면 `error: Your local changes to the following files would be overwritten by checkout` 으로 전환 자체를 막습니다 — 문서의 '깨끗하게 전환할 수 없으면 전환시키지 않는다'.",
        code: "$ git branch -d topic\nDeleted branch topic (was bfbd9a5).\n$ git branch -d rb2\nerror: the branch 'rb2' is not fully merged\nhint: If you are sure you want to delete it, run 'git branch -D rb2'\n\n$ git switch topic          # a.txt 를 고친 채로\nerror: Your local changes to the following files would be overwritten by checkout:\n\ta.txt\nPlease commit your changes or stash them before you switch branches.",
        codeLang: "bash",
      },
      {
        label: "문제의 구조: 그래프 위의 '도달' 하나로 전부 설명된다",
        body: "커밋은 부모를 가리키는 노드이고, 이름표(브랜치·태그·원격 추적)는 노드 하나를 가리키는 입구입니다. 어떤 커밋이 '있다'는 것과 '보인다'는 것은 다릅니다 — 보이는 것은 어느 입구에서든 부모를 따라 도달할 수 있는 커밋입니다. log 가 보여 주는 것, -d 가 지워 주는 것, push 가 보내는 것, gc 가 남겨 두는 것이 전부 이 하나의 기준 위에 있습니다. 부모는 자식을 모르므로 이름표를 떼면 그 아래 커밋은 '존재하되 도달 불가'가 되고, 그것을 다시 찾는 장치가 다음 장의 reflog 입니다.",
        code: "                 입구(이름표)\n                 master ──►  D ◄── C ◄── B ◄── A\n                 feature ─► F ◄── E ─────┘\n                                  (E 의 부모는 B)\n\n도달 가능 = 어느 입구에서든 ← 를 따라 갈 수 있는 노드\nlog         : HEAD 입구에서 도달 가능한 것\nlog --all   : 모든 입구에서\nbranch -d X : X 의 끝이 현재 입구에서 도달 가능할 때만\npush X      : X 에서 도달 가능하되 원격에 없는 것\ngc          : 어느 입구에서도 (reflog 포함) 도달 불가인 것을 치움",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "이름표를 떼거나 옮기면 도달 불가인 커밋이 생긴다는 것까지 왔습니다. 그것을 되살리는 reflog 와, 이름표를 '어느 트리까지' 함께 옮기는 reset 이 다음 장입니다. Pro Git 의 Branches in a Nutshell(41바이트 · HEAD) 과 Revision Selection(.. ... ^ ~ @{}) 이 이 장의 출처입니다.",
      },
      {
        label: "확인 질문",
        body: "병합하지 않았고 push도 하지 않은 브랜치를 -D로 지웠습니다. 그 브랜치에만 있던 커밋은 어떻게 될까요?",
        notes: [
          {
            title: "답",
            body: "어느 이름표에서도 도달할 수 없는 커밋이 됩니다. log에도 안 보이고 push에도 실려 가지 않지만 바로 지워지지는 않습니다. 일정 기간 저장소에 남아 있다가 정리(gc) 때 사라지고, 그 전에는 reflog로 찾아 이름표를 다시 붙이면 되살아납니다. 다음 단계의 주제입니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Git Branching - Branches in a Nutshell", href: `${BOOK}/Git-Branching-Branches-in-a-Nutshell` },
    ],
  },

  {
    id: "git-undo",
    name: "되돌리기와 복구",
    tagline: "무엇을 되돌리는지에 따라 명령이 갈린다",
    intro:
      "되돌린다는 말이 가리키는 대상이 여럿입니다. 작업 폴더의 수정을 버리는 것, 스테이징을 취소하는 것, 브랜치를 이전 커밋으로 옮기는 것, 이미 공유한 커밋을 취소하는 것. 명령이 여럿인 것은 대상이 여럿이기 때문입니다. 그리고 거의 모든 실수는 reflog로 되살릴 수 있습니다.",
    blocks: [
      {
        label: "restore — 파일 단위로 되돌린다",
        body: "작업 폴더의 수정을 버리거나, 스테이징에 담은 것을 다시 꺼냅니다. 커밋 기록은 건드리지 않습니다.",
        code: "git restore src/select.ts           # 작업 폴더 수정을 버린다\ngit restore --staged src/select.ts  # 담은 것을 꺼낸다 (수정은 남는다)",
        codeLang: "bash",
      },
      {
        label: "reset — 이름표를 옮긴다",
        body: "현재 브랜치의 이름표를 다른 커밋으로 옮깁니다. 옵션은 세 공간 중 어디까지 함께 되돌릴지를 정합니다. --soft는 이름표만 옮기고 스테이징과 작업 폴더를 그대로 둡니다. 기본값인 --mixed는 스테이징까지 되돌리고 작업 폴더는 둡니다. --hard는 작업 폴더까지 되돌려 커밋하지 않은 수정이 사라집니다.",
        code: "git reset --soft HEAD~1   # 마지막 커밋을 풀고 내용은 담긴 채로\ngit reset HEAD~1          # 마지막 커밋을 풀고 내용은 작업 폴더에\ngit reset --hard HEAD~1   # 마지막 커밋과 수정까지 버린다",
        codeLang: "bash",
      },
      {
        label: "revert — 취소하는 커밋을 새로 만든다",
        body: "reset은 이력을 고쳐 쓰고, revert는 이력을 그대로 둔 채 반대 변경을 새 커밋으로 쌓습니다. 이미 push해서 다른 사람이 받았을 수 있는 커밋은 revert로 취소합니다. reset으로 이력을 바꾸면 남의 저장소에 있는 이력과 어긋납니다.",
        code: "git revert 1a2b3c4   # 1a2b3c4의 변경을 되돌리는 커밋이 생긴다",
        codeLang: "bash",
      },
      {
        label: "reflog — 내 컴퓨터의 이동 기록",
        body: "reflog는 HEAD가 어느 커밋들을 거쳐 왔는지를 기록합니다. 브랜치를 잘못 지웠거나 reset --hard를 잘못 쳤어도, 그 전에 있던 커밋 ID가 여기 남아 있습니다. 찾은 커밋에 브랜치를 다시 붙이면 복구됩니다. 도달할 수 없는 커밋의 기록은 기본 30일 동안 남고 그 뒤 정리됩니다. reflog는 내 컴퓨터에만 있고 push되지 않으므로, push하지 않은 커밋은 이 기간이 지나면 정말로 사라집니다.",
        code: "git reflog\n# 37f7823 HEAD@{1}: commit: F\n# c67fe1d HEAD@{2}: commit: E\n\ngit branch feature-restored 37f7823   # 이름표를 다시 붙인다",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: reset 세 가지가 멈추는 자리",
        body: "x.txt 를 커밋한 뒤 `reset --soft HEAD~1` 을 치면 이름표만 한 칸 뒤로 갑니다. x.txt 는 담긴 채(`A  x.txt`)입니다.\n`reset --mixed HEAD`(기본값)는 Index 까지 되돌립니다. x.txt 가 `?? x.txt` 가 되고 작업 폴더에는 그대로 있습니다.\n`reset --hard HEAD~1` 은 작업 폴더까지 되돌려 x.txt 가 사라집니다(`ls: x.txt: No such file or directory`). Reset Demystified 의 문장은 '--hard 가 reset 을 위험하게 만드는 유일한 길'입니다.\n경로를 주는 `git reset a.txt` 는 이름표를 옮기지 않습니다(커밋의 일부를 가리킬 수 없으니). Index 의 그 파일만 HEAD 로 되돌립니다. `restore --staged a.txt` 와 같습니다. 둘을 나란히 돌려 결과(` M a.txt`)가 같았습니다.",
        code: "$ git add x.txt && git commit -q -m x\n$ git reset --soft HEAD~1 && git status --short\nA  x.txt                 # 이름표만 뒤로, 담긴 것은 그대로\n$ git reset --mixed HEAD && git status --short\n?? x.txt                 # Index 도 되돌림, 파일은 남음\n$ git add x.txt && git commit -q -m x && git reset --hard HEAD~1 && ls x.txt\nls: x.txt: No such file or directory      # 작업 폴더까지\n\n$ git add a.txt && git reset -q a.txt && git status --short\n M a.txt                 # = git restore --staged a.txt",
        codeLang: "bash",
        terms: [
          {
            term: "Reset Demystified 의 표",
            body: "HEAD / Index / Workdir / 작업 폴더 안전? — reset --soft: REF/NO/NO/YES, reset(--mixed): REF/YES/NO/YES, reset --hard: REF/YES/YES/NO, checkout <branch>: HEAD/YES/YES/YES, reset <paths>: NO/YES/NO/YES. 'WD Safe?' 열이 NO 인 것은 --hard 와 경로를 준 checkout 둘뿐입니다.",
          },
        ],
      },
      {
        label: "실제로 돌려 보면: reflog 로 되살리고, gc 가 지우는 조건",
        body: "`reset --hard` 로 잃은 커밋 x 는 `git reflog` 에 `f4f67af HEAD@{1}: commit: x` 로 남아 있었고 `git cat-file -t f4f67af` 는 여전히 commit, `git branch recovered f4f67af` 로 되살아났습니다. reflog 는 '내 컴퓨터의 HEAD 이동 기록'이라 push 되지 않고, 기본 보존은 도달 가능한 항목 90일(gc.reflogExpire) · 도달 불가 항목 30일(gc.reflogExpireUnreachable) — 둘 다 설정에 없으면 그 기본값입니다. 그 뒤 gc 가 치웁니다. 실제로 억지로 재현하면 `git reflog expire --expire-unreachable=now --all && git gc --prune=now` 뒤 그 커밋은 `fatal: git cat-file: could not get object info` — 정말 사라졌습니다. reflog 마저 없을 때의 마지막 길이 `git fsck --lost-found` 의 `dangling commit 3850408…` 입니다.",
        code: "$ git reflog | head -3\n5e697d0 HEAD@{0}: reset: moving to HEAD~1\nf4f67af HEAD@{1}: commit: x              # ← 잃은 커밋\n5e697d0 HEAD@{2}: reset: moving to HEAD\n$ git cat-file -t f4f67af\ncommit\n$ git branch recovered f4f67af           # 이름표를 다시 붙이면 끝\n\n# 정말 사라지는 조건 (억지로 재현)\n$ git reflog expire --expire-unreachable=now --all && git gc -q --prune=now\n$ git cat-file -t <doomed>\nfatal: git cat-file: could not get object info\n\n$ git fsck --lost-found | head -1\ndangling commit 38504088bf7e6ee84f2920dee118c0c73f0d2380",
        codeLang: "bash",
      },
      {
        label: "amend 와 revert: 고쳐 쓰기와 덧쓰기",
        body: "`git commit --amend` 는 마지막 커밋을 새 커밋으로 '교체'합니다 — 해시가 바뀌고 옛 커밋은 reflog 에만 남습니다. 문서: '아직 로컬이고 push 하지 않은 커밋만 amend 하라'. 담긴 것이 없고 메시지도 같으면 'You asked to amend the most recent commit, but doing so would make it empty.' 가 뜹니다. revert 는 반대 변경을 새 커밋으로 쌓아 이력을 보존합니다. 병합 커밋을 revert 하려면 어느 부모 쪽을 기준으로 할지 `-m 1` 이 필요합니다 — 실제로 없이 치면 `error: commit 5e697d0… is a merge but no -m option was given.` Advanced Merging 의 주의 — 병합을 revert 한 뒤 같은 브랜치를 다시 merge 하면 'Already up to date' 가 되므로 그 revert 를 다시 revert 해야 합니다.",
        code: "$ git revert --no-edit HEAD          # HEAD 가 병합 커밋\nerror: commit 5e697d03eaf008da6a589cffa9ce1e5b7ac94932 is a merge but no -m option was given.\nfatal: revert failed\n$ git revert --no-edit -m 1 HEAD\n[master 3076200] Revert \"Merge branch 'nf'\"",
        codeLang: "bash",
      },
      {
        label: "문제가 나는 경우: 어느 되돌리기인가",
        body: "'되돌린다'는 말이 가리키는 대상별로 명령을 고릅니다. 공유 여부가 두 번째 축입니다.",
        code: "되돌릴 것                          공유 전 (로컬만)                       공유 후 (push 됨)\n────────────────────────────────  ────────────────────────────────────  ──────────────────────────\n작업 폴더의 수정                    git restore <file>  (수정은 사라짐!)      (같음 — 로컬 일)\n담은 것 취소                        git restore --staged <file> / reset <file>  (같음)\n마지막 커밋 메시지·내용              git commit --amend                      revert 또는 새 커밋\n마지막 커밋 자체                    git reset --soft/--mixed/--hard HEAD~1    git revert <sha>\n병합 커밋                           git reset --hard HEAD~1                 git revert -m 1 <merge>\n지운 브랜치 · 잘못한 reset           git reflog → git branch <name> <sha>     원격에 있으면 fetch 로\n커밋하지 않은 수정을 --hard 로 날림   (reflog 에 없음 — 복구 불가)             —",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 커밋된 것은 거의 항상 돌아오고, 커밋 안 된 것은 안 돌아온다",
        body: "Pro Git 의 결론 문장 — '커밋된 것은 거의 항상 복구할 수 있다. 커밋되지 않은 것은 다시 볼 수 없을 가능성이 크다'. 구조는 둘입니다. 커밋 객체는 이름표를 떼도 삭제되지 않고 '도달 불가'가 될 뿐이며, HEAD 의 이동은 reflog 에 적혀 그 커밋으로 가는 입구가 한동안 남습니다. 반면 작업 폴더의 수정은 객체가 아니라 그냥 파일이라 `restore` · `reset --hard` · `checkout <paths>` 가 덮어쓰면 git 어디에도 없습니다. 그래서 위험한 명령은 '작업 폴더를 건드리는' 셋이고, 그 외의 모든 실수는 reflog 거리 안에 있습니다. 자주 커밋하고(메시지가 임시여도 amend·rebase -i 로 다듬을 수 있음) 자주 push 하는 것이 가장 확실한 백업인 이유입니다.",
      },
      {
        label: "다음 입구",
        body: "로컬에서 무엇이 되살아나는지 알았으니, 원격에 올린 것과 안 올린 것의 차이가 읽힙니다 — push 된 커밋은 다른 저장소에도 있어 reflog 와 무관하게 안전하고, 거꾸로 push 된 것을 reset 하면 남의 이력과 어긋납니다. 출처는 Undoing Things · Reset Demystified · Maintenance and Data Recovery · Rewriting History 입니다.",
      },
      {
        label: "확인 질문",
        body: "push해 둔 브랜치를 로컬에서 -D로 지운 직후 마음이 바뀌었습니다. 되살리려면 reflog가 꼭 필요할까요?",
        notes: [
          {
            title: "답",
            body: "필요하지 않습니다. 로컬 삭제는 원격에 영향을 주지 않으므로 원격에는 브랜치가 그대로 있습니다. fetch한 뒤 원격 추적 브랜치에서 다시 만들면 됩니다 (git switch feature).",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Git Basics - Undoing Things", href: `${BOOK}/Git-Basics-Undoing-Things` },
      { label: "Git Tools - Reset Demystified", href: `${BOOK}/Git-Tools-Reset-Demystified` },
      { label: "Git Internals - Maintenance and Data Recovery", href: `${BOOK}/Git-Internals-Maintenance-and-Data-Recovery` },
      { label: "git-reflog", href: "https://git-scm.com/docs/git-reflog" },
    ],
  },

  {
    id: "git-remote",
    name: "로컬과 원격",
    tagline: "명시적으로 주고받을 때만 맞춰지는 두 저장소",
    intro:
      "내 컴퓨터의 저장소와 GitHub의 저장소는 서로 자동으로 맞춰지지 않는 별개의 저장소입니다. push와 fetch처럼 명시적으로 주고받을 때만 같아집니다. 원격 브랜치가 지워졌는데 로컬에는 남아 있거나, 원격이 앞서 있는데 로컬 브랜치는 뒤처져 있는 일이 모두 이 사실에서 나옵니다.",
    blocks: [
      {
        label: "원격 추적 브랜치는 마지막으로 본 원격의 기록이다",
        body: "로컬에는 내가 작업하는 브랜치(feature)와 별도로 origin/feature 같은 원격 추적 브랜치가 있습니다. 이것은 마지막으로 원격과 통신했을 때 원격의 그 브랜치가 어디를 가리켰는지에 대한 기록입니다. 실시간 상태가 아니라 스냅샷이라, 통신하기 전까지는 원격이 바뀌어도 그대로입니다.",
        terms: [
          {
            term: "upstream (추적 관계)",
            body: "로컬 브랜치가 어느 원격 브랜치와 짝인지에 대한 설정입니다. 이게 있어야 git pull과 git push를 인자 없이 쓸 수 있고, git status가 몇 커밋 앞섰거나 뒤처졌는지 알려줍니다.",
          },
        ],
      },
      {
        label: "fetch는 받아 오기만, pull은 합치기까지",
        body: "git fetch는 원격의 새 커밋을 받아 원격 추적 브랜치만 갱신하고, 내 브랜치와 작업 폴더는 건드리지 않습니다. git pull은 fetch한 뒤 원격 추적 브랜치를 내 브랜치에 합칩니다. pull = fetch + merge입니다. 합치기 전에 무엇이 들어오는지 보고 싶으면 fetch만 하고 살펴본 뒤 합치면 됩니다.",
        code: "git fetch\ngit log HEAD..origin/main   # 들어올 커밋만 본다\ngit merge origin/main       # 확인했으면 합친다 (= pull)",
        codeLang: "bash",
      },
      {
        label: "push는 이름표를 기준으로 도달 가능한 커밋을 보낸다",
        body: "push할 때는 브랜치 이름을 지정하고, git은 그 브랜치에서 도달할 수 있으면서 원격에 없는 커밋을 보냅니다. 이름표를 지운 브랜치는 지정할 이름이 없으니 push할 수 없고, 어느 브랜치에서도 닿지 않는 커밋은 경고 없이 로컬에만 남습니다.",
        code: "git push -u origin feature   # 처음 올릴 때 추적 관계도 함께 설정\ngit push                     # 이후에는 이름 없이",
        codeLang: "bash",
      },
      {
        label: "지우는 일도 따로따로다",
        body: "로컬 브랜치를 지워도 원격은 그대로이고, 원격 브랜치가 지워져도 로컬 브랜치와 원격 추적 브랜치는 남습니다. PR이 병합되며 GitHub에서 브랜치가 지워진 뒤 git pull을 하면 '가져올 레퍼런스가 없다'는 메시지가 나오는 것이 이 경우입니다. 원격에서 사라진 기록은 fetch --prune으로 정리하고, 다 쓴 로컬 브랜치는 -d로 지웁니다.",
        code: "git push origin --delete feature   # 원격 브랜치 삭제\ngit fetch --prune                  # 원격에서 사라진 origin/* 정리\ngit branch -d feature              # 로컬 브랜치 삭제",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: upstream 이 없을 때의 두 문구와 .git/config",
        body: "추적 관계(upstream)가 없는 브랜치에서 `git push` 를 치면 `fatal: The current branch nostream has no upstream branch.` 와 함께 `git push --set-upstream origin nostream` 을 안내하고, `git pull` 은 `There is no tracking information for the current branch.` 입니다. `-u` 로 한 번 올리면 `.git/config` 에 `branch.master.remote origin` 과 `branch.master.merge refs/heads/master` 두 줄이 생기고, 그 뒤 `git branch -vv` 가 `[origin/master]` 와 `ahead 1` 같은 숫자를 붙입니다. 문서의 주의 — 그 숫자는 '마지막으로 fetch 한 시점 기준'이라 `git fetch --all; git branch -vv` 가 짝입니다.",
        code: "$ git push\nfatal: The current branch nostream has no upstream branch.\nTo push the current branch and set the remote as upstream, use\n\n    git push --set-upstream origin nostream\n$ git pull\nThere is no tracking information for the current branch.\nPlease specify which branch you want to merge with.\n\n$ git push -u origin master && git config --get-regexp 'branch\\.master\\.'\nbranch.master.remote origin\nbranch.master.merge refs/heads/master\n$ git branch -vv | head -1\n* master 83c33ba [origin/master: ahead 1] master file",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: 거절되는 push 와 pull --rebase",
        body: "동료가 먼저 push 한 뒤 내가 push 하면 `! [rejected] master -> master (fetch first)` 와 `hint: Updates were rejected because the remote contains work that you do not have locally.` — 원격의 이름표가 내 것의 후손이 아니라서(fast-forward 가 아니라서) 거절합니다. `git pull --rebase` 로 내 커밋을 원격 끝으로 옮긴 뒤 push 하면 올라갑니다(실제로 그래프가 한 줄로 `mine` → `other commit`). force 로 밀어 넣으려 해도 `--force-with-lease` 는 원격이 내가 마지막으로 본 상태와 다르면 `! [rejected] master -> master (stale info)` 로 막습니다 — 남의 커밋을 덮어쓰는 사고를 막는 안전장치입니다. Git 2.27+ 는 `pull.rebase` 가 설정되지 않은 pull 에 경고를 내고 '설정할 때까지 계속 경고한다'.",
        code: "$ git push\n ! [rejected]        master -> master (fetch first)\nhint: Updates were rejected because the remote contains work that you do not\nhint: have locally. …\n$ git pull --rebase && git push\n* c4fa7cc mine\n* 86adf91 other commit             # 내 커밋이 동료 커밋 위로 옮겨졌다\n\n$ git push --force-with-lease       # 원격이 그새 또 바뀌었다면\n ! [rejected]        master -> master (stale info)",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: 원격 브랜치가 지워진 뒤",
        body: "동료가 `git push origin --delete feature` 로 원격 브랜치를 지워도 내 `origin/feature` 는 그대로입니다 — 마지막으로 본 기록이니까요. `git fetch --prune` 이 ` - [deleted] (none) -> origin/feature` 를 찍으며 정리합니다. 그 상태에서 upstream 이 사라진 로컬 브랜치로 `git pull` 하면 `fatal: the requested upstream branch 'origin/feature' does not exist` — PR 병합 뒤 브랜치가 GitHub 에서 지워졌을 때 보는 그 문구입니다. 원격 쪽 데이터는 '가비지 컬렉션이 돌 때까지 한동안 남아' 있어 GitHub 의 PR 화면에서 Restore branch 가 되는 이유도 같습니다.",
        code: "$ git fetch --prune\nFrom ../origin\n - [deleted]         (none)     -> origin/feature\n$ git pull                      # upstream 이 origin/feature 인 로컬 브랜치에서\nfatal: the requested upstream branch 'origin/feature' does not exist",
        codeLang: "bash",
      },
      {
        label: "문제의 구조: 저장소가 셋이고, 이름표는 저장소마다 따로 있다",
        body: "내 저장소에는 로컬 브랜치(refs/heads/*)와 원격 추적 브랜치(refs/remotes/origin/*)가 있고, 원격 저장소에는 그 저장소의 브랜치(refs/heads/*)가 있습니다. 세 묶음은 각각 따로 움직입니다. fetch 는 원격 → 원격 추적만, push 는 로컬 → 원격만, merge/pull 이 원격 추적 → 로컬. 원격 추적 브랜치는 '읽기 전용'이라 거기서 커밋할 수 없고(HEAD 를 그쪽으로 가리키지 않음), 그래서 모든 어긋남 — fetch 했는데 뒤처짐, 원격은 지워졌는데 로컬에 남음, push 거절 — 이 '어느 묶음이 안 움직였나'로 읽힙니다.",
        code: "내 저장소                                     원격 저장소 (origin)\n┌───────────────────────────────────────┐    ┌──────────────────────┐\n│ refs/heads/feature     (내가 작업)     │    │ refs/heads/feature   │\n│ refs/remotes/origin/feature (마지막 본) │◄───│   fetch (원격 → 추적) │\n│         ▲ merge / pull                 │    │                      │\n│         └─ 로컬 ◄── 추적               │───►│   push (로컬 → 원격)  │\n└───────────────────────────────────────┘    └──────────────────────┘\n삭제도 따로: branch -d (로컬) · push --delete (원격) · fetch --prune (추적)",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "push 가 거절되는 조건이 '내 이름표가 원격의 후손이 아닐 때'였으니, 후손으로 만드는 두 길 — 합치기(merge)와 옮겨 쌓기(rebase) — 가 다음 장입니다. 출처는 Working with Remotes · Remote Branches 입니다.",
      },
      {
        label: "확인 질문",
        body: "git fetch를 한 뒤 브랜치로 이동했더니 '원격보다 102개 커밋 뒤에 있다'는 메시지가 나왔습니다. fetch를 했는데 왜 뒤처져 있을까요?",
        notes: [
          {
            title: "답",
            body: "fetch는 원격 추적 브랜치(origin/…)만 최신으로 만들고 로컬 브랜치는 옮기지 않기 때문입니다. 로컬 브랜치를 따라잡게 하려면 merge나 pull로 합쳐야 합니다. 로컬에 따로 쌓은 커밋이 없다면 이 합치기는 이름표를 앞으로 옮기기만 하는 fast-forward가 됩니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Git Basics - Working with Remotes", href: `${BOOK}/Git-Basics-Working-with-Remotes` },
      { label: "Git Branching - Remote Branches", href: `${BOOK}/Git-Branching-Remote-Branches` },
    ],
  },

  {
    id: "git-merge",
    name: "합치기와 충돌",
    tagline: "같은 자리를 양쪽이 고쳤을 때만 사람이 고른다",
    intro:
      "두 갈래를 합치는 방법은 셋이고, 충돌은 그중 git이 스스로 결정할 수 없는 경우에만 납니다. 같은 파일을 고쳤다고 충돌이 나는 것이 아니라, 같은 자리를 양쪽이 다르게 고쳤을 때 납니다. 브랜치 삭제처럼 합치기가 아닌 일에서는 충돌이 나지 않습니다.",
    blocks: [
      {
        label: "fast-forward — 이름표만 앞으로",
        body: "합치려는 쪽이 내 브랜치의 후손이면, 즉 내가 갈라진 뒤 따로 쌓은 커밋이 없으면 새 커밋을 만들 필요가 없습니다. 이름표를 상대 커밋까지 앞으로 옮기면 끝입니다.",
        code: "# 합치기 전: main은 C, feature는 E\nA ← B ← C ← D ← E\n        ↑       ↑\n      main   feature\n\ngit switch main && git merge feature   # main이 E로 이동",
        codeLang: "bash",
      },
      {
        label: "병합 커밋 — 두 갈래를 잇는 새 커밋",
        body: "양쪽에 각자 커밋이 쌓여 있으면 git은 두 갈래가 갈라진 지점(merge base)과 양쪽 끝을 비교해 합친 스냅샷을 만들고, 부모가 둘인 병합 커밋을 남깁니다. 한쪽만 고친 부분은 그 변경을 그대로 가져오므로 사람이 할 일이 없습니다.",
      },
      {
        label: "충돌이 나는 조건",
        body: "갈라진 지점에서 보았을 때 양쪽이 같은 줄 근처를 서로 다르게 고쳤거나, 한쪽은 파일을 고치고 다른 쪽은 지웠을 때입니다. git은 어느 쪽이 맞는지 판단하지 않고 표시를 남긴 채 멈춥니다. 표시를 정리하고 add한 뒤 커밋하면 합치기가 끝나고, 도중에 그만두려면 merge --abort를 칩니다.",
        code: "<<<<<<< HEAD\nconst gap = 4;\n=======\nconst gap = 8;\n>>>>>>> feature\n\n# 고른 뒤\ngit add src/select.ts\ngit commit            # 또는 그만두기: git merge --abort",
        codeLang: "text",
      },
      {
        label: "rebase — 내 커밋을 상대 끝으로 옮겨 다시 쌓기",
        body: "rebase는 내 브랜치의 커밋들을 상대 브랜치의 끝에서 하나씩 다시 만듭니다. 병합 커밋 없이 이력이 한 줄이 되지만, 다시 만든 커밋은 내용이 같아도 ID가 새것입니다. 그래서 이미 push해서 남이 받았을 수 있는 커밋을 rebase하면 서로의 이력이 어긋납니다. 혼자 쓰는 브랜치에서만 쓰고, rebase 후 push에는 --force-with-lease를 씁니다.",
        code: "git switch feature\ngit rebase main\ngit push --force-with-lease   # 원격이 내가 본 그대로일 때만 덮어쓴다",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: 충돌의 모양과 status, diff --cc",
        body: "같은 파일 a.txt 의 같은 줄을 양쪽이 다르게 고친 뒤 merge 하면 세 줄이 나옵니다. `Auto-merging a.txt` → `CONFLICT (content): Merge conflict in a.txt` → `Automatic merge failed; fix conflicts and then commit the result.` 입니다. `git status --short` 는 `UU a.txt`(양쪽 수정, unmerged)를 보여 줍니다. 긴 status 는 'Unmerged paths' 아래 'both modified:' 를 보여 줍니다. 파일에는 `<<<<<<< HEAD` / `=======` / `>>>>>>> topic` 표시가 들어갑니다. 이때의 `git diff` 는 두 열짜리 결합 diff(`diff --cc`, `@@@`)로 아직 안 푼 부분만 보여 줍니다. 표시를 정리하고 add · commit 하면 부모가 둘인 병합 커밋이 생깁니다. 실제로 `git cat-file -p HEAD | grep -c '^parent'` 가 2 였습니다. `merge.conflictstyle diff3` 을 켜면 `||||||| base` 로 갈라진 시점의 원문도 함께 보입니다. 어느 쪽이 무엇을 바꿨는지 읽기가 쉬워집니다.",
        code: "$ git merge topic\nAuto-merging a.txt\nCONFLICT (content): Merge conflict in a.txt\nAutomatic merge failed; fix conflicts and then commit the result.\n$ git status --short\nUU a.txt\n$ cat a.txt\n<<<<<<< HEAD\nMAIN\n=======\nTOPIC\n>>>>>>> topic\n$ git diff | head -6\ndiff --cc a.txt\nindex e5cdc04,ddd5e2b..0000000\n@@@ -1,1 -1,1 +1,5 @@@\n++<<<<<<< HEAD\n +MAIN\n\n$ printf 'RESOLVED\\n' > a.txt && git add a.txt && git commit -q -m 'merge topic'\n$ git cat-file -p HEAD | grep -c '^parent'\n2",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: fast-forward · --no-ff · --squash",
        body: "feature 가 master 의 후손이면 `git merge feature` 는 `Updating 454e82b..f7235cf` / `Fast-forward` 를 보여 줍니다. 이름표만 옮기고 커밋을 만들지 않습니다.\n`--no-ff` 는 그래도 병합 커밋을 만듭니다(`Merge made by the 'ort' strategy.`). 2.55 의 기본 전략 이름이 ort 이고 옛 문서는 recursive 입니다. GitHub 의 'Create a merge commit' 이 이 모양입니다.\n`--squash` 는 상대 커밋들의 변경을 한 덩어리로 Index 에 담고 멈춥니다(`Squash commit -- not updating HEAD`). 커밋은 내가 하고, 부모는 하나입니다. 그래서 squash 뒤 원래 브랜치는 '닿지 않는' 브랜치가 되어 `branch -d` 가 거절합니다(실제로 `error: the branch 'sq' is not fully merged` 였습니다). GitHub 의 'Squash and merge' 뒤 로컬에서 보는 그 거절입니다.",
        code: "$ git merge --ff-only feature\nUpdating 454e82b..f7235cf\nFast-forward\n$ git merge --no-ff --no-edit nf\nMerge made by the 'ort' strategy.\n*   1c44ff3 Merge branch 'nf'\n|\\\n| * b02296d nf\n|/\n$ git merge --squash sq\nAutomatic merge went well; stopped before committing as requested\nSquash commit -- not updating HEAD\n$ git commit -q -m 'squash sq' && git branch -d sq\nerror: the branch 'sq' is not fully merged     # 내용은 들어갔지만 커밋은 닿지 않는다",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: rebase 는 새 커밋을 만들고, 충돌은 커밋 단위로 멈춘다",
        body: "`git rebase master` 는 내 커밋을 master 끝에서 하나씩 다시 만듭니다. 실제로 `rb work` 가 12686bd 에서 62e7c36 으로 해시가 바뀌었고 그래프는 한 줄입니다. 충돌이 나면 커밋 하나 단위로 멈춥니다. `CONFLICT (content): Merge conflict in a.txt` / `error: could not apply d61f7a0... rb2 edits a` 가 나옵니다. status 는 `UU a.txt` 와 'interactive rebase in progress; onto 5e697d0' 을 보여 줍니다. 풀고 add 한 뒤 `git rebase --continue` 를 하면 `Successfully rebased and updated refs/heads/rb2.` 가 나옵니다(편집기를 띄우니 `GIT_EDITOR=true` 로 넘겼습니다). 그만두려면 `--abort` 입니다. Pro Git 의 굵은 규칙은 '내 저장소 밖에 존재하고 남이 그 위에 작업했을 수 있는 커밋은 rebase 하지 마라'입니다. 혼자 쓰는 브랜치에서 rebase 한 뒤의 push 는 `--force-with-lease` 입니다.",
        code: "$ git log --oneline -1\n12686bd rb work\n$ git rebase master\nSuccessfully rebased and updated refs/heads/rb.\n$ git log --oneline -1\n62e7c36 rb work                 # 같은 내용, 새 해시\n\n$ git rebase master            # rb2: 충돌\nCONFLICT (content): Merge conflict in a.txt\nerror: could not apply d61f7a0... rb2 edits a\n$ git status | sed -n 1p\ninteractive rebase in progress; onto 5e697d0\n$ printf 'RB2 RESOLVED\\n' > a.txt && git add a.txt && GIT_EDITOR=true git rebase --continue\nSuccessfully rebased and updated refs/heads/rb2.",
        codeLang: "bash",
        terms: [
          {
            term: "rebase -i (interactive)",
            body: "커밋 목록을 편집기로 열어 pick · reword · edit · squash · fixup · drop 을 적는 것입니다. 메시지 고치기(reword), 여러 커밋 합치기(squash/fixup), 쪼개기(edit 뒤 reset HEAD^), 순서 바꾸기·지우기가 됩니다. 스크립트의 주석은 '여기서 줄을 지우면 그 커밋은 사라진다'입니다. 실제로 GIT_SEQUENCE_EDITOR 로 둘째 줄을 squash 로 바꿔 두 커밋을 하나(part 1)로 합쳤습니다. 로컬 커밋에만 씁니다.",
          },
        ],
      },
      {
        label: "문제가 나는 경우: 합치기 전후",
        body: "합치기에서 자주 보는 상황과 문구입니다.",
        code: "증상                                          뜻                                  처방\n────────────────────────────────────────────  ─────────────────────────────────\nAlready up to date.                            상대 커밋이 전부 이미 닿는다           할 일 없음 (revert 한 병합이면\n                                                                               revert 를 revert)\nUpdating a..b / Fast-forward                    내 쪽에 새 커밋이 없어 이름표만 이동     기록을 남기려면 --no-ff\nCONFLICT (content) … fix conflicts and then commit  같은 자리를 양쪽이 고쳤다               표시 정리 → add →\n                                                    commit (또는 merge --abort)\nCONFLICT (modify/delete)                       한쪽은 고치고 한쪽은 지웠다              남길지 지울지 골라 add/rm\nfatal: There is no merge to abort (MERGE_HEAD missing).  진행 중인 병합이 없다                   (이미 끝났거나\n                                                         rebase 중 → rebase --abort)\nerror: could not apply <sha>… (rebase)          rebase 가 그 커밋에서 멈춤               풀고 add → rebase\n                                                --continue / --abort / --skip\n! [rejected] … (fetch first)                    원격이 내 후손이 아님                   pull --rebase 또는\n                                                merge 뒤 push\n! [rejected] … (stale info)                     force-with-lease 가 본 원격이 바뀜        fetch 로 확인 뒤 다시",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 합치기는 셋 다 '같은 스냅샷' 을 만들고 이력 모양만 다르다",
        body: "merge · rebase · squash 가 만드는 최종 파일 내용은 같습니다. 다른 것은 그래프입니다. merge 는 두 갈래를 그대로 두고 부모가 둘인 노드로 잇습니다(무슨 일이 있었나의 기록). rebase 는 한쪽 노드들을 복제해 다른 쪽 끝에 이어 한 줄로 만듭니다(어떻게 만들어졌나의 이야기) — 복제라서 해시가 바뀌고, 남이 원본을 가지고 있으면 어긋납니다. squash 는 한쪽 노드들을 하나로 접어 붙입니다 — 원본은 닿지 않게 됩니다. 충돌은 셋 모두에서 같은 조건(갈라진 시점 기준으로 같은 자리를 다르게)으로 나고, rebase 와 squash 는 커밋마다 또는 통째로 한 번 납니다. 어느 것을 고를지는 git 이 아니라 팀의 이력 정책이고, GitHub 의 병합 버튼 셋이 정확히 이 셋입니다.",
        code: "출발:   A ← B ← C (master)        A ← B ← X ← Y (feature)\n\nmerge   A ← B ← C ← M             M 의 부모: C, Y          기록 보존 · 그래프 갈라짐\n                 ↖ X ← Y\nrebase  A ← B ← C ← X' ← Y'       X', Y' 는 새 해시         한 줄 · 원본 X, Y 와 어긋남\nsquash  A ← B ← C ← S             S 하나, 부모 C            한 줄 · X, Y 는 닿지 않음",
        codeLang: "text",
      },
      {
        label: "다음 입구",
        body: "병합 버튼 셋이 여기의 셋이라는 것이 다음 장 GitHub 협업의 출발점입니다. 출처는 Basic Branching and Merging · Rebasing(The Perils of Rebasing) · Advanced Merging(--abort · diff3 · revert -m) · Rewriting History(rebase -i) 입니다.",
      },
      {
        label: "확인 질문",
        body: "나와 동료가 같은 출발점에서 각자 브랜치를 따서 같은 파일을 고쳤고, 동료 것이 먼저 병합됐습니다. 내 것을 병합할 때 충돌이 날까요?",
        notes: [
          {
            title: "답",
            body: "같은 파일이라는 것만으로는 알 수 없습니다. 서로 다른 부분을 고쳤다면 git이 양쪽을 그대로 합치고, 같은 줄 근처를 다르게 고쳤다면 충돌이 납니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "Git Branching - Basic Branching and Merging", href: `${BOOK}/Git-Branching-Basic-Branching-and-Merging` },
      { label: "Git Branching - Rebasing", href: `${BOOK}/Git-Branching-Rebasing` },
    ],
  },

  {
    id: "git-github",
    name: "GitHub 협업",
    tagline: "PR은 git이 아니라 GitHub의 기능이다",
    intro:
      "git에는 Pull Request가 없습니다. PR은 GitHub가 두 브랜치 사이에 올려 둔 대화 창구이고, 병합 버튼은 앞 단계의 합치기를 GitHub가 대신 실행하는 것입니다. 무엇이 git이고 무엇이 GitHub인지 가르면, 병합 뒤 로컬에서 무엇을 해야 하는지가 보입니다.",
    blocks: [
      {
        label: "base와 compare",
        body: "PR은 compare 브랜치의 커밋을 base 브랜치에 합치자는 제안입니다. 브랜치 자체에는 부모가 없으므로, 어디에 합칠지는 PR을 만들 때 사람이 base로 정합니다. PR에 보이는 커밋은 compare에서는 닿고 base에서는 닿지 않는 커밋, 즉 git log base..compare의 결과입니다.",
      },
      {
        label: "병합 방식 셋",
        body: "Create a merge commit은 부모가 둘인 병합 커밋을 남겨 브랜치의 커밋이 그대로 이력에 들어갑니다. Squash and merge는 브랜치의 커밋 전부를 한 커밋으로 뭉쳐 base에 올리므로, 원래 커밋들은 base 이력에 들어가지 않습니다. Rebase and merge는 커밋들을 base 끝에 다시 만들어 올리므로 ID가 바뀝니다. 뒤의 둘을 쓰면 로컬 브랜치의 커밋이 base에서 닿지 않아, 병합된 브랜치인데도 git branch -d가 거절할 수 있습니다.",
      },
      {
        label: "위에 쌓는 PR",
        body: "큰 작업은 상위 브랜치를 하나 두고, 그 위에 하위 브랜치를 따서 하위 PR의 base를 상위 브랜치로 잡는 방식으로 나눌 수 있습니다. 하위 PR이 상위에 병합되면, 다른 하위 브랜치는 상위 브랜치를 다시 받아 합쳐 두어야 뒤의 PR에 앞의 변경이 섞여 보이지 않습니다.",
      },
      {
        label: "병합 뒤 로컬에서 할 일",
        body: "GitHub에서 병합하고 브랜치를 지워도 내 컴퓨터는 모릅니다. base 브랜치로 옮겨 pull하고, 원격에서 사라진 기록을 정리하고, 다 쓴 로컬 브랜치를 지웁니다.",
        code: "git switch main\ngit pull\ngit fetch --prune\ngit branch -d feature",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: 병합 버튼 셋을 로컬 명령으로",
        body: "GitHub 의 세 버튼은 앞 장의 세 명령입니다.\n'Create a merge commit' 은 `git merge --no-ff` 입니다. 실제로 `Merge made by the 'ort' strategy.` 가 나오고 부모는 둘입니다.\n'Squash and merge' 는 `git merge --squash` 뒤 커밋 하나입니다. 원래 커밋들은 base 에서 닿지 않아 로컬 `branch -d` 가 거절합니다.\n'Rebase and merge' 는 base 끝에 커밋들을 다시 만들어 올립니다. 해시가 바뀝니다. GitHub 문서는 커미터 정보가 항상 바뀌고 처음부터 빈 커밋은 떨어진다고 적습니다.\nGitHub 문서의 주의는 둘입니다. squash 는 '수명이 짧은 브랜치에 가장 잘 맞고', squash 뒤 같은 head 브랜치를 계속 쓰면 같은 충돌이 되풀이될 수 있습니다. 처방은 다음 PR 전에 base 를 merge 하거나 rebase 하는 것입니다. rebase and merge 를 GitHub 가 안전하게 할 수 없으면 로컬에서 rebase 해 push 하라고 합니다.",
        code: "GitHub 버튼               로컬 명령                      결과 그래프            로컬 branch -d\n────────────────────────  ─────────────────────────────  ────────────────────  ──────────────\nCreate a merge commit     git merge --no-ff feature       부모 둘인 M            OK (닿음)\nSquash and merge          git merge --squash + commit     부모 하나인 S           거절 (-D 필요)\nRebase and merge          git rebase base → ff            X', Y' 새 해시          거절 (-D 필요)",
        codeLang: "text",
      },
      {
        label: "PR 의 diff 는 세 점(...) 비교다",
        body: "GitHub 문서 — 'PR 은 head 브랜치의 제안 변경을 base 브랜치와 비교한다', 그리고 비교는 세 점 `git diff base...head` 즉 merge base 기준입니다. 두 점 `base..head` 는 두 끝을 직접 비교해 base 가 그새 받은 변경까지 '내가 되돌린 것'처럼 보입니다. 실제로 master 가 m2.txt 를 더한 뒤 `git diff --stat master..side` 는 '2 files changed, 1 insertion, 1 deletion'(m2 삭제가 섞임), `master...side` 는 '1 file changed, 1 insertion'(side 가 더한 것만)이었습니다. PR 에 보이는 커밋 목록도 `git log base..head` — 좁히기 장의 범위 문법 그대로. 그리고 PR 은 base 를 바꾸지 않는 '모의 병합' ref 를 따로 만들어 Checks 를 돌리고, compare 페이지와 PR 페이지는 merge base 를 다르게 잡아 diff 가 다를 수 있다고 문서가 적습니다.",
        code: "$ git diff --stat master..side        # 두 점: 끝 ↔ 끝\n 2 files changed, 1 insertion(+), 1 deletion(-)     # master 가 더한 m2.txt 가 '삭제' 로 보인다\n$ git diff --stat master...side       # 세 점: merge base ↔ side  (PR 이 쓰는 것)\n 1 file changed, 1 insertion(+)",
        codeLang: "bash",
      },
      {
        label: "GitHub 가 더하는 것: 보호 브랜치 · 초안 · 충돌 해결 · 간접 병합",
        body: "git 에 없고 GitHub 에만 있는 것들입니다.\n보호 브랜치는 force push 와 삭제를 막습니다. 상태 검사·리뷰·코드 오너 승인·서명 커밋을 요구할 수 있습니다. 관리자는 'Include administrators' 가 아니면 조건 미달이어도 병합할 수 있다는 노트가 있습니다.\n초안(Draft) PR 은 '병합할 수 없고 코드 오너 리뷰가 자동 요청되지 않는다'고 합니다.\n충돌은 'PR 을 GitHub 에서 병합하려면 모든 병합 충돌을 먼저 풀어야' 하고 '단순한 줄 충돌은 GitHub 에서 풀 수 있다'고 합니다. 복잡하면 로컬에서 풀어 push 합니다.\n간접 병합은 head 의 커밋이 다른 경로(다른 PR·직접 push)로 base 에서 닿게 되면 그 PR 도 merged 로 표시되는 것입니다. 역시 '도달 가능성'입니다.",
        code: "git 에 있는 것                     GitHub 가 더한 것\n────────────────────────────────  ─────────────────────────────────────────────\nmerge · rebase · squash            병합 버튼 셋 + 저장소 설정으로 허용 방식 제한\nbranch · push                      보호 브랜치 (force push · 삭제 금지, 검사·리뷰 요구)\n(없음)                              PR · Draft · 리뷰 · Checks · 모의 병합 ref\nlog base..head · diff base...head   PR 의 Commits · Files changed 탭\n도달 가능성                          '간접 병합' 으로 merged 표시 · 병합 뒤 브랜치 자동 삭제",
        codeLang: "text",
      },
      {
        label: "문제의 구조: GitHub 는 git 의 원격 저장소 + 그 위의 대화다",
        body: "GitHub 의 저장소는 로컬과 원격 장의 '원격 저장소' 그 자체입니다 — refs/heads/* 를 가지고 push 와 fetch 로 맞춥니다. 그 위에 GitHub 가 PR · 리뷰 · 보호 규칙 · 버튼을 얹었습니다. 그래서 '병합 뒤 로컬에서 할 일'은 전부 원격 장의 일입니다. GitHub 가 base 에 커밋을 더했고(원격 브랜치 이동) head 브랜치를 지웠으니(원격 브랜치 삭제), 내 쪽은 pull 로 base 를 따라가고 fetch --prune 으로 추적 기록을 정리하고 -d(squash·rebase 였으면 -D)로 로컬 이름표를 뗍니다. 어느 단계가 어느 저장소의 어느 이름표를 움직이는지가 보이면 PR 뒤의 모든 메시지가 설명됩니다.",
      },
      {
        label: "다음 입구",
        body: "마지막 장은 이 모델로 자주 만나는 상황을 풉니다. stash · cherry-pick · 엉뚱한 브랜치 커밋 · push 한 커밋 되돌리기 · 사라진 것 찾기입니다. 출처는 GitHub 문서의 About pull request merges · About branches · About merge conflicts 입니다.",
      },
      {
        label: "확인 질문",
        body: "PR을 Squash and merge로 병합한 뒤 로컬에서 git branch -d feature를 쳤더니 '완전히 병합되지 않았다'며 거절합니다. 작업이 사라진 걸까요?",
        notes: [
          {
            title: "답",
            body: "아닙니다. 내용은 한 커밋으로 뭉쳐져 base에 들어갔고, 원래 커밋들이 base 이력에 없을 뿐입니다. git이 보기에는 도달할 수 없으니 거절한 것이라, 병합된 것을 확인했다면 -D로 지워도 됩니다.",
            bottom: true,
          },
        ],
      },
    ],
    sources: [
      { label: "About pull requests", href: `${GH}/proposing-changes-to-your-work-with-pull-requests/about-pull-requests` },
      { label: "About pull request merges", href: `${GH}/incorporating-changes-from-a-pull-request/about-pull-request-merges` },
    ],
  },

  {
    id: "git-practice",
    name: "실전 상황 대처",
    tagline: "당황하기 전에 먼저 보는 것들",
    intro:
      "앞의 여섯 단계로 대부분의 상황은 설명됩니다. 여기서는 자주 만나는 상황을 그 모델로 풀어 둡니다. 공통된 순서는 하나입니다. git status와 git log --graph로 지금 이름표가 어디 있는지 보고, 무엇을 되돌리고 싶은지 정한 뒤 명령을 고릅니다.",
    blocks: [
      {
        label: "하던 작업을 잠시 치워 두기 — stash",
        body: "커밋하기엔 이른 수정이 있는데 다른 브랜치로 옮겨야 할 때, stash는 작업 폴더와 스테이징의 변경을 따로 보관하고 폴더를 깨끗하게 만듭니다. 돌아와서 pop으로 다시 꺼냅니다.",
        code: "git stash push -m \"드롭다운 작업 중\"\ngit switch hotfix\n# ...\ngit switch feature\ngit stash pop",
        codeLang: "bash",
      },
      {
        label: "커밋 하나만 가져오기 — cherry-pick",
        body: "다른 브랜치의 특정 커밋만 필요할 때 그 변경을 내 브랜치에 새 커밋으로 다시 만듭니다. 내용은 같아도 ID는 새것입니다.",
        code: "git cherry-pick 1a2b3c4",
        codeLang: "bash",
      },
      {
        label: "엉뚱한 브랜치에 커밋했을 때",
        body: "아직 push하지 않았다면, 지금 위치에 올바른 브랜치 이름표를 붙이고 원래 브랜치의 이름표만 뒤로 되돌리면 됩니다. 커밋은 새 이름표에서 닿으므로 잃지 않습니다.",
        code: "git branch feature        # 지금 커밋에 새 이름표\ngit reset --hard HEAD~1   # 원래 브랜치만 한 칸 뒤로\ngit switch feature",
        codeLang: "bash",
      },
      {
        label: "이미 push한 커밋을 되돌려야 할 때",
        body: "공유한 이력은 고쳐 쓰지 않고 revert로 취소 커밋을 쌓습니다. force push는 원격의 이력을 내 것으로 덮어써서 남이 올린 커밋까지 지울 수 있으므로, 혼자 쓰는 브랜치에서 rebase한 뒤처럼 이유가 분명할 때만 --force-with-lease로 씁니다.",
      },
      {
        label: "무언가 사라진 것 같을 때",
        body: "커밋은 쉽게 사라지지 않습니다. 먼저 git reflog에서 사라지기 전의 커밋 ID를 찾고, 이름표를 붙여 되살립니다. 커밋하지 않은 수정은 reflog에 없으므로, 자주 커밋하고 push해 두는 것이 가장 확실한 백업입니다.",
      },
      {
        label: "실제로 돌려 보면: stash 가 담는 것과 돌려주는 것",
        body: "`git stash` 는 추적 파일의 수정과 담긴 것을 스택에 넣고 작업 폴더를 깨끗하게 만듭니다. `Saved working directory and index state WIP on master: 5e697d0 merge topic` 이 나옵니다. 그 뒤 status 는 비어 있고 `stash list` 에 `stash@{0}: WIP on master: …` 가 보입니다. `pop` 은 적용 뒤 스택에서 뺍니다(`Dropped refs/stash@{0} (7d12d52…)`). 담겼던 것은 기본으로 '담기지 않은 수정'으로 돌아옵니다(--index 를 주면 담긴 채로 돌아옵니다). 새 파일(untracked)은 기본으로 담지 않아 `-u` 가 필요합니다(실제로 `stash -u` 뒤 pop 에 `?? newfile` 이 함께 돌아왔습니다). 이름을 주려면 `-m` 입니다. Pro Git 의 주의가 있습니다. `git clean` 은 untracked 파일을 지우고 '그 내용은 대개 되찾을 수 없다'고 합니다. `-n` 으로 먼저 보고, 지우기보다 `stash --all` 이 안전합니다.",
        code: "$ printf 'wip\\n' >> a.txt && git stash\nSaved working directory and index state WIP on master: 5e697d0 merge topic\n$ git status --short            # (비어 있음)\n$ git stash list\nstash@{0}: WIP on master: 5e697d0 merge topic\n$ git stash pop\nDropped refs/stash@{0} (7d12d52bcf82758474181085ac3653b1451627cb)\n$ git status --short\n M a.txt                         # 담겼던 것도 '수정' 으로 돌아온다 (--index 면 유지)\n\n$ touch newfile && git stash -u && git stash pop && git status --short\n M a.txt\n?? newfile                       # -u 가 아니면 untracked 는 stash 에 안 들어간다",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: cherry-pick 과 revert 가 멈추는 곳",
        body: "`git cherry-pick <sha>` 는 그 커밋의 변경을 새 커밋으로 다시 만듭니다. 같은 자리를 내 쪽이 다르게 고쳤으면 merge 처럼 멈춥니다. 실제로 `UU a.txt` 와 `hint: To abort and get back to the state before \"git cherry-pick\", run \"git cherry-pick --abort\".` 가 나왔습니다. 풀고 add 한 뒤 `--continue` 입니다. revert 도 같은 메커니즘(반대 변경을 적용)이라 같은 자리에서 멈출 수 있습니다. 병합 커밋에는 `-m 1` 이 필요합니다(되돌리기 장). 둘 다 '새 커밋'이라 공유된 이력을 고쳐 쓰지 않습니다. 그래서 push 된 것을 되돌릴 때의 답이 revert 입니다.",
        code: "$ git cherry-pick topic\nhint: To abort and get back to the state before \"git cherry-pick\",\nhint: run \"git cherry-pick --abort\".\n$ git status --short\nUU a.txt\n$ git cherry-pick --abort       # 또는 풀고 add → git cherry-pick --continue",
        codeLang: "bash",
      },
      {
        label: "실제로 돌려 보면: 엉뚱한 브랜치에 커밋했을 때의 두 명령",
        body: "본문의 처방을 그대로 돌렸습니다. master 에서 커밋 x 를 만든 뒤 `git branch feature`(지금 커밋에 새 이름표) → `git reset --hard HEAD~1`(master 만 뒤로) → `git switch feature`. x 는 feature 에서 닿으므로 잃지 않습니다. 이미 push 했다면 reset 대신 revert 로 master 에 취소 커밋을 쌓고, x 가 들어간 브랜치를 따로 올립니다. 그리고 커밋 전에 알아챘다면 — 수정은 작업 폴더에 있으니 — 그냥 `git switch -c feature` 로 수정을 들고 옮기면 됩니다(대상 브랜치가 그 파일을 다르게 가지지 않는 한 전환이 허용됩니다).",
        code: "상황                            처방                                               왜 안전한가\n─────────────────────────────  ────────────────────────────────────────────────\n커밋 전에 알았다                 git switch -c feature  (수정을 들고 이동)           작업 폴더는 브랜치와 무관\n커밋했고 push 전                 git branch feature; git reset --hard HEAD~1        커밋은 feature 에서 닿는다\n커밋하고 push 까지 했다          git revert <sha> on master; cherry-pick 을 feature 로  공유 이력은 덧쓴다\n--hard 를 잘못 쳤다              git reflog → git reset --hard HEAD@{1}            HEAD 이동은 전부 기록됨",
        codeLang: "text",
      },
      {
        label: "상황 → 먼저 볼 것 → 명령",
        body: "앞의 여섯 장을 한 표로 접습니다. 공통 첫 단계는 `git status` 와 `git log --oneline --graph --all` 로 이름표가 어디 있는지 보는 것입니다.",
        code: "상황                            먼저 볼 것             명령\n──────────────────────────────  ────────────────────  ─────────────────────────────────\n다른 브랜치로 급히 가야 하는데 수정이 있다  status (담긴 것? 새 파일?)  stash [-u] → switch → stash pop\npush 가 (fetch first) 로 거절됐다  log HEAD..origin/x (무엇이 들어오나)  pull --rebase → push\npull 뒤 충돌이 났다               status 의 UU 파일        표시 정리 → add → (merge: commit / rebase: --continue)\n병합된 PR 브랜치가 -d 로 안 지워진다  squash/rebase 로 병합됐나  -D (내용은 base 에 있음)\norigin/feature 가 남아 있다       원격에 실제로 있나        fetch --prune\n브랜치를 잘못 지웠다               reflog 에 마지막 커밋이 있나  branch <name> <sha>\n--hard 로 커밋을 날렸다            reflog                   reset --hard HEAD@{n} 또는 branch\n커밋하지 않은 수정을 --hard 로 날렸다  (reflog 에 없음)          에디터 로컬 히스토리 외엔 복구 불가\n마지막 커밋 메시지만 고치고 싶다 (push 전)  cherry -v (push 됐나)     commit --amend\n중간 커밋들을 합치거나 지우고 싶다 (push 전)  log --oneline            rebase -i HEAD~n\n이미 push 한 커밋을 취소해야 한다   -                        revert <sha> (병합이면 -m 1)\n이게 어느 커밋에서 깨졌는지 모른다  -                        bisect start <bad> <good> → good/bad → reset",
        codeLang: "text",
      },
      {
        label: "문제의 구조: 당황하는 순간의 세 질문",
        body: "모든 상황은 세 질문으로 좁혀집니다.\n(1) 지금 이름표(HEAD·브랜치·origin/*)가 어디에 있을까요? status · log --graph --all 로 봅니다.\n(2) 되돌릴 대상이 작업 폴더일까요, Index 일까요, 커밋일까요? 세 트리 중 어디인지 묻는 질문입니다.\n(3) 그 커밋이 공유됐을까요(push 됐을까요)? cherry -v · branch -vv 로 봅니다.\n(1) 이 서면 명령의 대상이 정해집니다. (2) 로 restore/reset/revert 가 갈립니다. (3) 으로 reset·amend·rebase(로컬) 와 revert(공유) 가 갈립니다. 그리고 커밋된 것은 reflog 거리 안에 있다는 사실이 당황을 줄입니다. 위험한 것은 작업 폴더를 덮어쓰는 명령뿐입니다. 모르겠으면 먼저 커밋(또는 stash)하고 생각하면 됩니다.",
        code: "① 이름표가 어디?      git status · git log --oneline --graph --all\n        │\n② 무엇을 되돌리나?    작업 폴더 → restore      Index → restore --staged      커밋 → ③\n        │\n③ 공유됐나?           아니오 → reset / amend / rebase -i      예 → revert (병합은 -m 1)\n\n커밋된 것은 reflog 안에 있다 → 당황하지 말고 reflog 부터\n커밋 안 된 것을 덮어쓰는 명령(restore · reset --hard · checkout <paths> · clean)만 조심",
        codeLang: "text",
      },
      {
        label: "확인 질문",
        body: "1) `git stash` 가 기본으로 담지 않는 것은 무엇이고 어떤 옵션이 필요한가요?\n2) 엉뚱한 브랜치에 커밋했을 때 push 전과 후의 처방이 어떻게 다른가요?\n3) push 가 'fetch first' 로 거절됐을 때 먼저 볼 것과 그다음 명령은?\n4) '커밋된 것은 거의 항상 돌아온다' 가 적용되지 않는 유일한 종류의 손실은?",
      },
    ],
    sources: [
      { label: "Git Tools - Stashing and Cleaning", href: `${BOOK}/Git-Tools-Stashing-and-Cleaning` },
      { label: "Git Basics - Undoing Things", href: `${BOOK}/Git-Basics-Undoing-Things` },
    ],
  },
];
