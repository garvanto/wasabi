# Wasabi Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page hype website for $WASABI meme coin on Solana with fire aesthetics and interactive features.

**Architecture:** Single `index.html` with embedded or linked `style.css` and `main.js`. Canvas API for particle effects. No dependencies — pure HTML/CSS/JS deployable to GitHub Pages.

**Tech Stack:** HTML5, CSS3 (custom properties, keyframes, clip-path), Vanilla JS (Canvas API, IntersectionObserver, mousemove events), Google Fonts (Bangers, Space Grotesk, JetBrains Mono)

---

## Assets Needed Before Starting

- `assets/logo.png` — kawaii wasabi blob logo (user to place)
- `assets/banner.jpg` — dark chaos banner artwork (user to place)

Create the `assets/` folder and use placeholder paths — user drops images in.

---

### Task 1: Project Scaffold + GitHub Init

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `main.js`
- Create: `assets/.gitkeep`

**Step 1: Initialize git repo**

```bash
cd /Users/cambodiac/Desktop/wasabi
git init
git checkout -b main
```

**Step 2: Create folder structure**

```bash
mkdir -p assets
touch assets/.gitkeep
```

**Step 3: Create `index.html` base**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>$WASABI — Stay Spicy. Print Money. Melt Faces.</title>
  <meta name="description" content="The spiciest meme coin on Solana. $WASABI — Stay Spicy. Print Money. Melt Faces." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <!-- Canvas for cursor fire trail -->
  <canvas id="fire-canvas"></canvas>

  <!-- Spicy-O-Meter (fixed right side) -->
  <div id="spicy-meter">
    <div id="spicy-meter-fill"></div>
    <div id="spicy-labels">
      <span>ASCENDED</span>
      <span>FACE MELTING</span>
      <span>SPICY</span>
      <span>HOT</span>
      <span>MILD</span>
    </div>
    <div id="spicy-mascot"></div>
  </div>

  <!-- HERO -->
  <section id="hero">
    <div id="hero-bg"></div>
    <div id="hero-content">
      <div id="mascot-container">
        <img id="mascot" src="assets/logo.png" alt="Wasabi mascot" />
        <div class="eye" id="eye-left"><div class="pupil"></div></div>
        <div class="eye" id="eye-right"><div class="pupil"></div></div>
      </div>
      <h1 id="tagline">STAY $PICY.<br/>PRINT MONEY.<br/>MELT FACES.</h1>
      <div id="ca-box">
        <span id="ca-label">CONTRACT ADDRESS</span>
        <div id="ca-row">
          <code id="ca-text">DSZeB6pCzZsM43gTz7jakiYeCafinsNMKcpeB1FApump</code>
          <button id="copy-btn" onclick="copyCA()">COPY</button>
        </div>
      </div>
      <div id="hero-buttons">
        <a href="https://dexscreener.com/solana/5fc4vroj4n4dqtznt936y81eer3tyft2shn37qrmcq22" target="_blank" class="btn btn-primary">BUY $WASABI</a>
        <a href="https://t.me/+qW5wutIxveZkNjQ0" target="_blank" class="btn btn-secondary">JOIN TELEGRAM</a>
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section id="about">
    <p id="about-tagline">Wasabi isn't just a condiment.<br/>It's a lifestyle. It burns. It heals.<br/><strong>It makes you rich.</strong></p>
    <div id="stat-cards">
      <div class="stat-card">
        <span class="stat-icon">👥</span>
        <span class="stat-title">100% Community</span>
        <span class="stat-desc">No team tokens. No VC bags. Pure degens.</span>
      </div>
      <div class="stat-card">
        <span class="stat-icon">⚡</span>
        <span class="stat-title">Zero Tax</span>
        <span class="stat-desc">Buy. Sell. Keep everything. No cuts.</span>
      </div>
      <div class="stat-card">
        <span class="stat-icon">🚀</span>
        <span class="stat-title">Solana Speed</span>
        <span class="stat-desc">Sub-second transactions. Built for degens.</span>
      </div>
    </div>
  </section>

  <!-- HOW TO BUY -->
  <section id="how-to-buy">
    <h2>HOW TO BUY</h2>
    <div id="steps">
      <div class="step">
        <div class="step-num">01</div>
        <h3>Get SOL</h3>
        <p>Buy SOL on Coinbase, Binance, or any exchange.</p>
      </div>
      <div class="step">
        <div class="step-num">02</div>
        <h3>Get Phantom</h3>
        <p>Download Phantom Wallet at phantom.app and create a wallet.</p>
      </div>
      <div class="step">
        <div class="step-num">03</div>
        <h3>Swap on Raydium</h3>
        <p>Go to raydium.io, paste the CA, and swap SOL for $WASABI.</p>
      </div>
      <div class="step">
        <div class="step-num">04</div>
        <h3>WAGMI 🔥</h3>
        <p>Welcome to the spicy side. You are now dangerously based.</p>
      </div>
    </div>
  </section>

  <!-- MELT MY FACE -->
  <section id="melt-section">
    <h2>THINK YOU CAN HANDLE IT?</h2>
    <button id="melt-btn" onclick="meltFace()">MELT MY FACE 🔥</button>
    <div id="melt-msg"></div>
  </section>

  <!-- SLOT MACHINE -->
  <section id="slot-section">
    <h2>WASABI WISDOM</h2>
    <p class="slot-sub">Spin for your daily prophecy</p>
    <div id="slot-machine">
      <div class="reel-window">
        <div class="reel" id="reel-1"></div>
      </div>
      <div class="reel-window">
        <div class="reel" id="reel-2"></div>
      </div>
      <div class="reel-window">
        <div class="reel" id="reel-3"></div>
      </div>
    </div>
    <button id="spin-btn" onclick="spinSlot()">SPIN 🎰</button>
    <a id="share-btn" href="#" target="_blank" style="display:none">SHARE ON TWITTER</a>
  </section>

  <!-- FOOTER -->
  <footer id="footer">
    <img src="assets/logo.png" alt="Wasabi" id="footer-logo" />
    <p id="footer-tagline">$WASABI — Stay Spicy.</p>
    <div id="socials">
      <a href="https://x.com/wasabicheesesol" target="_blank" class="social-link">Twitter / X</a>
      <a href="https://t.me/+qW5wutIxveZkNjQ0" target="_blank" class="social-link">Telegram</a>
      <a href="https://dexscreener.com/solana/5fc4vroj4n4dqtznt936y81eer3tyft2shn37qrmcq22" target="_blank" class="social-link">Dexscreener</a>
    </div>
    <div id="footer-ca">
      <code>DSZeB6pCzZsM43gTz7jakiYeCafinsNMKcpeB1FApump</code>
      <button onclick="copyCA()">COPY</button>
    </div>
    <p id="disclaimer">Not financial advice. Just spicy vibes. 🌶️</p>
  </footer>

  <script src="main.js"></script>
