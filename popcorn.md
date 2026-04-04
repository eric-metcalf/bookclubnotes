---
layout: default
title: Popcorn Order
---

<style>
  .popcorn-page {
    max-width: 480px;
    margin: 3rem auto;
    text-align: center;
  }

  .popcorn-page h1 {
    font-size: 1.6rem;
    margin-bottom: 0.4rem;
  }

  .popcorn-page .subtitle {
    color: #888;
    margin-bottom: 2.5rem;
    font-size: 0.95rem;
  }

  .current-card {
    background: #fff;
    border: 1px solid #e8e0d5;
    border-radius: 16px;
    padding: 2.5rem 2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  .current-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #aaa;
    margin-bottom: 0.75rem;
  }

  .current-name {
    font-size: 2rem;
    font-weight: 600;
    color: #2c2c2c;
    margin: 0;
  }

  .progress-label {
    font-size: 0.85rem;
    color: #aaa;
    margin-top: 0.5rem;
  }

  .popcorn-btn {
    display: inline-block;
    background: #2c2c2c;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 0.85rem 2rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.15s;
    margin-bottom: 2rem;
  }

  .popcorn-btn:hover {
    background: #444;
  }

  .popcorn-btn.secondary {
    background: transparent;
    color: #888;
    border: 1px solid #ddd;
  }

  .popcorn-btn.secondary:hover {
    background: #f5f5f5;
  }

  .gone-section {
    margin-top: 1rem;
    text-align: left;
    background: #faf9f7;
    border-radius: 10px;
    padding: 1rem 1.25rem;
  }

  .gone-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #aaa;
    margin-bottom: 0.6rem;
  }

  .gone-name {
    display: inline-block;
    background: #ede9e3;
    color: #888;
    border-radius: 20px;
    padding: 0.2rem 0.75rem;
    font-size: 0.85rem;
    margin: 0.2rem 0.2rem 0.2rem 0;
    text-decoration: line-through;
  }

  .done-card {
    background: #fff;
    border: 1px solid #e8e0d5;
    border-radius: 16px;
    padding: 2.5rem 2rem;
    margin-bottom: 1.5rem;
  }

  .done-card p {
    font-size: 1.2rem;
    color: #2c2c2c;
    margin-bottom: 0.5rem;
  }

  .done-card .done-sub {
    font-size: 0.9rem;
    color: #aaa;
    margin-bottom: 0;
  }

  .hidden { display: none; }
</style>

<div class="popcorn-page">
  <h1>Popcorn Order</h1>
  <p class="subtitle">Randomly picks who shares next.</p>

  <!-- Start screen -->
  <div id="popcorn-start">
    <button class="popcorn-btn" id="start-btn">Pick First Person</button>
  </div>

  <!-- Active screen -->
  <div id="popcorn-active" class="hidden">
    <div class="current-card">
      <p class="current-label">Now sharing</p>
      <p class="current-name" id="current-name"></p>
      <p class="progress-label" id="progress-label"></p>
    </div>
    <button class="popcorn-btn" id="next-btn">Next Person →</button>
    <div id="gone-section" class="gone-section hidden">
      <p class="gone-label">Already went</p>
      <div id="gone-list"></div>
    </div>
  </div>

  <!-- Done screen -->
  <div id="popcorn-done" class="hidden">
    <div class="done-card">
      <p>Everyone has shared!</p>
      <p class="done-sub">Great discussion.</p>
    </div>
    <button class="popcorn-btn secondary" id="restart-btn">Shuffle & Start Over</button>
  </div>
</div>

<script>
  const MEMBERS = [
    {% for email in site.data.members -%}
    "{{ email }}"{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function displayName(email) {
    return email.split('@')[0];
  }

  let order = [];
  let currentIndex = 0;

  const startSection  = document.getElementById('popcorn-start');
  const activeSection = document.getElementById('popcorn-active');
  const doneSection   = document.getElementById('popcorn-done');
  const currentName   = document.getElementById('current-name');
  const progressLabel = document.getElementById('progress-label');
  const goneSection   = document.getElementById('gone-section');
  const goneList      = document.getElementById('gone-list');
  const startBtn      = document.getElementById('start-btn');
  const nextBtn       = document.getElementById('next-btn');
  const restartBtn    = document.getElementById('restart-btn');

  function start() {
    order = shuffle(MEMBERS);
    currentIndex = 0;
    goneList.innerHTML = '';
    goneSection.classList.add('hidden');
    show();
  }

  function show() {
    startSection.classList.add('hidden');
    doneSection.classList.add('hidden');
    activeSection.classList.remove('hidden');

    currentName.textContent = displayName(order[currentIndex]);

    const remaining = order.length - currentIndex - 1;
    progressLabel.textContent = remaining === 0
      ? 'Last one!'
      : `${remaining} person${remaining === 1 ? '' : 's'} left`;

    nextBtn.textContent = remaining > 0 ? 'Next Person →' : 'Finish';

    const gone = order.slice(0, currentIndex);
    if (gone.length > 0) {
      goneSection.classList.remove('hidden');
      goneList.innerHTML = gone.map(e =>
        `<span class="gone-name">${displayName(e)}</span>`
      ).join('');
    }
  }

  startBtn.addEventListener('click', start);

  nextBtn.addEventListener('click', () => {
    if (currentIndex < order.length - 1) {
      currentIndex++;
      show();
    } else {
      activeSection.classList.add('hidden');
      doneSection.classList.remove('hidden');
    }
  });

  restartBtn.addEventListener('click', () => {
    doneSection.classList.add('hidden');
    startSection.classList.remove('hidden');
  });
</script>
