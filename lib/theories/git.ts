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
    ],
    sources: [
      { label: "Git Tools - Stashing and Cleaning", href: `${BOOK}/Git-Tools-Stashing-and-Cleaning` },
      { label: "Git Basics - Undoing Things", href: `${BOOK}/Git-Basics-Undoing-Things` },
    ],
  },
];
