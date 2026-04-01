---
layout: project
title: Withy
subtitle: "물리적 거리가 멀어져도, 함께 즐기는 경험은 그대로"
splash_chr: /WITHY/public/withy/Withy_chr.png
splash_logo: /WITHY/public/withy/Withy_logo.png
splash_tagline: "Watch with WITHY"
---

<!-- STEP 1: 프로젝트 소개 -->
<div class="pres-slide">
    <div class="pres-screen">
        <img src="/WITHY/docs/assets/images/WITHY.png" alt="Withy">
    </div>
    <div class="pres-info">
        <span class="pres-step-label">Step 1 / 8 · 프로젝트 소개</span>
        <h2 class="pres-title">🎬 Withy</h2>
        <p class="pres-desc">
            넷플릭스, 유튜브 화면 공유의 끊김과 저화질, 불편하지 않으셨나요?<br><br>
            WITHY는 영상의 <strong>타임라인을 직접 제어하는 독자적인 동기화 기술</strong>로 완벽한 몰입감을 선사하는 OTT 같이보기 서비스입니다.
        </p>
        <div class="pres-tags">
            <span class="pres-tag">React</span>
            <span class="pres-tag">Spring Boot</span>
            <span class="pres-tag">WebSocket</span>
            <span class="pres-tag">gRPC</span>
            <span class="pres-tag">Kafka</span>
            <span class="pres-tag">Redis</span>
        </div>
        <div class="pres-nav">
            <button class="pres-nav-btn" data-pres-prev disabled>← 이전</button>
            <div class="pres-progress">
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
            </div>
            <button class="pres-nav-btn primary" data-pres-next>다음 →</button>
        </div>
    </div>
</div>

<!-- STEP 2: 메인 화면 -->
<div class="pres-slide">
    <div class="pres-screen">
        <img src="/WITHY/docs/assets/images/home_hot.png" alt="Withy 메인 화면">
    </div>
    <div class="pres-info">
        <span class="pres-step-label">Step 2 / 8 · 메인 화면</span>
        <h2 class="pres-title">🏠 홈 – 인기 파티</h2>
        <p class="pres-desc">
            앱에 접속하면 가장 먼저 보이는 메인 화면입니다.<br><br>
            사람들이 많이 보는 <strong>음악 파티, 애니메이션 파티</strong> 등 장르별 인기 파티를 한눈에 확인할 수 있고, LIVE 뱃지로 현재 진행 중인 파티를 실시간 확인할 수 있습니다.
        </p>
        <div class="pres-tags">
            <span class="pres-tag">실시간 상태</span>
            <span class="pres-tag">장르 분류</span>
            <span class="pres-tag">인원 표시</span>
        </div>
        <div class="pres-nav">
            <button class="pres-nav-btn" data-pres-prev>← 이전</button>
            <div class="pres-progress">
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
            </div>
            <button class="pres-nav-btn primary" data-pres-next>다음 →</button>
        </div>
    </div>
</div>

<!-- STEP 3: 파티 생성 -->
<div class="pres-slide">
    <div class="pres-screen">
        <img src="/WITHY/docs/assets/gif/party_create.gif" alt="파티 생성 데모">
    </div>
    <div class="pres-info">
        <span class="pres-step-label">Step 3 / 8 · 파티 생성</span>
        <h2 class="pres-title">🎉 파티 만들기</h2>
        <p class="pres-desc">
            원하는 영상의 URL을 입력하고, 장르와 비밀번호를 설정하여 <strong>나만의 파티방</strong>을 만들 수 있습니다.<br><br>
            영상 제목, 썸네일 등의 메타데이터가 자동으로 파싱되어 편리하게 파티를 개설합니다.
        </p>
        <div class="pres-tags">
            <span class="pres-tag">URL 파싱</span>
            <span class="pres-tag">비밀번호 설정</span>
            <span class="pres-tag">장르 태깅</span>
        </div>
        <div class="pres-nav">
            <button class="pres-nav-btn" data-pres-prev>← 이전</button>
            <div class="pres-progress">
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
            </div>
            <button class="pres-nav-btn primary" data-pres-next>다음 →</button>
        </div>
    </div>
</div>

<!-- STEP 4: 파티 입장 -->
<div class="pres-slide">
    <div class="pres-screen">
        <img src="/WITHY/docs/assets/gif/party_enter.gif" alt="파티 입장 데모">
    </div>
    <div class="pres-info">
        <span class="pres-step-label">Step 4 / 8 · 같이보기</span>
        <h2 class="pres-title">📺 실시간 동기화 시청</h2>
        <p class="pres-desc">
            파티에 입장하면 <strong>WebSocket 기반의 실시간 동기화</strong>가 즉시 시작됩니다.<br><br>
            방장이 재생, 일시정지, 탐색(Seek)하면 모든 참여자의 영상이 <strong>밀리세컨드 단위</strong>로 정확하게 같은 시점에서 재생됩니다.
        </p>
        <div class="pres-tags">
            <span class="pres-tag">WebSocket</span>
            <span class="pres-tag">타임라인 동기화</span>
            <span class="pres-tag">실시간</span>
        </div>
        <div class="pres-nav">
            <button class="pres-nav-btn" data-pres-prev>← 이전</button>
            <div class="pres-progress">
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
            </div>
            <button class="pres-nav-btn primary" data-pres-next>다음 →</button>
        </div>
    </div>
