---
layout: project
title: Withy
subtitle: "물리적 거리가 멀어져도, 함께 즐기는 경험은 그대로"
splash_chr: /WITHY/public/withy/Withy_chr.png
splash_logo: /WITHY/public/withy/Withy_logo.png
splash_tagline: "Watch with WITHY"
app_icon: /WITHY/public/logo.png
hero_bg: /WITHY/public/logo-bg.jpg
---

## 🎬 프로젝트 소개

넷플릭스, 유튜브 화면 공유의 끊김과 저화질, 불편하지 않으셨나요?

WITHY(위디)는 영상의 **타임라인을 직접 제어하는 독자적인 동기화 기술**로 완벽한 몰입감을 선사합니다. 눈살을 찌푸리게 하는 무분별한 비난도, 중요한 반전을 스포일러 당할 일도 없습니다. **욕설과 스포일러를 감지**하는 쾌적한 채팅 환경에서, 오직 콘텐츠와 소통에만 집중할 수 있습니다.

> 같이 보는 즐거움의 새로운 기준, **WITHY**.

**프로젝트 기간**: 2026.01.12 ~ 2026.02.09 (5주)

---

## 🏠 메인 화면

앱에 접속하면 사람들이 많이 보는 파티들을 한눈에 확인할 수 있습니다. 음악, 애니메이션, 드라마 등 장르별로 현재 진행 중인 라이브 파티와 대기 중인 파티를 실시간으로 확인하고 바로 입장할 수 있습니다.

![Withy 메인 화면](/WITHY/docs/assets/images/home_hot.png)

---

## 🎉 핵심 기능

### 1. 지능형 클린 채팅 (AI Clean Chat)

채팅 전송 시 **gRPC 통신 기반**의 분석 모듈을 통해 유해성을 즉시 진단하고, 욕설/비속어 감지 시 메시지를 자동으로 블라인드 처리하여 쾌적한 환경을 유지합니다.

대량의 채팅 트래픽을 처리하기 위해 **Redis 버퍼링 → Kafka 메시지 큐 → AI 분석**의 비동기 파이프라인을 구축했습니다. 콘텐츠의 재미를 반감시키는 스포일러성 발언을 사전에 차단합니다.

<div class="feature-showcase">
    <img src="/WITHY/docs/assets/gif/bad_word.gif" alt="욕설 필터링 데모">
    <img src="/WITHY/docs/assets/gif/spoiler.gif" alt="스포일러 차단 데모">
</div>

### 2. 같이보기 파티 (Watch Party)

다양한 OTT/플랫폼의 영상을 참여자들과 함께 시청합니다. 재생 시점과 상태를 정밀하게 동기화하여 **지연 없는 완벽한 동시 시청 경험**을 제공합니다.

파티를 생성하고, 친구를 초대하는 전 과정이 매끄럽게 연결됩니다.

<div class="feature-showcase">
    <img src="/WITHY/docs/assets/gif/party_create.gif" alt="파티 생성">
    <img src="/WITHY/docs/assets/gif/invite.gif" alt="초대 기능">
</div>

### 3. AI 맞춤 추천 (AI Recommendation)

**AI 분석 시스템**을 통해 사용자의 취향과 시청 이력을 학습하여 최적의 파티를 추천합니다. **컨텍스트 캐싱 기술**을 도입하여 반복적인 분석 요청의 부하를 줄이고 추천 응답 속도를 최적화했습니다.

![AI 추천 시스템](/WITHY/docs/assets/gif/home_ai_recommand.gif)

---

## 🏗️ 시스템 아키텍처

인프라 아키텍처 전체를 한눈에 보여드립니다. Spring Boot 기반의 메인 서버, gRPC 통신을 활용한 AI 분석 모듈, Kafka와 Redis를 활용한 메시징 파이프라인까지 — 대규모 실시간 트래픽을 안정적으로 처리하도록 설계되었습니다.

![인프라 아키텍처](/WITHY/docs/assets/images/Infra_Architecture.png)

---

## 💻 사용 기술 스택

### Frontend
- **React** — 컴포넌트 기반 UI 설계 및 전역 상태 관리
- **WebSocket** — 실시간 영상 동기화 및 채팅 구현
- **TailwindCSS** — 반응형 및 신속한 UI 스타일링

### Backend
- **Spring Boot** — 대규모 REST API 및 소켓 메인 서버
- **gRPC** — 마이크로서비스 간 고속 통신 (채팅 필터링 파이프라인)
- **Kafka** — 대량의 채팅 트래픽 분산 처리 및 메시지 큐
- **Redis** — 실시간 유저 접속 상태 및 세션 정보 인메모리 관리
- **Python(AI)** — 자연어 처리 기반 채팅 필터링 & 추천 모델

---

## 📐 ERD & 정보 구조

![ERD](/WITHY/docs/assets/images/ERD.png)

![정보 구조도 (IA)](/WITHY/docs/assets/images/IA.png)
