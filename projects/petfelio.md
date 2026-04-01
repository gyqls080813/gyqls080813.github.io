---
layout: project
title: petFelio
subtitle: 반려동물 가계부 & AI 건강관리 서비스
splash_img: /Petfelio/petfolio-fe/public/images/onboarding-pet.png
live_url: https://petfelio.example.com
---

## 🐾 프로젝트 개요 (Overview)

**petFelio**(펫트폴리오)는 반려동물을 가족처럼 여기고 사랑하는 현대 반려인들을 위한 **가계부 겸 맞춤형 건강 가이드 앱**입니다. 단순히 동물 관련 소비 지출을 기록하는 것을 넘어, 지출 항목을 바탕으로 반려동물의 건강 관련 인사이트를 제공하는 혁신적인 기능을 포함합니다.

---

## ✨ 주요 기능 (Features)

### 1. 전용 수의학 기반 가계부 (Smart Spending)
* 사료, 미용, 장난감, 병원 진료 등 반려동물 카테고리에 특화된 직관적인 지출 내역 기록.
* 사용자가 등록한 카드 결제 문자를 실시간(SSE)으로 연동하여 소비 내역 자동 분류 기능을 제공합니다.

### 2. AI 건강 리포트 (Health Guided by AI)
* 가계부에 기입된 소비 내역(예: 영양제 구입, 병원 방문 이력)을 종합적으로 분석.
* AI 백엔드 모듈이 반려동물의 연령 기종 및 시기별 필수 예방접종, 권장 건강검진 주기를 **개별 맞춤 리포트** 형태로 시각화하여 추천합니다.

---

## 💻 기술적 도전 및 스택 (Tech Stack)

### 🛠️ Frontend
- **Next.js 16 (App Router)**: 서버 사이드 렌더링(SSR)과 최적화된 앱 구조.
- **TypeScript & Effect**: 강력한 타입 안정성과 부수 효과를 견고하게 관리하는 최첨단 TS 라이브러리 조합을 사용.
- **TailwindCSS**: 생산성 높은 반응형 컴포넌트 유틸리티 기반 디자인.
- **React Query**: 서버 상태 관리 및 낙관적 UI(Optimistic UI) 업데이트 관리.

### 🚀 핵심 아키텍처 고민 (Issues & Solutions)

> **상황**: 카드사 문자를 백엔드로부터 EventSource(SSE)로 실시간 푸시를 받아 프론트엔드 장바구니에 동기화할 때, Nginx 환경이나 인터넷 단절 발생 시 **이벤트 유실 위험**이 존재했습니다.

**해결 방안 (SSE + Fallback)**:
- Nginx 경로 간섭 문제를 피하기 위해 **Next.js의 Proxy Rewrite 기능**(`./next.config.ts`)을 구성하여 백엔드 직접 터널링 완성.
- SSE 연결 유실(Keepalive 메시지 Timeout)을 감지하고 연결 종료 후 클라이언트 단에서 즉각적인 **Polling Fallback (백업 API 호출)** 매커니즘을 추가 구현하여 어떠한 환경에서도 데이터 정합성을 유지하도록 견고하게 방어했습니다.

---

## 📸 사용자 경험 갤러리 (UX Flow)

![petFelio Splash](/Petfelio/petfolio-fe/public/images/onboarding-pet.png)

*(여기에 사용자가 반려동물을 최초 온보딩하고, 카드 지출 내역을 입력하는 등의 앱 내 주요 화면이 덧붙여집니다.)*

> **팀 회고**: 프론트엔드 주도적인 아키텍처 구성(Effect.js 도입 등)과 SSE를 활용한 실시간 통신의 복잡한 엣지 케이스들을 깊숙이 파헤치고 안정성을 확보하는 짜릿한 경험을 할 수 있었습니다.
