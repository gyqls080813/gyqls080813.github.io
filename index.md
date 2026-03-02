---
layout: default
title: Home
---

<!-- ===== HERO ===== -->
<div class="home-split">

  <div class="home-intro">
    <p class="hero-label">Frontend Developer</p>
    <h1 class="home-name">이민엽</h1>
    <p class="home-bio">사용자 경험을 깊이 고민하는 프론트엔드 개발자입니다.<br>직관적인 인터페이스와 읽기 좋은 코드를 지향합니다.</p>

    <div class="hero-buttons">
      <a href="https://github.com/gyqls080813" class="btn btn-primary" target="_blank" rel="noopener">GitHub</a>
      <a href="mailto:gyqls0808133@gmail.com" class="btn btn-secondary">Contact</a>
    </div>
  </div>

  <div class="home-projects">
    <span class="section-title" id="portfolio">Featured Projects</span>

    <div class="project-grid-v">

      <a class="project-card" href="https://github.com/gyqls080813" target="_blank" rel="noopener">
        <div class="project-card__header">
          <span class="project-icon">📺</span>
          <span class="project-lang">React · TypeScript · Next.js</span>
        </div>
        <h3 class="project-card__title">Withy</h3>
        <p class="project-card__desc">함께 영상을 시청하고 소통할 수 있는 워치파티 플랫폼. 실시간 동기화와 채팅 기능을 지원합니다.</p>
        <div class="project-card__footer">
          <span class="project-tag">React</span>
          <span class="project-tag">TypeScript</span>
          <span class="project-tag">Next.js</span>
        </div>
      </a>

      <a class="project-card" href="https://github.com/gyqls080813" target="_blank" rel="noopener">
        <div class="project-card__header">
          <span class="project-icon">🗓</span>
          <span class="project-lang">React · TypeScript</span>
        </div>
        <h3 class="project-card__title">Planner App</h3>
        <p class="project-card__desc">일정과 할 일을 사용자 친화적으로 관리할 수 있는 플래너 어플리케이션. 직관적인 UI와 날짜 기반 필터링을 지원합니다.</p>
        <div class="project-card__footer">
          <span class="project-tag">React</span>
          <span class="project-tag">TypeScript</span>
          <span class="project-tag">CSS</span>
        </div>
      </a>

      <a class="project-card" href="{{ '/algorithm/binary-search/' | relative_url }}">
        <div class="project-card__header">
          <span class="project-icon">🔍</span>
          <span class="project-lang">JavaScript</span>
        </div>
        <h3 class="project-card__title">Algorithm Simulator</h3>
        <p class="project-card__desc">이진 탐색 등 다양한 알고리즘을 시각적으로 실행해볼 수 있는 인터랙티브 시뮬레이터입니다.</p>
        <div class="project-card__footer">
          <span class="project-tag">JavaScript</span>
          <span class="project-tag">HTML</span>
          <span class="project-tag">CSS</span>
        </div>
      </a>

    </div>
  </div>

</div>

<!-- ===== TECH STACK ===== -->
<div class="divider" style="margin-top: 3rem;"></div>

<span class="section-title" id="tech">Tech Stack</span>

<div class="tech-stack-grid">
  <div class="tech-category">
    <p class="tech-category__label">Frontend</p>
    <div class="skills">
      <span class="skill-badge html">HTML</span>
      <span class="skill-badge css">CSS</span>
      <span class="skill-badge js">JavaScript</span>
      <span class="skill-badge ts">TypeScript</span>
    </div>
  </div>
  <div class="tech-category">
    <p class="tech-category__label">Framework</p>
    <div class="skills">
      <span class="skill-badge react">React</span>
      <span class="skill-badge next">Next.js</span>
    </div>
  </div>
  <div class="tech-category">
    <p class="tech-category__label">Language</p>
    <div class="skills">
      <span class="skill-badge python">Python</span>
    </div>
  </div>
  <div class="tech-category">
    <p class="tech-category__label">Tools</p>
    <div class="skills">
      <span class="skill-badge git">Git</span>
      <span class="skill-badge">GitHub</span>
    </div>
  </div>
