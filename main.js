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

function animateAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateAll);
}
animateAll();

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
  }).catch(() => {});
}

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
    mascot.style.animation = 'float 3s ease-in-out infinite';
    msg.style.opacity = '0';
    meltCleanupTimeout = setTimeout(() => { msg.textContent = ''; msg.style.opacity = '1'; }, 500);
  }, 3000);
}
updateSpicyMeter();

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
  shareBtn.classList.add('hidden');

  const results = [];

  [1, 2, 3].forEach((i, idx) => {
    const reel = document.getElementById(`reel-${i}`);
    const words = reelWords[i - 1];
    const targetIndex = Math.floor(Math.random() * words.length);
    const itemHeight = 80;
    const targetPosition = (words.length + targetIndex) * itemHeight;
    const extraSpins = (3 + idx) * words.length * itemHeight;
    const finalPos = targetPosition + extraSpins;

    reel.style.transition = `transform ${1.5 + idx * 0.4}s cubic-bezier(0.17, 0.67, 0.35, 1)`;
    reel.style.transform = `translateY(-${finalPos}px)`;

    results[idx] = words[targetIndex];

    if (idx === 2) {
      setTimeout(() => {
        isSpinning = false;
        spinBtn.disabled = false;
        const result = results.join(' ');
        const tweetText = encodeURIComponent(`Wasabi Wisdom says: "${result}" -- $WASABI on Solana. Stay spicy. https://x.com/wasabicheesesol`);
        shareBtn.href = `https://twitter.com/intent/tweet?text=${tweetText}`;
        shareBtn.classList.remove('hidden');
      }, (1.5 + idx * 0.4) * 1000 + 300);
    }
  });
}
