// ── Config ──────────────────────────────────────────────────────────────────
const SUPABASE_URL      = 'https://mkahcfdbwtxnhbzftwbv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ElGr-ThlzqbSP4YLTD3zow_79cloF8j';

const GRAVITY         = 0.28;
const FLAP_FORCE      = -7.5;
const TUBE_WIDTH      = 68;
const TUBE_GAP_START  = 215;
const TUBE_GAP_MIN    = 155;
const SPEED_START     = 2.2;
const SPEED_MAX       = 5.2;
const TUBE_SPACING    = 290;   // px between tube x positions
const MASCOT_X        = 110;   // fixed horizontal position
const MASCOT_SIZE     = 52;
const DEATH_FRAMES    = 55;

const HEAT_RANKS = [
  { min: 0,  label: 'MILD',         color: '#6FFF00' },
  { min: 10, label: 'SPICY',        color: '#FFD700' },
  { min: 25, label: 'FACE MELTING', color: '#FF6B00' },
  { min: 50, label: 'NUCLEAR',      color: '#FF0000' },
];

const STATE = { START: 0, PLAYING: 1, DEAD: 2, GAMEOVER: 3 };

// ── Canvas ───────────────────────────────────────────────────────────────────
const canvas = document.getElementById('game-canvas');
const ctx    = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => {
  resize();
  buildStars();
  if (state === STATE.PLAYING || state === STATE.DEAD) resetGame();
});

// ── Assets ───────────────────────────────────────────────────────────────────
const mascotImg = new Image();
mascotImg.src = 'assets/logo.png';

// ── Supabase ─────────────────────────────────────────────────────────────────
let sb = null;
try {
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch { /* credentials not configured yet */ }

async function fetchLeaderboard(limit = 10) {
  if (!sb) return [];
  try {
    const { data } = await sb
      .from('scores')
      .select('username, score')
      .order('score', { ascending: false })
      .limit(limit);
    return data || [];
  } catch { return []; }
}

async function submitScore(username, finalScore) {
  if (!sb) return false;
  try {
    const { error } = await sb.from('scores').insert({ username: username.trim(), score: finalScore });
    return !error;
  } catch { return false; }
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderLeaderboard(id, rows) {
  const el = document.getElementById(id);
  if (!rows.length) {
    el.innerHTML = '<p class="lb-empty">NO SCORES YET. BE FIRST.</p>';
    return;
  }
  el.innerHTML = rows
    .map((r, i) => `
      <div class="lb-row ${i === 0 ? 'lb-top' : ''}">
        <span class="lb-rank">#${i + 1}</span>
        <span class="lb-name">${escHtml(r.username)}</span>
        <span class="lb-score">${r.score} SCO</span>
      </div>`)
    .join('');
}

// ── Game State ────────────────────────────────────────────────────────────────
let state       = STATE.START;
let mascotY     = 0;
let mascotVY    = 0;
let tubes       = [];
let sparks      = [];
let score       = 0;
let gameSpeed   = SPEED_START;
let tubeGap     = TUBE_GAP_START;
let deathTimer  = 0;
let shakeX      = 0;
let shakeY      = 0;
let shakeMag    = 0;
let bgStars     = [];

function buildStars() {
  bgStars = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2 + 0.3,
    a: Math.random() * 0.4 + 0.1,
  }));
}
buildStars();

function getHeat(s) {
  return [...HEAT_RANKS].reverse().find(r => s >= r.min) || HEAT_RANKS[0];
}

function resetGame() {
  mascotY    = canvas.height / 2;
  mascotVY   = 0;
  tubes      = [];
  sparks     = [];
  score      = 0;
  gameSpeed  = SPEED_START;
  tubeGap    = TUBE_GAP_START;
  deathTimer = 0;
  shakeX     = 0;
  shakeY     = 0;
  shakeMag   = 0;
  document.getElementById('hud-score').textContent = '0';
  const rank = getHeat(0);
  const hudRank = document.getElementById('hud-rank');
  hudRank.textContent = rank.label;
  hudRank.style.color = rank.color;
}

// ── Input ─────────────────────────────────────────────────────────────────────
function handleInput() {
  if (state === STATE.START)    { startGame(); return; }
  if (state === STATE.PLAYING)  { mascotVY = FLAP_FORCE; }
  if (state === STATE.GAMEOVER) { retry(); }
}

window.addEventListener('keydown', e => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    handleInput();
  }
});
document.addEventListener('mousedown', e => {
  if (e.target.closest('button, input, a')) return;
  e.preventDefault();
  handleInput();
});
document.addEventListener('touchstart', e => {
  if (e.target.closest('button, input, a')) return;
  // Only block scroll during active gameplay — let menus scroll freely
  if (state === STATE.PLAYING || state === STATE.DEAD) e.preventDefault();
  handleInput();
}, { passive: false });

// ── Game Flow ──────────────────────────────────────────────────────────────────
function startGame() {
  resetGame();
  state = STATE.PLAYING;
  document.getElementById('screen-start').classList.add('hidden');
  document.getElementById('hud').classList.remove('hidden');
}

