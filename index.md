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

  .book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
  }

  .book-tile {
    background: var(--white);
    border-radius: 20px;
    padding: 2rem 1.75rem;
    box-shadow: var(--shadow-soft);
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
    transform: translateY(-4px);
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.10);
  }

  .book-tile .cover {
    width: 140px;
    margin-bottom: 1.25rem;
  }

  .book-tile .cover img {
    width: 100%;
    border-radius: 6px;
    box-shadow: 6px 8px 24px rgba(0, 0, 0, 0.18);
    display: block;
  }

  .book-tile .cover.placeholder {
    height: 210px;
    border-radius: 6px;
    background: linear-gradient(145deg, #EAF0EA, #F5EAE7);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    box-shadow: 6px 8px 24px rgba(0, 0, 0, 0.12);
  }

  .book-tile h2 {
    font-family: 'Lora', serif;
    font-size: 1.35rem;
    font-weight: 600;
    color: var(--charcoal);
    margin: 0 0 0.3rem;
    border-bottom: none;
    padding: 0;
  }

  .book-tile .author {
    font-family: 'Lora', serif;
    font-style: italic;
    color: var(--sage-dark);
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .book-tile p {
    font-size: 0.88rem;
    color: var(--charcoal-mid);
    line-height: 1.6;
    margin: 0;
  }

  .book-tile .open-cta {
    margin-top: 1.25rem;
    color: var(--sage-dark);
    font-size: 0.85rem;
    font-weight: 500;
  }

  .book-tile:hover .open-cta {
    color: var(--rose);
  }
</style>

<div class="books-hero">
  <h1>Our Bookshelf</h1>
  <p>Pick a book to see our schedule, notes, and exercises.</p>
</div>

<div class="book-grid">

  <a href="{{ '/feeling-good/' | relative_url }}" class="book-tile">
    <div class="cover">
      <img
        src="https://covers.openlibrary.org/b/isbn/0380810336-L.jpg"
        alt="Feeling Good: The New Mood Therapy book cover"
      >
    </div>
    <h2>Feeling Good</h2>
    <p class="author">David D. Burns, M.D.</p>
    <p>A practical, research-backed guide to understanding and improving your mood through cognitive behavioral therapy.</p>
    <p class="open-cta">Open →</p>
  </a>

  <a href="{{ '/8-dates/' | relative_url }}" class="book-tile">
    <div class="cover">
      <img
        src="https://covers.openlibrary.org/b/isbn/9781523504466-L.jpg"
        alt="Eight Dates book cover"
      >
    </div>
    <h2>Eight Dates</h2>
    <p class="author">John &amp; Julie Gottman</p>
    <p>Eight structured conversations for couples — from trust to money to dreams — drawn from decades of Gottman research.</p>
    <p class="open-cta">Open →</p>
  </a>

  <a href="{{ '/i-will-teach-you-to-be-rich/' | relative_url }}" class="book-tile">
    <div class="cover">
      <img
        src="https://covers.openlibrary.org/b/isbn/9781523505746-L.jpg"
        alt="I Will Teach You to Be Rich book cover"
      >
    </div>
    <h2>I Will Teach You to Be Rich</h2>
    <p class="author">Ramit Sethi</p>
    <p>A six-week program to automate your finances, stop worrying about money, and build a "rich life" on your own terms.</p>
    <p class="open-cta">Open →</p>
  </a>

  <a href="{{ '/four-thousand-weeks/' | relative_url }}" class="book-tile">
    <div class="cover">
      <img
        src="https://covers.openlibrary.org/b/isbn/9780374159122-L.jpg"
        alt="Four Thousand Weeks book cover"
      >
    </div>
    <h2>Four Thousand Weeks</h2>
    <p class="author">Oliver Burkeman</p>
    <p>Time management for mortals — a philosophical, often funny case for making peace with our limits and choosing what actually matters.</p>
    <p class="open-cta">Open →</p>
  </a>

</div>