</body>
</html>
```

**Step 4: Commit scaffold**

```bash
git add -A
git commit -m "feat: project scaffold with HTML structure"
```

---

### Task 2: Core CSS — Variables, Reset, Typography, Layout

**Files:**
- Modify: `style.css`

**Step 1: Write full style.css**

```css
/* ===== RESET & VARIABLES ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --green: #6FFF00;
  --neon: #39FF14;
  --fire: #FF6B00;
  --gold: #FFD700;
  --bg: #080808;
  --card-bg: #111111;
  --text: #FFFFFF;
  --muted: #888888;
  --font-head: 'Bangers', cursive;
  --font-body: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
  cursor: none;
}

/* ===== CURSOR CANVAS ===== */
#fire-canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 9999;
}

/* ===== SPICY-O-METER ===== */
#spicy-meter {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 40px;
}

#spicy-meter-track {
  width: 12px;
  height: 200px;
  background: #1a1a1a;
  border-radius: 6px;
  border: 1px solid #333;
  overflow: hidden;
  position: relative;
}

#spicy-meter-fill {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0%;
  border-radius: 6px;
  background: linear-gradient(to top, var(--green), var(--gold), var(--fire));
  transition: height 0.4s ease, filter 0.4s ease;
  filter: brightness(1);
}

