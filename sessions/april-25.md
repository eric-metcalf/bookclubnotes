---
layout: session
title: "Dare to Be Average — April 25"
---

<style>
  .session-hero {
    background: linear-gradient(135deg, #FAF7F0 0%, #F5EAE7 100%);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .session-hero h1 {
    font-family: 'Lora', serif;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .session-hero .meta {
    font-family: 'Lora', serif;
    font-style: italic;
    color: var(--sage-dark);
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }

  .session-hero .vibe {
    background: #fff;
    border-left: 3px solid var(--rose);
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-family: 'Lora', serif;
    font-style: italic;
    color: var(--charcoal-mid);
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
  }

  .agenda-card {
    background: var(--white);
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    box-shadow: var(--shadow-card);
    border-left: 4px solid var(--sage);
    margin-bottom: 2.5rem;
  }

  .agenda-card h3 {
    font-family: 'Lora', serif;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--sage-dark);
    margin-bottom: 0.85rem;
  }

  .agenda-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0.4rem;
  }

  .agenda-list li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0.25rem 0;
    font-size: 0.92rem;
    color: var(--charcoal-mid);
    border-bottom: 1px dashed var(--cream-dark);
  }

  .agenda-list li:last-child {
    border-bottom: none;
  }

  .agenda-list .time {
    color: var(--charcoal-light);
    font-size: 0.82rem;
    font-family: 'Inter', sans-serif;
    white-space: nowrap;
    margin-left: 1rem;
  }

  .section-block {
    margin: 2.5rem 0;
    padding: 1.5rem 1.75rem;
    background: var(--white);
    border-radius: 16px;
    box-shadow: var(--shadow-card);
    border-left: 4px solid var(--sage);
  }

  .section-block.catch-up {
    border-left-color: var(--rose);
  }

  .section-block h2 {
    font-family: 'Lora', serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--charcoal);
    margin: 0 0 0.35rem;
    padding: 0;
    border-bottom: none;
  }

  .section-block .section-time {
    color: var(--charcoal-light);
    font-family: 'Inter', sans-serif;
    font-style: italic;
    font-size: 0.82rem;
    margin-bottom: 1rem;
  }

  .section-block p,
  .section-block li {
    color: var(--charcoal-mid);
    line-height: 1.65;
  }

  .placeholder {
    font-style: italic;
    color: var(--charcoal-light);
    padding: 0.75rem 1rem;
    background: #FAF7F0;
    border-radius: 8px;
    border-left: 3px dashed var(--cream-dark);
  }

  /* Embedded popcorn (scoped to this page) */
  .popcorn-embed {
    margin: 1.25rem 0 0.5rem;
    text-align: center;
  }

  .popcorn-embed .current-card {
    background: linear-gradient(135deg, #FDEDE8 0%, #FAF7F0 100%);
    border: 1px solid #F5C5BC;
    border-radius: 14px;
    padding: 1.5rem 1.25rem;
    margin-bottom: 1rem;
  }

  .popcorn-embed .current-label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--rose);
    margin-bottom: 0.4rem;
  }

  .popcorn-embed .current-name {
    font-family: 'Lora', serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--charcoal);
    margin: 0;
  }

  .popcorn-embed .progress-label {
    font-size: 0.8rem;
    color: var(--charcoal-light);
    margin-top: 0.35rem;
  }

  .popcorn-embed .popcorn-btn {
    display: inline-block;
    background: var(--rose);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 0.7rem 1.6rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.92rem;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
  }

  .popcorn-embed .popcorn-btn:hover {
    background: #B36E58;
  }

  .popcorn-embed .popcorn-btn:active {
    transform: scale(0.97);
  }

  .popcorn-embed .popcorn-btn.secondary {
    background: transparent;
    color: var(--charcoal-light);
    border: 1px solid #ddd;
  }

  .popcorn-embed .popcorn-btn.secondary:hover {
    background: #F5EFE4;
    color: var(--charcoal);
  }

  .popcorn-embed .gone-section {
    margin-top: 1rem;
    text-align: left;
    background: #FAF7F0;
    border-radius: 10px;
    padding: 0.85rem 1rem;
  }

  .popcorn-embed .gone-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--charcoal-light);
    margin-bottom: 0.5rem;
  }

  .popcorn-embed .gone-name {
    display: inline-block;
    background: #ede9e3;
    color: var(--charcoal-light);
    border-radius: 20px;
    padding: 0.2rem 0.7rem;
    font-size: 0.82rem;
    margin: 0.2rem 0.2rem 0.2rem 0;
    text-decoration: line-through;
  }

  .popcorn-embed .done-card {
    background: #F0EAE2;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
  }

  .popcorn-embed .done-card p {
    font-size: 1.05rem;
    color: var(--charcoal);
    margin-bottom: 0.25rem;
  }

  .popcorn-embed .done-sub {
    font-size: 0.85rem;
    color: var(--charcoal-light);
  }

  .popcorn-embed .hidden { display: none; }
</style>

<div class="session-hero">
  <h1>Dare to Be Average 🎯</h1>
  <p class="meta">Saturday, April 25, 2026 · 8:00 AM PT / 11:00 AM ET · <strong>Chapter 14</strong></p>
  <blockquote class="vibe">
    "Perfectionists put themselves on the rack and torture themselves. Their lives
    are a constant test — and they keep failing." Burns's answer: aim for average, on purpose, as a radical act.
  </blockquote>
</div>

<div class="agenda-card">
  <h3>Today's Plan</h3>
  <ul class="agenda-list">
    <li><span>☕ Catch up &amp; popcorn</span><span class="time">20 min</span></li>
    <li><span>🎯 Jeff's chapter summary</span><span class="time">10 min</span></li>
    <li><span>💬 Discussion questions</span><span class="time">25 min</span></li>
    <li><span>🌱 One take-away each</span><span class="time">5 min</span></li>
  </ul>