</div>

<!-- ===== PROJECTS ===== -->
<div class="divider"></div>

<span class="section-title" id="projects">Projects</span>

<div class="project-grid">

  <div class="project-card-full">
    <div class="project-card-full__header">
      <div>
        <span class="project-status done">완료</span>
        <h3 class="project-card-full__title">Withy</h3>
        <p class="project-card-full__sub">워치파티 플랫폼</p>
      </div>
      <span class="project-icon" style="font-size: 2rem;">📺</span>
    </div>
    <p class="project-card-full__desc">함께 영상을 시청하고 실시간으로 소통할 수 있는 워치파티 서비스입니다. 파티 생성·참가·채팅·동기화 재생 기능을 포함한 풀스택 프론트엔드 구현을 담당했습니다.</p>
    <div class="project-card-full__tags">
      <span class="project-tag">React</span>
      <span class="project-tag">TypeScript</span>
      <span class="project-tag">Next.js</span>
      <span class="project-tag">CSS</span>
    </div>
    <div class="project-card-full__links">
      <a href="https://github.com/gyqls080813" class="btn btn-secondary" target="_blank" rel="noopener">GitHub →</a>
    </div>
  </div>

  <div class="project-card-full">
    <div class="project-card-full__header">
      <div>
        <span class="project-status done">완료</span>
        <h3 class="project-card-full__title">Planner App</h3>
        <p class="project-card-full__sub">일정 관리 애플리케이션</p>
      </div>
      <span class="project-icon" style="font-size: 2rem;">🗓</span>
    </div>
    <p class="project-card-full__desc">날짜 기반 일정·할 일 관리 플래너. 직관적인 드래그 UI, 카테고리 필터링, 로컬 스토리지 기반의 영속성 데이터 저장 기능을 구현했습니다.</p>
    <div class="project-card-full__tags">
      <span class="project-tag">React</span>
      <span class="project-tag">TypeScript</span>
      <span class="project-tag">CSS</span>
    </div>
    <div class="project-card-full__links">
      <a href="https://github.com/gyqls080813" class="btn btn-secondary" target="_blank" rel="noopener">GitHub →</a>
    </div>
  </div>

  <div class="project-card-full">
    <div class="project-card-full__header">
      <div>
        <span class="project-status research">논문</span>
        <h3 class="project-card-full__title">석사 논문</h3>
        <p class="project-card-full__sub">환경에너지공학 석사 연구</p>
      </div>
      <span class="project-icon" style="font-size: 2rem;">📄</span>
    </div>
    <p class="project-card-full__desc">연세대학교 환경에너지공학부 석사 과정에서 수행한 연구. 데이터 분석 및 시뮬레이션 기반의 환경 에너지 최적화 연구를 진행했습니다.</p>
    <div class="project-card-full__tags">
      <span class="project-tag">Python</span>
      <span class="project-tag">Data Analysis</span>
    </div>
    <div class="project-card-full__links">
      <a href="https://github.com/gyqls080813" class="btn btn-secondary" target="_blank" rel="noopener">GitHub →</a>
    </div>
  </div>

  <div class="project-card-full">
    <div class="project-card-full__header">
      <div>
        <span class="project-status done">완료</span>
        <h3 class="project-card-full__title">Dev Blog</h3>
        <p class="project-card-full__sub">기술 블로그</p>
      </div>
      <span class="project-icon" style="font-size: 2rem;">📝</span>
    </div>
    <p class="project-card-full__desc">직접 디자인 시스템을 구축한 기술 블로그. 다크모드, 카테고리 필터, 반응형 레이아웃을 Jekyll로 구현했습니다.</p>
    <div class="project-card-full__tags">
      <span class="project-tag">Jekyll</span>
      <span class="project-tag">Liquid</span>
      <span class="project-tag">CSS</span>
    </div>
    <div class="project-card-full__links">
      <a href="https://github.com/gyqls080813/gyqls080813.github.io" class="btn btn-secondary" target="_blank" rel="noopener">GitHub →</a>
    </div>
  </div>

