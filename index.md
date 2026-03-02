---
layout: default
title: Home
---

<!-- ===== 2-COLUMN PORTFOLIO LAYOUT ===== -->
<div class="portfolio-layout">

  <!-- LEFT: 프로필 사진 + 소개 + 버튼 -->
  <aside class="portfolio-left fade-up">
    <div class="profile-photo">
      <!-- 사진 추가: /assets/img/profile.jpg 에 저장 후 아래 태그 활성화 -->
      <!-- <img src="{{ '/assets/img/profile.jpg' | relative_url }}" alt="이민엽"> -->
      <span class="profile-photo__placeholder">이.민.엽</span>
    </div>

    <p class="hero-label">Frontend Developer</p>
    <h1 class="profile-name">이민엽</h1>
    <p class="profile-bio">
      사용자 경험을 깊이 고민하는 프론트엔드 개발자입니다.<br>
      직관적인 인터페이스와 읽기 좋은 코드를 지향합니다.
    </p>

    <div class="profile-links">
      <a href="https://github.com/gyqls080813" class="btn btn-primary" target="_blank" rel="noopener">GitHub</a>
      <a href="mailto:gyqls0808133@gmail.com" class="btn btn-secondary">✉ Contact</a>
    </div>
  </aside>

  <!-- RIGHT: 기술 스택 + 연혁 -->
  <div class="portfolio-right fade-up">

    <!-- 기술 스택 -->
    <span class="section-title" id="tech">Tech Stack</span>
    <div class="tech-list">
      <div class="tech-row">
        <span class="tech-row__label">Frontend</span>
        <div class="skills">
          <span class="skill-badge html">HTML</span>
          <span class="skill-badge css">CSS</span>
          <span class="skill-badge js">JavaScript</span>
          <span class="skill-badge ts">TypeScript</span>
        </div>
      </div>
      <div class="tech-row">
        <span class="tech-row__label">Framework</span>
        <div class="skills">
          <span class="skill-badge react">React</span>
          <span class="skill-badge next">Next.js</span>
        </div>
      </div>
      <div class="tech-row">
        <span class="tech-row__label">Language</span>
        <div class="skills">
          <span class="skill-badge python">Python</span>
        </div>
      </div>
      <div class="tech-row">
        <span class="tech-row__label">Tools</span>
        <div class="skills">
          <span class="skill-badge git">Git</span>
          <span class="skill-badge">GitHub</span>
        </div>
      </div>
    </div>

    <!-- 연혁 / Experience -->
    <span class="section-title" id="experience" style="margin-top: 2.5rem; display: block;">Experience & Education</span>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <p class="timeline-date">석사 졸업</p>
          <h3 class="timeline-title">연세대학교 환경에너지공학부 석사</h3>
          <p class="timeline-desc">Yonsei University · Graduate School of Environmental & Energy Engineering</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <p class="timeline-date">학사 졸업</p>
          <h3 class="timeline-title">연세대학교 미래캠퍼스 환경에너지공학부</h3>
          <p class="timeline-desc">Yonsei University (Mirae Campus) · Dept. of Environmental & Energy Engineering</p>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- ===== PROJECTS (하단 전체) ===== -->
<div class="divider" style="margin-top: 3rem;"></div>

<div class="fade-up">
  <span class="section-title" id="projects">Projects</span>
  <div class="projects-showcase">

    <div class="showcase-card">
      <div class="showcase-card__accent"></div>
      <div class="showcase-card__body">
        <div class="showcase-card__info">
          <span class="project-status done">완료</span>
          <h2 class="showcase-card__title">Withy</h2>
          <p class="showcase-card__sub">Watch Party Platform</p>
          <p class="showcase-card__desc">함께 영상을 시청하고 실시간으로 소통할 수 있는 워치파티 서비스입니다. 파티 생성·참가·채팅·동기화 재생 기능을 포함한 풀스택 프론트엔드 구현을 담당했습니다.</p>
          <div class="showcase-card__tags">
            <span class="project-tag">React</span>
            <span class="project-tag">TypeScript</span>
            <span class="project-tag">Next.js</span>
            <span class="project-tag">CSS</span>
          </div>
          <div class="showcase-card__links">
            <a href="https://github.com/gyqls080813" class="btn btn-secondary" target="_blank" rel="noopener">GitHub →</a>
          </div>
        </div>
        <div class="showcase-card__visual">
          <span class="showcase-icon">📺</span>
        </div>
      </div>
    </div>

    <div class="showcase-card">
      <div class="showcase-card__accent research"></div>
      <div class="showcase-card__body">
        <div class="showcase-card__info">
          <span class="project-status research">논문</span>
          <h2 class="showcase-card__title">석사 논문</h2>
          <p class="showcase-card__sub">Environmental & Energy Engineering Research</p>
          <p class="showcase-card__desc">연세대학교 환경에너지공학부 석사 과정에서 수행한 연구입니다. 데이터 분석 및 시뮬레이션 기반의 환경 에너지 최적화 연구를 진행했습니다.</p>
          <div class="showcase-card__tags">
            <span class="project-tag">Python</span>
            <span class="project-tag">Data Analysis</span>
            <span class="project-tag">Simulation</span>
          </div>
          <div class="showcase-card__links">
            <a href="https://github.com/gyqls080813" class="btn btn-secondary" target="_blank" rel="noopener">GitHub →</a>
          </div>
        </div>
        <div class="showcase-card__visual">
          <span class="showcase-icon">📄</span>
        </div>
      </div>
    </div>

  </div>
</div>

<script>
(function(){
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  },{ threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.fade-up').forEach(function(el){ obs.observe(el); });
})();
</script>
