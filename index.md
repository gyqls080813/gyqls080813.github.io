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