#spicy-label-text {
  font-family: var(--font-head);
  font-size: 9px;
  letter-spacing: 1px;
  color: var(--green);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  white-space: nowrap;
}

#spicy-mascot-icon {
  font-size: 20px;
  transition: all 0.3s ease;
}

/* ===== HERO ===== */
#hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#hero-bg {
  position: absolute;
  inset: 0;
  background: url('assets/banner.jpg') center/cover no-repeat;
  filter: brightness(0.35) saturate(1.4);
  z-index: 0;
}

#hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 30%, #080808 100%);
}

#hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

#mascot-container {
  position: relative;
  width: 180px;
  height: 180px;
  animation: float 3s ease-in-out infinite;
}

#mascot {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 30px var(--green)) drop-shadow(0 0 60px rgba(111,255,0,0.3));
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-16px); }
}

#tagline {
  font-family: var(--font-head);
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 1.05;
  letter-spacing: 3px;
  color: var(--text);
  text-shadow:
    0 0 20px var(--green),
    0 0 40px rgba(111,255,0,0.5),
    3px 3px 0 rgba(0,0,0,0.8);
}

/* ===== CA BOX ===== */
#ca-box {
  background: rgba(111,255,0,0.05);
  border: 1px solid var(--green);
  border-radius: 12px;
  padding: 16px 24px;
  max-width: 640px;
  width: 100%;
}

#ca-label {
  display: block;
  font-size: 11px;
  letter-spacing: 3px;
  color: var(--green);
  margin-bottom: 8px;
  font-family: var(--font-head);
}

#ca-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

#ca-text {
  font-family: var(--font-mono);
  font-size: clamp(10px, 1.8vw, 13px);
  color: var(--text);
  word-break: break-all;
  flex: 1;
}

#copy-btn, #footer-ca button {
  font-family: var(--font-head);
  font-size: 14px;
  letter-spacing: 2px;
  padding: 8px 20px;
  background: var(--green);
  color: #000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

#copy-btn:hover, #footer-ca button:hover {
  background: var(--neon);
  box-shadow: 0 0 20px var(--neon);
}

#copy-btn.copied {
  background: var(--neon);
  box-shadow: 0 0 30px var(--neon);
  animation: pulse-green 0.3s ease;
}

@keyframes pulse-green {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

/* ===== BUTTONS ===== */
#hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  font-family: var(--font-head);
  font-size: 1.3rem;
  letter-spacing: 3px;
  padding: 16px 40px;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 2px solid transparent;
}

.btn-primary {
  background: var(--green);
  color: #000;
  border-color: var(--green);
}

.btn-primary:hover {
  background: transparent;
  color: var(--green);
  box-shadow: 0 0 30px var(--green), inset 0 0 20px rgba(111,255,0,0.1);
}

.btn-secondary {
  background: transparent;
  color: var(--text);
  border-color: #444;
}

.btn-secondary:hover {
  border-color: var(--green);
  color: var(--green);
  box-shadow: 0 0 20px rgba(111,255,0,0.2);
}

/* ===== ABOUT ===== */
#about {
  padding: 100px 20px;
  text-align: center;
  max-width: 1100px;
  margin: 0 auto;
}

#about-tagline {
  font-family: var(--font-head);
  font-size: clamp(1.8rem, 4vw, 3rem);
  letter-spacing: 2px;
  line-height: 1.4;
  margin-bottom: 60px;
  color: var(--text);
}

#about-tagline strong { color: var(--green); }

#stat-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.stat-card {
  background: var(--card-bg);
  border: 1px solid #222;
  border-radius: 16px;
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: var(--green);
  box-shadow: 0 0 30px rgba(111,255,0,0.15), 0 8px 32px rgba(0,0,0,0.5);
  transform: translateY(-6px);
}

.stat-icon { font-size: 2.5rem; }

