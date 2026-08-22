import { createContext } from "react";

/**
 * 호버 하이라이트 상태. 노드 배열을 재생성해 React Flow에 다시 넘기면
 * 커서 아래 DOM이 갱신되며 mouseenter/leave가 연쇄 발생(깜빡임)하므로,
 * 노드 배열은 그대로 두고 컨텍스트로 각 노드가 스스로 흐려질지 판단한다.
 */
export interface HoverHighlightState {
  hovered: string | null;
  neighbors: ReadonlySet<string> | null;
}

export const HoverHighlightContext = createContext<HoverHighlightState>({
  hovered: null,
  neighbors: null,
});
