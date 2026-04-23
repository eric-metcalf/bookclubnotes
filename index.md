---
layout: default
title: Book Club
---

<style>
  .books-hero {
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .books-hero h1 {
    font-family: 'Lora', serif;
    font-size: 2.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .books-hero p {
    color: var(--charcoal-mid);
    font-size: 1rem;
    max-width: 540px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* Active / featured book */
  .book-feature {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 2rem;
    background: var(--white);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 3rem;
    box-shadow: 0 6px 28px rgba(196, 128, 106, 0.14);
    border-left: 4px solid var(--rose);
    text-decoration: none;
    color: inherit;
    transition: transform 0.15s, box-shadow 0.15s;
    align-items: start;
  }

  .book-feature:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 36px rgba(196, 128, 106, 0.2);
  }

  .book-feature .feature-cover img {
    width: 100%;
    border-radius: 6px;
    box-shadow: 6px 8px 24px rgba(0, 0, 0, 0.18);
    display: block;
  }

  .feature-text .feature-badge {
    display: inline-block;
    background: var(--rose);
    color: var(--white);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.22rem 0.6rem;
    border-radius: 4px;
    margin-bottom: 0.75rem;
  }

  .feature-text h2 {
    font-family: 'Lora', serif;
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--charcoal);
    margin: 0 0 0.25rem;
    border-bottom: none;
    padding: 0;
  }

  .feature-text .author {
    font-family: 'Lora', serif;
    font-style: italic;
    color: var(--rose);
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .feature-text p {
    font-size: 0.95rem;
    color: var(--charcoal-mid);
    line-height: 1.7;
    margin: 0;
  }

  .feature-text .open-cta {
    margin-top: 1.25rem;
    color: var(--rose);
    font-weight: 500;
    font-size: 0.9rem;
  }

  .book-feature:hover .open-cta {
    color: #B36E58;
  }

  /* Section headings */
  .books-section-heading {
    font-family: 'Lora', serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--charcoal);
    margin: 2.5rem 0 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--cream-dark);
  }

  .books-section-heading.subtle {
    color: var(--charcoal-light);
    border-bottom-style: dashed;
  }

  /* Smaller grid for upcoming / past books */
  .book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem;
  }

  .book-tile {
    background: var(--white);
    border-radius: 16px;
    padding: 1.5rem 1.25rem;
    box-shadow: var(--shadow-card);
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.15s, box-shadow 0.15s;
    border-left: 4px solid var(--sage);
  }

  .book-tile:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  .book-tile.past {
    border-left-color: var(--cream-dark);
    background: linear-gradient(to right, #F8F5EE, var(--white));
  }

  .book-tile.past .cover img,
  .book-tile.past h2,
  .book-tile.past .author,
  .book-tile.past p {
    opacity: 0.75;
  }

  .book-tile .cover {
    width: 110px;
    margin-bottom: 1rem;
  }

  .book-tile .cover img {
    width: 100%;
    border-radius: 5px;
    box-shadow: 5px 6px 18px rgba(0, 0, 0, 0.15);
    display: block;
  }

  .book-tile h2 {
    font-family: 'Lora', serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--charcoal);
    margin: 0 0 0.25rem;
    border-bottom: none;
    padding: 0;
  }

  .book-tile .author {
    font-family: 'Lora', serif;
    font-style: italic;
    color: var(--sage-dark);
    font-size: 0.82rem;
    margin-bottom: 0.75rem;
  }

  .book-tile p {
    font-size: 0.83rem;
    color: var(--charcoal-mid);
    line-height: 1.55;
    margin: 0;
  }

  .book-tile .open-cta {
    margin-top: 1rem;
    color: var(--sage-dark);
    font-size: 0.8rem;
    font-weight: 500;
  }

  .book-tile:hover .open-cta {
    color: var(--rose);
  }

  @media (max-width: 600px) {
    .book-feature {
      grid-template-columns: 1fr;
      text-align: center;
      padding: 1.5rem;
    }

    .book-feature .feature-cover {
      max-width: 160px;
      margin: 0 auto;
    }
  }
</style>

<div class="books-hero">
  <h1>Our Bookshelf</h1>
  <p>One book at a time. Here's what we're reading now, and what's next.</p>
</div>

{% assign active_books = site.data.books | where: "status", "active" %}
{% assign upcoming_books = site.data.books | where: "status", "upcoming" %}
{% assign past_books = site.data.books | where: "status", "past" %}

<div class="featured-books">
{% for book in active_books %}
  <a href="{{ book.url | relative_url }}" class="book-feature">
    <div class="feature-cover">
      <img
        src="https://covers.openlibrary.org/b/isbn/{{ book.cover_isbn }}-L.jpg"
        alt="{{ book.title }} book cover"
      >
    </div>
    <div class="feature-text">
      <span class="feature-badge">Now Reading</span>
      <h2>{{ book.title }}</h2>
      <p class="author">{{ book.author }}</p>
      <p>{{ book.description }}</p>
      <p class="open-cta">Open →</p>
    </div>
  </a>
{% endfor %}
</div>

{% if upcoming_books.size > 0 %}
<h2 class="books-section-heading">Next Up</h2>
<div class="book-grid">
  {% for book in upcoming_books %}
  <a href="{{ book.url | relative_url }}" class="book-tile">
    <div class="cover">
      <img
        src="https://covers.openlibrary.org/b/isbn/{{ book.cover_isbn }}-L.jpg"
        alt="{{ book.title }} book cover"
      >
    </div>
    <h2>{{ book.title }}</h2>
    <p class="author">{{ book.author }}</p>
    <p>{{ book.description }}</p>
    <p class="open-cta">Open →</p>
  </a>
  {% endfor %}
</div>
{% endif %}

{% if past_books.size > 0 %}
<h2 class="books-section-heading subtle">Previously</h2>
<div class="book-grid">
  {% for book in past_books %}
  <a href="{{ book.url | relative_url }}" class="book-tile past">
    <div class="cover">
      <img
        src="https://covers.openlibrary.org/b/isbn/{{ book.cover_isbn }}-L.jpg"
        alt="{{ book.title }} book cover"
      >
    </div>
    <h2>{{ book.title }}</h2>
    <p class="author">{{ book.author }}</p>
    <p>{{ book.description }}</p>
    <p class="open-cta">Open →</p>
  </a>
  {% endfor %}
</div>
{% endif %}