.stat-title {
  font-family: var(--font-head);
  font-size: 1.6rem;
  letter-spacing: 2px;
  color: var(--green);
}

.stat-desc {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.5;
}

/* ===== HOW TO BUY ===== */
#how-to-buy {
  padding: 100px 20px;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}

#how-to-buy h2 {
  font-family: var(--font-head);
  font-size: clamp(3rem, 6vw, 5rem);
  letter-spacing: 4px;
  color: var(--green);
  margin-bottom: 60px;
  text-shadow: 0 0 30px rgba(111,255,0,0.4);
}

#steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.step {
  background: var(--card-bg);
  border: 1px solid #222;
  border-radius: 16px;
  padding: 36px 24px;
  position: relative;
  transition: all 0.3s ease;
}

.step:hover {
  border-color: var(--fire);
  box-shadow: 0 0 30px rgba(255,107,0,0.15);
  transform: translateY(-4px);
}

.step-num {
  font-family: var(--font-head);
  font-size: 3.5rem;
  color: var(--fire);
  opacity: 0.6;
  line-height: 1;
  margin-bottom: 12px;
  text-shadow: 0 0 20px var(--fire);
}

.step h3 {
  font-family: var(--font-head);
  font-size: 1.5rem;
  letter-spacing: 2px;
  margin-bottom: 10px;
  color: var(--text);
}

.step p {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.6;
}

/* ===== MELT SECTION ===== */
#melt-section {
  padding: 100px 20px;
  text-align: center;
}

#melt-section h2 {
  font-family: var(--font-head);
  font-size: clamp(2rem, 5vw, 4rem);
  letter-spacing: 4px;
  margin-bottom: 40px;
  color: var(--text);
}

#melt-btn {
  font-family: var(--font-head);
  font-size: 2rem;
  letter-spacing: 4px;
  padding: 24px 60px;
  background: linear-gradient(135deg, var(--fire), var(--gold));
  color: #000;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

#melt-btn:hover {
  box-shadow: 0 0 50px var(--fire), 0 0 100px rgba(255,107,0,0.3);
  transform: scale(1.05);
}

#melt-btn:active { transform: scale(0.97); }

#melt-msg {
  font-family: var(--font-head);
  font-size: 1.5rem;
  letter-spacing: 3px;
  color: var(--neon);
  margin-top: 30px;
  min-height: 40px;
  text-shadow: 0 0 20px var(--neon);
  transition: opacity 0.5s;
}

/* ===== SHAKE ANIMATION ===== */
@keyframes shake {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  10% { transform: translateX(-8px) rotate(-1deg); }
  20% { transform: translateX(8px) rotate(1deg); }
  30% { transform: translateX(-10px) rotate(-2deg); }
  40% { transform: translateX(10px) rotate(2deg); }
  50% { transform: translateX(-8px) rotate(-1deg); }
  60% { transform: translateX(8px) rotate(1deg); }
  70% { transform: translateX(-6px) rotate(0deg); }
  80% { transform: translateX(6px) rotate(0deg); }
  90% { transform: translateX(-4px) rotate(0deg); }
}

body.shake { animation: shake 0.6s ease; }

/* ===== SLOT MACHINE ===== */
#slot-section {
  padding: 100px 20px;
  text-align: center;
  background: radial-gradient(ellipse at center, rgba(111,255,0,0.03) 0%, transparent 70%);
}

#slot-section h2 {
  font-family: var(--font-head);
  font-size: clamp(3rem, 6vw, 5rem);
  letter-spacing: 4px;
  color: var(--green);
  text-shadow: 0 0 30px rgba(111,255,0,0.4);
  margin-bottom: 8px;
}

.slot-sub {
  color: var(--muted);
  margin-bottom: 48px;
  font-size: 1rem;
}

#slot-machine {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
}

.reel-window {
  width: 140px;
  height: 80px;
  background: #0d0d0d;
  border: 2px solid #333;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.reel-window::before, .reel-window::after {
  content: '';
  position: absolute;
  left: 0; right: 0;
  height: 20px;
  z-index: 2;
}