</div>

<!-- STEP 5: 욕설 필터링 -->
<div class="pres-slide">
    <div class="pres-screen">
        <img src="/WITHY/docs/assets/gif/bad_word.gif" alt="욕설 필터링 데모">
    </div>
    <div class="pres-info">
        <span class="pres-step-label">Step 5 / 8 · AI 클린 채팅</span>
        <h2 class="pres-title">🚫 욕설 자동 차단</h2>
        <p class="pres-desc">
            채팅을 입력하면 <strong>gRPC 통신 기반의 AI 분석 모듈</strong>이 즉시 유해성을 진단합니다.<br><br>
            욕설/비속어가 감지되면 메시지가 자동으로 블라인드 처리되어 다른 사용자에게 도달하지 않습니다. 쾌적한 시청 환경을 보장합니다.
        </p>
        <div class="pres-tags">
            <span class="pres-tag">gRPC</span>
            <span class="pres-tag">AI 분석</span>
            <span class="pres-tag">실시간 필터링</span>
        </div>
        <div class="pres-nav">
            <button class="pres-nav-btn" data-pres-prev>← 이전</button>
            <div class="pres-progress">
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
            </div>
            <button class="pres-nav-btn primary" data-pres-next>다음 →</button>
        </div>
    </div>
</div>

<!-- STEP 6: 스포일러 차단 -->
<div class="pres-slide">
    <div class="pres-screen">
        <img src="/WITHY/docs/assets/gif/spoiler.gif" alt="스포일러 차단 데모">
    </div>
    <div class="pres-info">
        <span class="pres-step-label">Step 6 / 8 · 스포일러 방지</span>
        <h2 class="pres-title">🤐 스포일러 차단 파이프라인</h2>
        <p class="pres-desc">
            대량의 채팅 트래픽을 처리하기 위해 <strong>Redis 버퍼링 → Kafka 메시지 큐 → AI 분석</strong>의 비동기 파이프라인을 구축했습니다.<br><br>
            콘텐츠의 반전을 미리 알려주는 스포일러성 발언을 사전에 차단하여, 모든 참여자의 시청 경험을 보호합니다.
        </p>
        <div class="pres-tags">
            <span class="pres-tag">Kafka</span>
            <span class="pres-tag">Redis 버퍼링</span>
            <span class="pres-tag">비동기 파이프라인</span>
        </div>
        <div class="pres-nav">
            <button class="pres-nav-btn" data-pres-prev>← 이전</button>
            <div class="pres-progress">
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
            </div>
            <button class="pres-nav-btn primary" data-pres-next>다음 →</button>
        </div>
    </div>
</div>

<!-- STEP 7: AI 추천 -->
<div class="pres-slide">
    <div class="pres-screen">
        <img src="/WITHY/docs/assets/gif/home_ai_recommand.gif" alt="AI 추천 데모">
    </div>
    <div class="pres-info">
        <span class="pres-step-label">Step 7 / 8 · AI 추천</span>
        <h2 class="pres-title">🤖 AI 맞춤 파티 추천</h2>
        <p class="pres-desc">
            사용자의 취향과 시청 이력을 학습한 <strong>AI 분석 시스템</strong>이 최적의 파티를 추천합니다.<br><br>
            <strong>컨텍스트 캐싱(Context Caching)</strong> 기술을 도입하여 반복적인 분석 요청의 부하를 줄이고 추천 응답 속도를 최적화했습니다.
        </p>
        <div class="pres-tags">
            <span class="pres-tag">AI 추천</span>
            <span class="pres-tag">Context Caching</span>
            <span class="pres-tag">개인화</span>
        </div>
        <div class="pres-nav">
            <button class="pres-nav-btn" data-pres-prev>← 이전</button>
            <div class="pres-progress">
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
            </div>
            <button class="pres-nav-btn primary" data-pres-next>다음 →</button>
        </div>
    </div>
</div>

<!-- STEP 8: 아키텍처 -->
<div class="pres-slide">
    <div class="pres-screen">
        <img src="/WITHY/docs/assets/images/Infra_Architecture.png" alt="인프라 아키텍처">
    </div>
    <div class="pres-info">
        <span class="pres-step-label">Step 8 / 8 · 시스템 아키텍처</span>
        <h2 class="pres-title">🏗️ 인프라 아키텍처</h2>
        <p class="pres-desc">
            Spring Boot 기반의 메인 서버, gRPC 통신을 활용한 AI 분석 모듈, Kafka와 Redis를 활용한 메시징 파이프라인까지 —<br><br>
            <strong>대규모 실시간 트래픽</strong>을 안정적으로 처리하도록 설계된 전체 인프라 구조입니다.
        </p>
        <div class="pres-tags">
            <span class="pres-tag">Docker</span>
            <span class="pres-tag">CI/CD</span>
            <span class="pres-tag">마이크로서비스</span>
        </div>
        <div class="pres-nav">
            <button class="pres-nav-btn" data-pres-prev>← 이전</button>
            <div class="pres-progress">
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
                <div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div><div class="pres-dot"></div>
            </div>
            <a href="/" class="pres-nav-btn primary">홈으로 돌아가기 →</a>
        </div>
    </div>
</div>
