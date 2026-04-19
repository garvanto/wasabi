// ── Deco canvas (cheese + chili) ──
const decoCanvas = document.getElementById('deco-canvas');
const dctx = decoCanvas.getContext('2d');

function resizeDeco() {
  decoCanvas.width = window.innerWidth;
  decoCanvas.height = window.innerHeight;
}
resizeDeco();
window.addEventListener('resize', resizeDeco);

function drawCheese(cx, x, y, size, rot) {
  cx.save();
  cx.translate(x, y);
  cx.rotate(rot);
  // wedge body
  cx.beginPath();
  cx.moveTo(0, -size);
  cx.lineTo(size * 0.85, size * 0.55);
  cx.arcTo(size * 0.85, size * 0.7, -size * 0.85, size * 0.7, size * 0.18);
  cx.lineTo(-size * 0.85, size * 0.55);
  cx.closePath();
  cx.fillStyle = '#F5C518';
  cx.fill();
  cx.strokeStyle = '#D4A017';
  cx.lineWidth = size * 0.06;
  cx.stroke();
  // holes
  [[0.15, 0.05], [-0.28, 0.28], [0.35, 0.35]].forEach(([hx, hy]) => {
    cx.beginPath();
    cx.arc(hx * size, hy * size, size * 0.11, 0, Math.PI * 2);
    cx.fillStyle = '#C8960C';
    cx.fill();
  });
  cx.restore();
}

function drawChili(cx, x, y, size, rot) {
  cx.save();
  cx.translate(x, y);
  cx.rotate(rot);
  // body
  cx.beginPath();
  cx.moveTo(0, -size * 0.5);
  cx.bezierCurveTo(size * 0.45, -size * 0.3, size * 0.55, size * 0.4, size * 0.15, size * 0.85);
  cx.bezierCurveTo(size * 0.05, size * 1.0, -size * 0.15, size * 0.95, -size * 0.2, size * 0.75);
  cx.bezierCurveTo(-size * 0.45, size * 0.3, -size * 0.35, -size * 0.25, 0, -size * 0.5);
  cx.fillStyle = '#E8231A';
  cx.fill();
  cx.strokeStyle = '#B01010';
  cx.lineWidth = size * 0.05;
  cx.stroke();
  // highlight
  cx.beginPath();
  cx.moveTo(size * 0.1, -size * 0.3);
  cx.bezierCurveTo(size * 0.32, -size * 0.1, size * 0.35, size * 0.2, size * 0.22, size * 0.5);
  cx.strokeStyle = 'rgba(255,120,100,0.45)';
  cx.lineWidth = size * 0.1;
  cx.lineCap = 'round';
  cx.stroke();
  // stem
  cx.beginPath();
  cx.moveTo(0, -size * 0.5);
  cx.bezierCurveTo(-size * 0.05, -size * 0.75, size * 0.2, -size * 0.85, size * 0.15, -size);
  cx.strokeStyle = '#2E7D32';
  cx.lineWidth = size * 0.1;
  cx.lineCap = 'round';
  cx.stroke();
  cx.restore();
}

class DecoParticle {
  constructor(initial) {
    this.reset(initial);
  }
  reset(initial) {
    this.type = Math.random() > 0.5 ? 'cheese' : 'chili';
    this.x = Math.random() * window.innerWidth;
    this.y = initial ? Math.random() * window.innerHeight : -60;
    this.size = Math.random() * 16 + 12;
    this.rot = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.012;
    this.vy = Math.random() * 0.5 + 0.25;
    this.vx = (Math.random() - 0.5) * 0.25;
    this.sway = Math.random() * Math.PI * 2;
    this.swaySpeed = Math.random() * 0.008 + 0.004;
    this.swayAmt = Math.random() * 0.6 + 0.2;
    this.opacity = Math.random() * 0.3 + 0.2;
  }
  update() {
    this.y += this.vy;
    this.x += this.vx + Math.sin(this.sway) * this.swayAmt;
    this.sway += this.swaySpeed;
    this.rot += this.rotSpeed;
    if (this.y > window.innerHeight + 80) this.reset(false);
  }
  draw() {
    dctx.save();
    dctx.globalAlpha = this.opacity;
    if (this.type === 'cheese') drawCheese(dctx, this.x, this.y, this.size, this.rot);
    else drawChili(dctx, this.x, this.y, this.size, this.rot);
    dctx.restore();
  }
}

const decoParticles = Array.from({ length: 18 }, (_, i) => new DecoParticle(i < 14));