.reel-window::before { top: 0; background: linear-gradient(to bottom, #0d0d0d, transparent); }
.reel-window::after { bottom: 0; background: linear-gradient(to top, #0d0d0d, transparent); }

.reel {
  display: flex;
  flex-direction: column;
  transition: transform 0s;
}

.reel-item {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-head);
  font-size: 1rem;
  letter-spacing: 2px;
  color: var(--green);
  padding: 0 8px;
  text-align: center;
  line-height: 1.2;
}

#spin-btn {
  font-family: var(--font-head);
  font-size: 1.5rem;
  letter-spacing: 3px;
  padding: 18px 50px;
  background: transparent;
  color: var(--green);
  border: 2px solid var(--green);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  display: block;
  margin: 0 auto 20px;
}

#spin-btn:hover {
  background: var(--green);
  color: #000;
  box-shadow: 0 0 30px var(--green);
}

#spin-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

#share-btn {
  font-family: var(--font-head);
  font-size: 1rem;
  letter-spacing: 3px;
  padding: 12px 32px;
  background: #1da1f2;
  color: #fff;
  border-radius: 10px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s;
}

#share-btn:hover { opacity: 0.85; box-shadow: 0 0 20px rgba(29,161,242,0.4); }

/* ===== FOOTER ===== */
#footer {
  padding: 80px 20px 40px;
  text-align: center;
  border-top: 1px solid #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

#footer-logo {
  width: 70px;
  height: 70px;
  object-fit: contain;
  filter: drop-shadow(0 0 15px var(--green));
}

#footer-tagline {
  font-family: var(--font-head);
  font-size: 1.4rem;
  letter-spacing: 4px;
  color: var(--green);
}

#socials {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.social-link {
  font-family: var(--font-head);
  font-size: 1rem;
  letter-spacing: 3px;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}

.social-link:hover { color: var(--green); }

#footer-ca {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  background: rgba(255,255,255,0.03);
  border: 1px solid #222;
  border-radius: 10px;
  padding: 12px 20px;
}

#footer-ca code {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  word-break: break-all;
}

#footer-ca button {
  font-size: 11px;
  padding: 6px 14px;
}

#disclaimer {
  font-size: 0.8rem;
  color: #444;
}

