---
layout: default
title: Home
---

<div class="home-split">

  <!-- 왼쪽: 소개 -->
  <div class="home-intro">
    <p class="hero-label">Frontend Developer</p>
    <h1 class="home-name">이민엽</h1>
    <p class="home-bio">사용자 경험을 깊이 고민하는 프론트엔드 개발자입니다. 직관적인 인터페이스와 읽기 좋은 코드를 지향합니다.</p>

    <div class="skills">
      <span class="skill-badge">HTML</span>
      <span class="skill-badge">CSS</span>
      <span class="skill-badge">JavaScript</span>
      <span class="skill-badge">TypeScript</span>
      <span class="skill-badge">React</span>
      <span class="skill-badge">Next.js</span>
      <span class="skill-badge">Python</span>
      <span class="skill-badge">Git</span>
    </div>

    <div class="hero-buttons">
      <a href="https://github.com/gyqls080813" class="btn btn-primary" target="_blank" rel="noopener">GitHub</a>
      <a href="{{ '/about' | relative_url }}" class="btn btn-secondary">About Me</a>
    </div>
  </div>

  <!-- 오른쪽: 프로젝트 카드 -->
  <div class="home-projects">
    <span class="section-title" id="portfolio">Featured Projects</span>

    <div class="project-grid-v">

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

      <a class="project-card" href="https://github.com/gyqls080813" target="_blank" rel="noopener">
        <div class="project-card__header">
          <span class="project-icon">📝</span>
          <span class="project-lang">Jekyll · Liquid</span>
        </div>
        <h3 class="project-card__title">Dev Blog</h3>
        <p class="project-card__desc">직접 디자인 시스템을 구축한 기술 블로그. 알고리즘 풀이, CS 개념, TIL을 기록합니다.</p>
        <div class="project-card__footer">
          <span class="project-tag">Jekyll</span>
          <span class="project-tag">Liquid</span>
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

<div class="divider" style="margin-top: 3rem;"></div>

<span class="section-title" id="about">About Me</span>

<p class="about-intro">
  프론트엔드 개발에 관심이 많은 개발자입니다. 알고리즘, CS 지식, 그리고 새롭게 배운 것들을 이 블로그에 기록하고 있습니다. 더 나은 사용자 경험을 만드는 것을 목표로 꾸준히 성장하고 있습니다. 🚀
</p>

<div class="about-grid">
  <div class="about-card">
    <h3>🛠 Tech Stack</h3>
    <div class="skills" style="justify-content: flex-start; margin: 0;">
      <span class="skill-badge">HTML</span>
      <span class="skill-badge">CSS</span>
      <span class="skill-badge">JavaScript</span>
      <span class="skill-badge">TypeScript</span>
      <span class="skill-badge">React</span>
      <span class="skill-badge">Next.js</span>
      <span class="skill-badge">Python</span>
      <span class="skill-badge">Git</span>
    </div>
  </div>

  <div class="about-card">
    <h3>📚 관심 분야</h3>
    <ul style="list-style: none; padding: 0; color: var(--text-2); font-size: 0.9rem;">
      <li style="padding: 0.3rem 0;">⚡ 프론트엔드 웹 개발</li>
      <li style="padding: 0.3rem 0;">🧠 알고리즘 &amp; 자료구조</li>
      <li style="padding: 0.3rem 0;">💻 컴퓨터 과학 기초</li>
      <li style="padding: 0.3rem 0;">🎨 UI/UX 디자인</li>
    </ul>
  </div>

  <div class="about-card">
    <h3>📝 Blog Categories</h3>
    <ul style="list-style: none; padding: 0; color: var(--text-2); font-size: 0.9rem;">
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
        <a href="https://github.com/gyqls080813" target="_blank" rel="noopener" style="color: var(--text-2);">⚡ GitHub → gyqls080813</a>
      </li>
    </ul>
  </div>
</div>

<div class="divider"></div>

<span class="section-title">Recent Posts</span>

<ul class="post-list">
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p class="post-meta">{{ post.date | date: "%Y.%m.%d" }}{% if post.categories %} · {% for cat in post.categories %}<a href="{{ '/categories/' | append: cat | relative_url }}" class="cat-tag">{{ cat }}</a>{% endfor %}{% endif %}</p>
      {% if post.excerpt %}<p>{{ post.excerpt | strip_html | truncate: 100 }}</p>{% endif %}
    </li>
  {% endfor %}
</ul>