</div>

<!-- ===== EXPERIENCE ===== -->
<div class="divider"></div>

<span class="section-title" id="experience">Experience & Education</span>

<div class="timeline">

  <div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <p class="timeline-date">석사 졸업</p>
      <h3 class="timeline-title">연세대학교 환경에너지공학부 석사</h3>
      <p class="timeline-desc">Yonsei University, Graduate School of Environmental & Energy Engineering</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <p class="timeline-date">학사 졸업</p>
      <h3 class="timeline-title">연세대학교 미래캠퍼스 환경에너지공학부</h3>
      <p class="timeline-desc">Yonsei University (Mirae Campus), Dept. of Environmental & Energy Engineering</p>
    </div>
  </div>

</div>

<!-- ===== ABOUT ME ===== -->
<div class="divider"></div>

<span class="section-title" id="about">About Me</span>

<p style="color: var(--text-secondary); font-size: 1.05rem; margin-bottom: 2rem; line-height: 1.8;">
  환경에너지공학을 전공하고 석사 과정을 거치며 데이터와 시스템 사고를 익혔습니다. 이후 프론트엔드 개발로 전환하여 사용자 경험에 집중하고 있습니다. 알고리즘, CS 지식, 그리고 새롭게 배운 것들을 이 블로그에 기록하며 꾸준히 성장하고 있습니다. 🚀
</p>

<div class="about-grid">
  <div class="about-card">
    <h3>📚 관심 분야</h3>
    <ul style="list-style: none; padding: 0; color: var(--text-secondary); font-size: 0.9rem;">
      <li style="padding: 0.3rem 0;">⚡ 프론트엔드 웹 개발</li>
      <li style="padding: 0.3rem 0;">🧠 알고리즘 & 자료구조</li>
      <li style="padding: 0.3rem 0;">💻 컴퓨터 과학 기초</li>
      <li style="padding: 0.3rem 0;">🎨 UI/UX 디자인</li>
    </ul>
  </div>

  <div class="about-card">
    <h3>📝 Blog Categories</h3>
    <ul style="list-style: none; padding: 0; color: var(--text-secondary); font-size: 0.9rem;">
      <li style="padding: 0.3rem 0;"><a href="{{ '/categories/algorithm/' | relative_url }}" class="cat-tag">Algorithm</a> 알고리즘 풀이</li>
      <li style="padding: 0.3rem 0;"><a href="{{ '/categories/cs/' | relative_url }}" class="cat-tag">CS</a> 컴퓨터 과학</li>
      <li style="padding: 0.3rem 0;"><a href="{{ '/categories/language/' | relative_url }}" class="cat-tag">Language</a> 언어 학습</li>
      <li style="padding: 0.3rem 0;"><a href="{{ '/categories/til/' | relative_url }}" class="cat-tag">TIL</a> 오늘 배운 것</li>
    </ul>
  </div>

  <div class="about-card">
    <h3>🔗 Contact</h3>
    <ul style="list-style: none; padding: 0; font-size: 0.9rem;">
      <li style="padding: 0.3rem 0;">
        <a href="https://github.com/gyqls080813" target="_blank" rel="noopener" style="color: var(--text-secondary);">⚡ GitHub → gyqls080813</a>
      </li>
      <li style="padding: 0.3rem 0;">
        <a href="mailto:gyqls0808133@gmail.com" style="color: var(--text-secondary);">✉️ gyqls0808133@gmail.com</a>
      </li>
    </ul>
  </div>
</div>