/* ===== SECTION DIVIDERS ===== */
section { border-top: 1px solid #111; }

/* ===== RESPONSIVE ===== */
@media (max-width: 600px) {
  #spicy-meter { right: 8px; }
  .reel-window { width: 100px; }
  .reel-item { font-size: 0.8rem; }
  #tagline { font-size: 2.8rem; }
  .btn { padding: 14px 28px; font-size: 1.1rem; }
}
```

**Step 2: Commit CSS**

```bash
git add style.css
git commit -m "feat: full CSS styling with fire/green theme"
```

---

### Task 3: JavaScript — Cursor Fire Trail + CA Copy

**Files:**
- Modify: `main.js`

**Step 1: Write cursor fire trail and CA copy in main.js**

```js
// ===== CURSOR FIRE TRAIL =====
const canvas = document.getElementById('fire-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 2;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = -(Math.random() * 3 + 1);
    this.life = 1;
    this.decay = Math.random() * 0.04 + 0.02;
    const colors = ['#6FFF00', '#39FF14', '#FFD700', '#FF6B00'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= this.decay;
    this.size *= 0.97;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

window.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== CA COPY =====
function copyCA() {
  const ca = 'DSZeB6pCzZsM43gTz7jakiYeCafinsNMKcpeB1FApump';
  navigator.clipboard.writeText(ca).then(() => {
    document.querySelectorAll('#copy-btn, #footer-ca button').forEach(btn => {
      btn.textContent = 'COPIED!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'COPY';
        btn.classList.remove('copied');
      }, 2000);
    });
  });
}
```

**Step 2: Commit**

```bash
git add main.js
git commit -m "feat: cursor fire trail and CA copy button"
```

---

### Task 4: JavaScript — Mascot Eye Tracking + Float

**Files:**
- Modify: `main.js`
- Modify: `style.css`

**Step 1: Add eye tracking CSS to style.css**

```css
/* ===== EYE TRACKING (append to style.css) ===== */
.eye {
  position: absolute;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.pupil {
  width: 10px;
  height: 10px;
  background: #111;
  border-radius: 50%;
  transition: transform 0.08s ease;
  position: absolute;
}

#eye-left { top: 62px; left: 52px; }
#eye-right { top: 62px; right: 50px; }
```

**Step 2: Add eye tracking JS to main.js**

```js
// ===== MASCOT EYE TRACKING =====
const eyeLeft = document.getElementById('eye-left');
const eyeRight = document.getElementById('eye-right');

function trackEyes(e) {
  [eyeLeft, eyeRight].forEach(eye => {
    const rect = eye.getBoundingClientRect();
    const eyeCX = rect.left + rect.width / 2;
    const eyeCY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - eyeCY, e.clientX - eyeCX);
    const dist = 4;
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;
    eye.querySelector('.pupil').style.transform = `translate(${x}px, ${y}px)`;
  });
}

window.addEventListener('mousemove', trackEyes);
```

**Step 3: Commit**

```bash
git add main.js style.css
git commit -m "feat: mascot eye tracking follows cursor"
```

---

### Task 5: JavaScript — Spicy-O-Meter

**Files:**
- Modify: `main.js`
- Modify: `style.css`
- Modify: `index.html` (update spicy-meter HTML)

**Step 1: Replace spicy-meter HTML in index.html**

Replace the `#spicy-meter` div with:

```html
<div id="spicy-meter">
  <div id="spicy-mascot-icon">😐</div>
  <div id="spicy-meter-track">
    <div id="spicy-meter-fill"></div>
  </div>
  <div id="spicy-label-text">SPICY-O-METER</div>
</div>
```

**Step 2: Add spicy meter JS to main.js**

```js
// ===== SPICY-O-METER =====
const meterFill = document.getElementById('spicy-meter-fill');
const spicyMascot = document.getElementById('spicy-mascot-icon');

const spicyLevels = [
  { pct: 0,   emoji: '😐', label: 'MILD',         color: '#6FFF00' },
  { pct: 25,  emoji: '😅', label: 'HOT',          color: '#AAFF00' },
  { pct: 50,  emoji: '🥵', label: 'SPICY',        color: '#FFD700' },
  { pct: 75,  emoji: '😭', label: 'FACE MELTING', color: '#FF6B00' },
  { pct: 100, emoji: '💀', label: 'ASCENDED',     color: '#FF0000' },
];

function updateSpicyMeter() {
  const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  const pct = Math.min(100, Math.max(0, scrollPct));

  meterFill.style.height = pct + '%';

  const level = spicyLevels.reduce((prev, curr) =>
    pct >= curr.pct ? curr : prev
  );

  meterFill.style.background = `linear-gradient(to top, #6FFF00, ${level.color})`;
  meterFill.style.filter = pct > 75 ? `drop-shadow(0 0 8px ${level.color})` : 'none';
  spicyMascot.textContent = level.emoji;
  spicyMascot.title = level.label;
}

window.addEventListener('scroll', updateSpicyMeter, { passive: true });
updateSpicyMeter();
```

**Step 3: Commit**

```bash
git add index.html main.js style.css
git commit -m "feat: spicy-o-meter scroll indicator"
```

---

### Task 6: JavaScript — Melt My Face Button

**Files:**
- Modify: `main.js`

**Step 1: Add melt face JS to main.js**

```js
// ===== MELT MY FACE =====
const meltMessages = [
  'FACE MELTED. YOU ARE NOW NGMI-PROOF. 💀',
  'TOO SPICY. YOUR WALLET IS ON FIRE. 🔥',
  'CONGRATULATIONS. YOU ARE FULLY COOKED. 🌶️',
  'FACE: DISSOLVED. BAGS: HEAVY. VIBES: IMMACULATE. 🚀',
  'WARNING: FACE NO LONGER INTACT. BUY MORE WASABI. 💰',
];

let meltTimeout = null;

function meltFace() {
  const btn = document.getElementById('melt-btn');
  const msg = document.getElementById('melt-msg');

  // Shake
  document.body.classList.remove('shake');
  void document.body.offsetWidth; // force reflow
  document.body.classList.add('shake');

  // Fire edge flash
  const flash = document.createElement('div');
  flash.style.cssText = `
    position:fixed;inset:0;pointer-events:none;z-index:9998;
    background:radial-gradient(ellipse at center, transparent 40%, rgba(255,107,0,0.4) 100%);
    animation: fadeFlash 1s ease forwards;
  `;
  document.body.appendChild(flash);

  if (!document.getElementById('flash-keyframe')) {
    const style = document.createElement('style');
    style.id = 'flash-keyframe';
    style.textContent = '@keyframes fadeFlash { 0%{opacity:1} 100%{opacity:0} }';
    document.head.appendChild(style);
  }

  setTimeout(() => flash.remove(), 1000);

  // Mascot chaos
  const mascot = document.getElementById('mascot');
  mascot.style.animation = 'none';
  mascot.style.transform = 'scale(1.3) rotate(10deg)';
  mascot.style.filter = 'drop-shadow(0 0 40px #FF6B00) drop-shadow(0 0 80px rgba(255,107,0,0.6)) brightness(1.3)';

  // Message
  msg.textContent = meltMessages[Math.floor(Math.random() * meltMessages.length)];
  msg.style.opacity = '1';

  // Spawn extra particles burst
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const x = window.innerWidth / 2 + (Math.random() - 0.5) * 400;
      const y = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
      particles.push(new Particle(x, y));
    }, i * 15);
  }

  // Reset
  clearTimeout(meltTimeout);
  meltTimeout = setTimeout(() => {
    document.body.classList.remove('shake');
    mascot.style.transform = '';
    mascot.style.filter = '';
    mascot.style.animation = 'float 3s ease-in-out infinite';
    msg.style.opacity = '0';
    setTimeout(() => { msg.textContent = ''; msg.style.opacity = '1'; }, 500);
  }, 3000);
}
```

**Step 2: Commit**

```bash
git add main.js
git commit -m "feat: melt my face button with shake and fire effects"
```

---

### Task 7: JavaScript — Wasabi Wisdom Slot Machine

**Files:**
- Modify: `main.js`

**Step 1: Add slot machine JS to main.js**

```js
// ===== SLOT MACHINE =====
const reelWords = [
  ['BUY', 'HOLD', 'WAGMI', 'MOON', 'PUMP', 'SHILL', 'APE', 'SEND'],
  ['MORE', 'THE DIP', 'HARDER', 'SPICY', 'NOW', 'EVERYTHING', '100X', 'IT'],
  ['NOW', 'OR STAY POOR', 'EVERY DAY', 'FACE FIRST', 'WITH BOTH HANDS', 'AND MELT FACES', 'TO THE MOON', 'LFG'],
];

