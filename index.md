---
layout: default
title: Home
---

<section class="hero">
  <div class="hero-badge">Frontend Developer Blog</div>
  <h1>안녕하세요, <span>gyqls080813</span>입니다 👋</h1>
  <p class="hero-subtitle">코드로 아이디어를 현실로 만드는 프론트엔드 개발자입니다.</p>

  <div class="skills">
    <span class="skill-badge html">HTML</span>
    <span class="skill-badge css">CSS</span>
    <span class="skill-badge js">JavaScript</span>
    <span class="skill-badge ts">TypeScript</span>
    <span class="skill-badge react">React</span>
    <span class="skill-badge next">Next.js</span>
    <span class="skill-badge python">Python</span>
    <span class="skill-badge git">Git</span>
  </div>

  <div class="hero-buttons">
    <a href="https://github.com/gyqls080813" class="btn btn-primary" target="_blank" rel="noopener">
      ⚡ GitHub
    </a>
    <a href="{{ '/about' | relative_url }}" class="btn btn-secondary">
      About Me →
    </a>
  </div>
</section>

<div class="divider"></div>

<h2 class="section-title">최근 포스트</h2>

<ul class="post-list">
  {% for post in site.posts %}
    <li>
      {% if post.categories %}
        {% for cat in post.categories %}
          <a href="{{ '/categories/' | append: cat | relative_url }}" class="cat-tag">{{ cat }}</a>
        {% endfor %}
      {% endif %}
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p class="post-meta">{{ post.date | date: "%Y년 %m월 %d일" }}</p>
      <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
    </li>
  {% endfor %}
</ul>