</div>

<div class="section-block catch-up" markdown="0">
  <h2>1 · Catch Up ☕</h2>
  <p class="section-time">First 20 minutes</p>

  <p>Before we crack open the chapter, let's actually land together. Fire up the popcorn picker and — when it's your turn — share whatever of these feels right:</p>

  <ul>
    <li>How <em>was</em> your week?</li>
    <li>What were you up to?</li>
    <li>What questions are on your mind right now — big, small, random?</li>
  </ul>

  <p>(No right answers. No performance required. This <em>is</em> the Dare-to-Be-Average portion of the agenda.)</p>

  <div class="popcorn-embed">
    <div id="pc-start">
      <button class="popcorn-btn" id="pc-start-btn">🍿 Pick First Person</button>
    </div>

    <div id="pc-active" class="hidden">
      <div class="current-card">
        <p class="current-label">Now sharing</p>
        <p class="current-name" id="pc-current-name"></p>
        <p class="progress-label" id="pc-progress-label"></p>
      </div>
      <button class="popcorn-btn" id="pc-next-btn">Next Person →</button>
      <div id="pc-gone-section" class="gone-section hidden">
        <p class="gone-label">Already went</p>
        <div id="pc-gone-list"></div>
      </div>
    </div>

    <div id="pc-done" class="hidden">
      <div class="done-card">
        <p>Everyone has shared! 🎉</p>
        <p class="done-sub">Great catch-up — let's dig in.</p>
      </div>
      <button class="popcorn-btn secondary" id="pc-restart-btn">Shuffle &amp; Start Over</button>
    </div>
  </div>
</div>

<div class="section-block">
  <h2>2 · Jeff's Summary 🎯</h2>
  <p class="section-time">10 minutes</p>
  <p>Jeff walks us through Chapter 14 — the main ideas, the exercises worth doing, and whatever grabbed him most.</p>
  <div class="placeholder">
    Jeff's notes will land here. Jeff, feel free to drop bullet points ahead of time — or we'll capture them during the session.
  </div>
</div>

<div class="section-block">
  <h2>3 · Discussion Questions 💬</h2>
  <p class="section-time">25 minutes</p>
  <p>Pick the ones that feel interesting — no need to go in order.</p>
  <ol>
    <li>Where does <strong>your</strong> perfectionism show up most? Work, relationships, appearance, a hobby, how your home looks on a Saturday morning?</li>
    <li>When did you first learn that "good enough" wasn't good enough? Who was teaching that — explicitly or by example?</li>
    <li>Burns lists the hidden <em>costs</em> of perfectionism (procrastination, paralysis, less enjoyment, often less quality too). Which of these do you recognize in yourself?</li>
    <li>Is there something you've avoided doing because you couldn't do it <em>perfectly</em>? What would it look like to do it badly on purpose?</li>
    <li>Burns talks about "process vs. product" — enjoying the doing, not just the finishing. Where in your life do you get this right already? Where is it missing?</li>
    <li>What's one low-stakes thing you could do <em>averagely</em> this week, deliberately? (Mediocre cooking. Unpolished text. Leaving a task at 70%. Sending the draft.)</li>
    <li>If your self-worth weren't tied to your output, what would you stop doing? What would you start?</li>
  </ol>
</div>

<div class="section-block">
  <h2>4 · One Take-Away 🌱</h2>
  <p class="section-time">Last 5 minutes</p>
  <p>Around the group, one sentence each:</p>
  <ul>
    <li>One thing you're taking with you from today.</li>
    <li>One "average" thing you'll let yourself do this week.</li>
  </ul>
</div>

<div class="section-block">
  <h2>Notes from the session</h2>
  <p class="section-time">Filled in after we meet</p>
  <div class="placeholder">
    Capture highlights, good quotes, and whatever we want to remember here.
  </div>
</div>

<script>
  (function() {
    const MEMBERS = [
      {% for member in site.data.members -%}
      { name: "{{ member.name | default: member.email | split: '@' | first }}", email: "{{ member.email }}" }{% unless forloop.last %},{% endunless %}
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

    function displayName(m) {
      return m.name || m.email.split('@')[0];
    }

    let order = [];
    let currentIndex = 0;

    const startSection  = document.getElementById('pc-start');
    const activeSection = document.getElementById('pc-active');
    const doneSection   = document.getElementById('pc-done');
    const currentName   = document.getElementById('pc-current-name');
    const progressLabel = document.getElementById('pc-progress-label');
    const goneSection   = document.getElementById('pc-gone-section');
    const goneList      = document.getElementById('pc-gone-list');
    const startBtn      = document.getElementById('pc-start-btn');
    const nextBtn       = document.getElementById('pc-next-btn');
    const restartBtn    = document.getElementById('pc-restart-btn');

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
        : remaining + ' person' + (remaining === 1 ? '' : 's') + ' left';

      nextBtn.textContent = remaining > 0 ? 'Next Person →' : 'Finish';

      const gone = order.slice(0, currentIndex);
      if (gone.length > 0) {
        goneSection.classList.remove('hidden');
        goneList.innerHTML = gone.map(function(e) {
          return '<span class="gone-name">' + displayName(e) + '</span>';
        }).join('');
      }
    }

    startBtn.addEventListener('click', start);
    nextBtn.addEventListener('click', function() {
      if (currentIndex < order.length - 1) {
        currentIndex++;
        show();
      } else {
        activeSection.classList.add('hidden');
        doneSection.classList.remove('hidden');
      }
    });
    restartBtn.addEventListener('click', function() {
      doneSection.classList.add('hidden');
      startSection.classList.remove('hidden');
    });
  })();
</script>