function retry() {
  document.getElementById('screen-gameover').classList.add('hidden');
  document.getElementById('screen-start').classList.remove('hidden');
  document.getElementById('btn-submit').disabled = false;
  document.getElementById('btn-submit').textContent = 'SUBMIT SCORE';
  document.getElementById('submit-status').textContent = '';
  document.getElementById('username-input').value = '';
  state = STATE.START;
  resetGame();
  fetchLeaderboard(5).then(rows => renderLeaderboard('lb-start', rows));
}

function die() {
  state      = STATE.DEAD;
  deathTimer = DEATH_FRAMES;
  shakeMag   = 14;

  for (let i = 0; i < 32; i++) {
    sparks.push({
      x:    MASCOT_X,
      y:    mascotY,
      vx:   (Math.random() - 0.5) * 9,
      vy:   (Math.random() - 0.5) * 9 - 2,
      life: 1,
      size: Math.random() * 7 + 3,
      col:  Math.random() > 0.5 ? '#FF0000' : '#FF6B00',
    });
  }
}

function showGameOver() {
  state = STATE.GAMEOVER;
  document.getElementById('hud').classList.add('hidden');

  const heat = getHeat(score);
  const rankEl  = document.getElementById('go-rank');
  const scoreEl = document.getElementById('go-score');
  rankEl.textContent  = heat.label;
  rankEl.style.color  = heat.color;
  rankEl.style.textShadow = `0 0 30px ${heat.color}`;
  scoreEl.textContent = `${score} SCOVILLE`;

  document.getElementById('screen-gameover').classList.remove('hidden');
  fetchLeaderboard(10).then(rows => renderLeaderboard('lb-gameover', rows));
}

// ── Tube Logic ────────────────────────────────────────────────────────────────
function spawnTube() {
  const margin = 90;
  const gapY   = Math.random() * (canvas.height - tubeGap - margin * 2) + margin;
  tubes.push({ x: canvas.width + TUBE_WIDTH / 2, gapY, passed: false });
}

function updateTubes() {
  if (!tubes.length || canvas.width - tubes[tubes.length - 1].x > TUBE_SPACING) {
    spawnTube();
  }
  for (const t of tubes) {
    t.x -= gameSpeed;
    if (!t.passed && t.x < MASCOT_X) {
      t.passed = true;
      score++;
      const heat = getHeat(score);
      document.getElementById('hud-score').textContent = score;
      const hudRank = document.getElementById('hud-rank');
      hudRank.textContent = heat.label;
      hudRank.style.color = heat.color;
      // Ramp difficulty
      const lvl = Math.floor(score / 10);
      gameSpeed = Math.min(SPEED_MAX, SPEED_START + lvl * 0.38);
      tubeGap   = Math.max(TUBE_GAP_MIN, TUBE_GAP_START - lvl * 7);
    }
  }
  tubes = tubes.filter(t => t.x > -TUBE_WIDTH);
}

// ── Collision ─────────────────────────────────────────────────────────────────
function hitTest() {
  const r = MASCOT_SIZE / 2 - 9;
  if (mascotY - r < 0 || mascotY + r > canvas.height) return true;
  for (const t of tubes) {
    if (Math.abs(t.x - MASCOT_X) < TUBE_WIDTH / 2 + r - 6) {
      if (mascotY - r < t.gapY || mascotY + r > t.gapY + tubeGap) return true;
    }
  }
  return false;
}

// ── Draw Helpers ──────────────────────────────────────────────────────────────
function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function drawTube(t) {
  const hw      = TUBE_WIDTH / 2;
  const nozzleH = 22;
  const nozzleW = TUBE_WIDTH + 14;
  const nh2     = nozzleW / 2;

  ctx.save();

  // Top tube body
  const grad1 = ctx.createLinearGradient(t.x - hw, 0, t.x + hw, 0);
  grad1.addColorStop(0, '#1a5c1a');
  grad1.addColorStop(0.4, '#2d8c2d');
  grad1.addColorStop(1, '#1a5c1a');
  ctx.fillStyle = grad1;
  roundRect(t.x - hw, -4, TUBE_WIDTH, t.gapY - nozzleH + 4, 6);
  ctx.fill();

  // Top nozzle
  const grad2 = ctx.createLinearGradient(t.x - nh2, 0, t.x + nh2, 0);
  grad2.addColorStop(0, '#236823');
  grad2.addColorStop(0.4, '#39a039');
  grad2.addColorStop(1, '#236823');
  ctx.fillStyle = grad2;
  roundRect(t.x - nh2, t.gapY - nozzleH, nozzleW, nozzleH, 5);
  ctx.fill();

  // Bottom nozzle
  ctx.fillStyle = grad2;
  roundRect(t.x - nh2, t.gapY + tubeGap, nozzleW, nozzleH, 5);
  ctx.fill();

  // Bottom tube body
  ctx.fillStyle = grad1;
  const botY = t.gapY + tubeGap + nozzleH;
  roundRect(t.x - hw, botY, TUBE_WIDTH, canvas.height - botY + 4, 6);
  ctx.fill();

  // Highlight stripe
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  ctx.fillRect(t.x - hw + 8, 0, 9, t.gapY - nozzleH);
  ctx.fillRect(t.x - hw + 8, botY, 9, canvas.height - botY);

  // Wasabi label on nozzles
  ctx.font = 'bold 9px monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.textAlign = 'center';
  ctx.fillText('WASABI', t.x, t.gapY - nozzleH / 2 + 3);
  ctx.fillText('WASABI', t.x, t.gapY + tubeGap + nozzleH / 2 + 3);

  ctx.restore();
}

