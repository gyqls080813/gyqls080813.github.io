---
layout: project
title: petFelio
subtitle: "반려동물과의 일상을 더 특별하게, 스마트한 펫케어 파트너"
splash_bg: "linear-gradient(135deg, #f8c390 0%, #f5a0b0 100%)"
splash_logo: /Petfelio/petfolio-fe/public/images/onboarding-pet.png
app_icon: /Petfelio/petfolio-fe/public/images/onboarding-pet.png
hero_bg: /Petfelio/petfolio-fe/public/images/onboarding-pet.png
---

## 🐾 프로젝트 소개

**petFelio**(펫트폴리오)는 반려동물을 가족처럼 사랑하는 현대 반려인들을 위한 **전용 가계부 겸 AI 건강 가이드 서비스**입니다.

단순히 동물 관련 소비 지출을 기록하는 것을 넘어, 지출 항목을 분석하여 반려동물의 건강 관련 인사이트를 제공하는 혁신적인 기능을 갖추고 있습니다.

> 반려동물과의 일상을 기록하고, AI가 건강까지 챙겨주는 똑똑한 펫케어.

---

## ✨ 주요 기능

### 1. 전용 수의학 기반 가계부 (Smart Spending)

사료, 미용, 장난감, 병원 진료 등 반려동물 카테고리에 특화된 직관적인 지출 내역 기록. 사용자가 등록한 카드 결제를 **실시간(SSE)**으로 연동하여 소비 내역 자동 분류 기능을 제공합니다.

<div class="feature-showcase">
    <img src="/Petfelio/petfolio-fe/public/images/onboarding-create-1.png" alt="가계부 생성 온보딩">
    <img src="/Petfelio/petfolio-fe/public/images/onboarding-create-2.png" alt="가계부 설정">
</div>

### 2. AI 건강 리포트 (Health Guided by AI)

가계부에 기입된 소비 내역(영양제 구입, 병원 방문 이력 등)을 종합적으로 분석합니다. AI 백엔드 모듈이 반려동물의 연령, 종, 시기별 필수 예방접종과 권장 건강검진 주기를 **개별 맞춤 리포트** 형태로 시각화하여 추천합니다.

### 3. 온보딩 경험

앱 최초 사용 시 사용자와 반려동물의 정보를 친절하게 안내하며 수집합니다. 직관적인 3D 일러스트레이션과 함께 단계별로 진행되어 누구나 쉽게 시작할 수 있습니다.

<div class="feature-showcase">
    <img src="/Petfelio/petfolio-fe/public/images/onboarding-join-1.png" alt="온보딩 단계 1">
    <img src="/Petfelio/petfolio-fe/public/images/onboarding-join-2.png" alt="온보딩 단계 2">
</div>

---

## 💻 기술적 도전

### SSE + Fallback 아키텍처

> **상황**: 카드사 문자를 백엔드로부터 EventSource(SSE)로 실시간 푸시를 받아 프론트엔드에 동기화할 때, Nginx 환경이나 인터넷 단절 발생 시 **이벤트 유실 위험**이 존재했습니다.

**해결 방안**:
- Nginx 경로 간섭 문제를 피하기 위해 **Next.js의 Proxy Rewrite 기능**을 구성하여 백엔드 직접 터널링 완성
- SSE 연결 유실(Keepalive 메시지 Timeout)을 감지하고 연결 종료 후 클라이언트 단에서 **Polling Fallback 매커니즘**을 추가 구현하여 어떠한 환경에서도 데이터 정합성을 유지

### Effect.js 도입

TypeScript의 타입 안전성을 극대화하기 위해 **Effect 라이브러리**를 도입했습니다. 기존 try-catch 패턴의 한계를 극복하고, 부수 효과(Side Effect)를 타입 레벨에서 추적·관리할 수 있는 견고한 아키텍처를 구현했습니다.

---

## 🛠️ 사용 기술 스택

### Frontend
- **Next.js 16 (App Router)** — 서버 사이드 렌더링(SSR)과 최적화된 앱 구조
- **TypeScript & Effect** — 강력한 타입 안정성과 부수 효과의 견고한 관리
- **TailwindCSS** — 생산성 높은 반응형 유틸리티 기반 디자인
- **React Query** — 서버 상태 관리 및 낙관적 UI(Optimistic UI) 업데이트

### Backend  
- **Spring Boot** — REST API 및 비즈니스 로직
- **SSE (Server-Sent Events)** — 실시간 카드 결제 알림 푸시
- **AI 모듈** — 건강 분석 및 맞춤 리포트 생성

---

## 🎨 앱 화면 갤러리

<div class="feature-showcase">
    <img src="/Petfelio/petfolio-fe/public/images/layer-create-puppy.png" alt="반려동물 등록">
    <img src="/Petfelio/petfolio-fe/public/images/layer-create-heart.png" alt="관심사 설정">
</div>

<div class="feature-showcase">
    <img src="/Petfelio/petfolio-fe/public/images/puppy-running.png" alt="대시보드">
    <img src="/Petfelio/petfolio-fe/public/images/person-waiting.png" alt="로딩 화면">
</div>