let isSpinning = false;

function buildReels() {
  [1, 2, 3].forEach(i => {
    const reel = document.getElementById(`reel-${i}`);
    const words = reelWords[i - 1];
    // Triple the words so there's room to scroll
    [...words, ...words, ...words].forEach(w => {
      const item = document.createElement('div');
      item.className = 'reel-item';
      item.textContent = w;
      reel.appendChild(item);
    });
  });
}

buildReels();

function spinSlot() {
  if (isSpinning) return;
  isSpinning = true;

  const spinBtn = document.getElementById('spin-btn');
  const shareBtn = document.getElementById('share-btn');
  spinBtn.disabled = true;
  shareBtn.style.display = 'none';

  const results = [];

  [1, 2, 3].forEach((i, idx) => {
    const reel = document.getElementById(`reel-${i}`);
    const words = reelWords[i - 1];
    const targetIndex = Math.floor(Math.random() * words.length);
    const totalItems = words.length * 3;
    const itemHeight = 80;
    // Land on middle set
    const targetPosition = (words.length + targetIndex) * itemHeight;
    const extraSpins = (3 + idx) * words.length * itemHeight;
    const finalPos = targetPosition + extraSpins;

    reel.style.transition = `transform ${1.5 + idx * 0.4}s cubic-bezier(0.17, 0.67, 0.35, 1)`;
    reel.style.transform = `translateY(-${finalPos}px)`;

    results[idx] = words[targetIndex];

    setTimeout(() => {
      if (idx === 2) {
        isSpinning = false;
        spinBtn.disabled = false;
        const result = results.join(' ');
        const tweetText = encodeURIComponent(`🌶️ Wasabi Wisdom says: "${result}" — $WASABI on Solana. Stay spicy. https://x.com/wasabicheesesol`);
        shareBtn.href = `https://twitter.com/intent/tweet?text=${tweetText}`;
        shareBtn.style.display = 'inline-block';
      }
    }, (1.5 + idx * 0.4) * 1000 + 300);
  });
}
```

**Step 2: Commit**

```bash
git add main.js
git commit -m "feat: wasabi wisdom slot machine with twitter share"
```

---

### Task 8: Floating Ember Particles (Ambient)

**Files:**
- Modify: `main.js`

**Step 1: Add ambient embers to main.js**

```js
// ===== AMBIENT EMBERS =====
class Ember {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * window.innerWidth;
    this.y = window.innerHeight + 10;
    this.size = Math.random() * 3 + 1;
    this.speedY = -(Math.random() * 1.5 + 0.5);
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.life = 1;
    this.decay = Math.random() * 0.004 + 0.002;
    const colors = ['#6FFF00', '#39FF14', '#FFD700'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX + Math.sin(Date.now() * 0.001 + this.x) * 0.3;
    this.y += this.speedY;
    this.life -= this.decay;
    if (this.life <= 0 || this.y < -10) this.reset();
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.life * 0.6;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const embers = Array.from({ length: 40 }, () => new Ember());

// Merge embers into animation loop - update animateParticles to also draw embers:
// Replace the animateParticles function with:
function animateAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => { p.update(); p.draw(); });
  embers.forEach(e => { e.update(); e.draw(); });
  requestAnimationFrame(animateAll);
}

