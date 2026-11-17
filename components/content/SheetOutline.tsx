"use client";

import { createContext, use, type ReactNode } from "react";
import type { NavItem, Ports } from "@/lib/sheet";
import SheetNav from "./SheetNav";
import SheetPorts from "./SheetPorts";

type Part = "nav" | "portsLeft" | "portsRight";

const PartContext = createContext<Part | null>(null);

/**
 * 껍데기의 한 자리 — 열린 노드의 목차나 한쪽 포트가 여기 선다.
 *
 * 목차와 포트는 노드마다 다르고, 노드가 수백 개라 껍데기가 전부 들고 있으면 모든
 * 페이지가 수백 KB를 받는다. 그래서 레이아웃의 @outline 슬롯(app/@outline)이 서버에서
 * 그 노드 것만 계산해 SheetOutline 하나로 보낸다. 껍데기는 그 하나를 목차 칸, 양옆,
 * 목차 서랍에 각각 놓고, 놓인 자리를 이 컨텍스트로 알려 준다.
 *
 * 주의 — 슬롯 하나를 여러 자리에 놓는 것은 Next 문서가 보장하는 쓰임이 아니다.
 * Next는 슬롯을 자기 라우터 요소(오류 경계, 404 경계, 이동 때의 스크롤·포커스 처리)로 감싸
 * 넘기므로, 놓은 자리마다 그 한 벌이 따로 선다. 2026-11-18에 정적 빌드에서 확인한 것:
 * 긴 시트를 절반쯤 내린 뒤 "다음 →", 왼쪽 트리 링크, 포트로 다른 시트에 가면 새 시트는
 * 맨 위(본문 스크롤 0, 창 스크롤 0)에서 열리고, 목차와 포트는 새 노드 것으로 바뀌며,
 * 포커스는 누른 링크나 body에 남고 포트로 옮겨 가지 않았다. Next를 올린 뒤에는 이 길을
 * 다시 확인한다. 어긋나면 슬롯은 한 자리에만 두고 나머지는 그 데이터를 컨텍스트로 받게 바꾼다.
 */
export function OutlinePart({ part, children }: { part: Part; children: ReactNode }) {
  return <PartContext value={part}>{children}</PartContext>;
}

/** 슬롯이 그리는 것 — 놓인 자리(OutlinePart)에 따라 목차나 한쪽 포트가 된다 */
export default function SheetOutline({ nav, ports }: { nav: NavItem[]; ports: Ports }) {
  const part = use(PartContext);
  if (part === "nav") return <SheetNav items={nav} />;
  if (part === "portsLeft") return <SheetPorts side="left" ports={ports.left} />;
  if (part === "portsRight") return <SheetPorts side="right" ports={ports.right} />;
  return null;
}
