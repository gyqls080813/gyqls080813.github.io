---
layout: default
title: Home
---

<section class="hero">
  <p class="hero-label">Frontend Developer</p>
  <h1>이민엽</h1>
  <p class="hero-desc">알고리즘, CS, 그리고 오늘 배운 것들을 기록하는 공간입니다.</p>

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
</section>

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