// Remove original animateParticles() call at bottom and replace with:
// animateAll(); — see note below
```

> **Note:** After adding this, remove the `animateParticles()` call at the end of main.js and replace with `animateAll()`.

**Step 2: Commit**

```bash
git add main.js
git commit -m "feat: ambient ember particles drifting upward"
```

---

### Task 9: GitHub Repo + Pages Deployment

**Step 1: Create GitHub repo via CLI**

```bash
cd /Users/cambodiac/Desktop/wasabi
gh repo create wasabi --public --source=. --remote=origin --push
```

**Step 2: Enable GitHub Pages**

```bash
gh api repos/$(gh api user --jq .login)/wasabi/pages \
  --method POST \
  --field source='{"branch":"main","path":"/"}'
```

**Step 3: Verify deployment URL**

```bash
gh api repos/$(gh api user --jq .login)/wasabi/pages --jq .html_url
```

Expected output: `https://<username>.github.io/wasabi/`

---

### Task 10: Final Polish + Asset Check

**Step 1: Verify assets exist**

```bash
ls /Users/cambodiac/Desktop/wasabi/assets/
```

Confirm `logo.png` and `banner.jpg` are present. If not, the user needs to drop them in.

**Step 2: Check all links open correctly**
- BUY $WASABI → Dexscreener
- JOIN TELEGRAM → t.me link
- Twitter, Telegram, Dexscreener in footer

**Step 3: Test CA copy on desktop and mobile (browser DevTools mobile view)**

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final polish and asset verification"
git push origin main
```

---

## Asset Checklist (User Must Provide)

Before deploying, place these files in `/Users/cambodiac/Desktop/wasabi/assets/`:

| File | Description |
|------|-------------|
| `logo.png` | Kawaii wasabi blob logo (transparent background PNG) |
| `banner.jpg` | Dark chaos banner artwork |