function animateDeco() {
  dctx.clearRect(0, 0, decoCanvas.width, decoCanvas.height);
  decoParticles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateDeco);
}
animateDeco();

// ── Fire canvas (cursor trail) ──
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

function animateAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => { p.update(); p.draw(); });
  embers.forEach(e => { e.update(); e.draw(); });
  requestAnimationFrame(animateAll);
}
animateAll();

function copyCA() {
  const ca = 'DSZeB6pCzZsM43gTz7jakiYeCafinsNMKcpeB1FApump';

  const confirm = () => {
    document.querySelectorAll('#copy-btn, #footer-ca button').forEach(btn => {
      btn.textContent = 'COPIED!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'COPY'; btn.classList.remove('copied'); }, 2000);
    });
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(ca).then(confirm).catch(() => fallbackCopy(ca, confirm));
  } else {
    fallbackCopy(ca, confirm);
  }
}

function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); cb(); } catch(e) {}
  document.body.removeChild(ta);
}

const meterFill = document.getElementById('spicy-meter-fill');
const spicyMascot = document.getElementById('spicy-mascot-icon');

const spicyLevels = [
  { pct: 0,   label: 'MILD',         color: '#6FFF00' },
  { pct: 25,  label: 'HOT',          color: '#AAFF00' },
  { pct: 50,  label: 'SPICY',        color: '#FFD700' },
  { pct: 75,  label: 'FACE MELTING', color: '#FF6B00' },
  { pct: 100, label: 'ASCENDED',     color: '#FF0000' },
];

function updateSpicyMeter() {
  const scrollable = document.body.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return;
  const pct = Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100));

  meterFill.style.height = pct + '%';

  const level = spicyLevels.reduce((prev, curr) => pct >= curr.pct ? curr : prev);

  meterFill.style.background = `linear-gradient(to top, #6FFF00, ${level.color})`;
  meterFill.style.boxShadow = pct > 75 ? `0 0 8px ${level.color}` : 'none';
  spicyMascot.textContent = level.label;
  spicyMascot.title = level.label;
}

window.addEventListener('scroll', updateSpicyMeter, { passive: true });

const meltMessages = [
  'FACE MELTED. YOU ARE NOW NGMI-PROOF.',
  'TOO SPICY. YOUR WALLET IS ON FIRE.',
  'CONGRATULATIONS. YOU ARE FULLY COOKED.',
  'FACE: DISSOLVED. BAGS: HEAVY. VIBES: IMMACULATE.',
  'WARNING: FACE NO LONGER INTACT. BUY MORE WASABI.',
];

let meltTimeout = null;
let meltCleanupTimeout = null;

function meltFace() {
  clearTimeout(meltTimeout);
  clearTimeout(meltCleanupTimeout);

  meltCount++;
  localStorage.setItem('meltCount', meltCount);
  updateMeltDisplay();

  const msg = document.getElementById('melt-msg');

  document.body.classList.remove('shake');
  void document.body.offsetWidth;
  document.body.classList.add('shake');

  const flash = document.createElement('div');
  flash.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998;background:radial-gradient(ellipse at center, transparent 40%, rgba(255,107,0,0.4) 100%);animation:fadeFlash 1s ease forwards;';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 1000);

  const mascot = document.getElementById('mascot');
  mascot.style.animation = 'none';
  mascot.style.transform = 'scale(1.3) rotate(10deg)';
  mascot.style.filter = 'drop-shadow(0 0 40px #FF6B00) drop-shadow(0 0 80px rgba(255,107,0,0.6)) brightness(1.3)';

  msg.textContent = meltMessages[Math.floor(Math.random() * meltMessages.length)];
  msg.style.opacity = '1';

  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const x = window.innerWidth / 2 + (Math.random() - 0.5) * 400;
      const y = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
      particles.push(new Particle(x, y));
    }, i * 15);
  }

  meltTimeout = setTimeout(() => {
    document.body.classList.remove('shake');
    mascot.style.transform = '';
    mascot.style.filter = '';
    mascot.style.animation = '';
    msg.style.opacity = '0';
    meltCleanupTimeout = setTimeout(() => { msg.textContent = ''; msg.style.opacity = '1'; }, 500);
  }, 3000);
}
updateSpicyMeter();

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Faces melted counter
let meltCount = parseInt(localStorage.getItem('meltCount') || '69420', 10);
function updateMeltDisplay() {
  document.getElementById('melt-counter-num').textContent = meltCount.toLocaleString();
}
updateMeltDisplay();