function drawMascot(y) {
  const tilt = Math.max(-0.45, Math.min(0.45, mascotVY * 0.045));
  ctx.save();
  ctx.translate(MASCOT_X, y);
  ctx.rotate(tilt);
  ctx.shadowBlur  = 22;
  ctx.shadowColor = '#6FFF00';
  if (mascotImg.complete && mascotImg.naturalWidth) {
    ctx.drawImage(mascotImg, -MASCOT_SIZE / 2, -MASCOT_SIZE / 2, MASCOT_SIZE, MASCOT_SIZE);
  } else {
    // Fallback circle
    ctx.beginPath();
    ctx.arc(0, 0, MASCOT_SIZE / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#6FFF00';
    ctx.fill();
  }
  ctx.restore();
}

function drawBg() {
  ctx.fillStyle = '#080808';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Background stars
  for (const s of bgStars) {
    ctx.globalAlpha = s.a;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Subtle ground line
  ctx.fillStyle = 'rgba(111,255,0,0.06)';
  ctx.fillRect(0, canvas.height - 3, canvas.width, 3);
  ctx.fillStyle = 'rgba(111,255,0,0.03)';
  ctx.fillRect(0, 0, canvas.width, 3);
}

function drawSparks() {
  for (const p of sparks) {
    ctx.save();
    ctx.globalAlpha = p.life;
    ctx.fillStyle   = p.col;
    ctx.shadowBlur  = 8;
    ctx.shadowColor = p.col;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ── Main Loop ─────────────────────────────────────────────────────────────────
function update() {
  // Screen shake decay
  if (shakeMag > 0) {
    shakeX   = (Math.random() - 0.5) * shakeMag * 2;
    shakeY   = (Math.random() - 0.5) * shakeMag * 2;
    shakeMag *= 0.82;
    if (shakeMag < 0.4) { shakeMag = 0; shakeX = 0; shakeY = 0; }
  }

  if (state === STATE.PLAYING) {
    mascotVY += GRAVITY;
    mascotVY  = Math.min(mascotVY, 12);
    mascotY  += mascotVY;
    updateTubes();
    if (hitTest()) die();
  }

  if (state === STATE.DEAD) {
    mascotVY += GRAVITY;
    mascotY  += mascotVY;
    deathTimer--;
    if (deathTimer <= 0) showGameOver();
  }

  // Sparks
  for (const p of sparks) {
    p.x  += p.vx;
    p.y  += p.vy;
    p.vy += 0.25;
    p.life -= 0.028;
  }
  sparks = sparks.filter(p => p.life > 0);
}

function draw() {
  ctx.save();
  if (shakeX || shakeY) ctx.translate(shakeX, shakeY);

  drawBg();
  for (const t of tubes) drawTube(t);
  if (state !== STATE.GAMEOVER) drawMascot(mascotY);
  drawSparks();

  ctx.restore();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// ── UI Handlers ───────────────────────────────────────────────────────────────
document.getElementById('btn-share').addEventListener('click', () => {
  const heat = getHeat(score);
  const text = encodeURIComponent(
    `I scored ${score} Scoville units at ${heat.label} heat in Flappy Wasabi! Can you beat me? wasabicheese.com/game $WASABI`
  );
  window.open(`https://x.com/intent/tweet?text=${text}`, '_blank');
});

document.getElementById('btn-submit').addEventListener('click', async () => {
  const username = document.getElementById('username-input').value.trim();
  const status   = document.getElementById('submit-status');
  const btn      = document.getElementById('btn-submit');

  if (!username) {
    document.getElementById('username-input').focus();
    status.textContent = 'ENTER A NAME FIRST.';
    status.style.color = '#FF4444';
    return;
  }

  btn.disabled    = true;
  btn.textContent = 'SUBMITTING...';
  status.textContent = '';

  const ok = await submitScore(username, score);
  if (ok) {
    btn.textContent    = 'SUBMITTED!';
    status.textContent = 'SCORE SAVED. YOU ARE LEGENDARY.';
    status.style.color = '#6FFF00';
    fetchLeaderboard(10).then(rows => renderLeaderboard('lb-gameover', rows));
  } else {
    btn.disabled    = false;
    btn.textContent = 'SUBMIT SCORE';
    status.textContent = 'ERROR. CHECK CONNECTION.';
    status.style.color = '#FF4444';
  }
});

document.getElementById('btn-retry').addEventListener('click', retry);

// ── Init ──────────────────────────────────────────────────────────────────────
async function init() {
  resetGame();
  state = STATE.START;
  const rows = await fetchLeaderboard(5);
  renderLeaderboard('lb-start', rows);
  loop();
}

init();
