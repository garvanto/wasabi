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
    mascot.style.animation = '';
    msg.style.opacity = '0';
    meltCleanupTimeout = setTimeout(() => { msg.textContent = ''; msg.style.opacity = '1'; }, 500);
  }, 3000);
}
updateSpicyMeter();

const scovTiers = [
  {
    min: 3, max: 4,
    scoville: '100,000',
    tier: 'MILD SAUCE ENJOYER',
    desc: 'You check prices once a week. You sleep well. Statistically you are winning but you will never admit it.',
    tweet: 'I scored 100,000 Scoville on the $WASABI Spicy Test. Mild Sauce Enjoyer tier. Apparently I am built different (mild). Can you beat me?',
  },
  {
    min: 5, max: 5,
    scoville: '500,000',
    tier: 'SRIRACHA DEGEN',
    desc: 'You know what a chart is. You use the word "accumulate" unironically. Mid-tier spicy — and you know it.',
    tweet: 'I scored 500,000 Scoville on the $WASABI Spicy Test. Sriracha Degen tier. Spicier than most. Think you can handle it?',
  },
  {
    min: 6, max: 7,
    scoville: '1,000,000',
    tier: 'GHOST PEPPER TRADER',
    desc: 'Your portfolio has been rekt at least twice and you came back stronger. Pain is your fuel. Wasabi is your god.',
    tweet: 'I scored 1,000,000 Scoville on the $WASABI Spicy Test. Ghost Pepper Trader tier. Most people cannot handle this level. Prove me wrong.',
  },
  {
    min: 8, max: 9,
    scoville: '2,200,000',
    tier: 'PURE CAPSAICIN',
    desc: 'You do not have a risk management strategy. You ARE the risk. $WASABI did not find you — you found it first.',
    tweet: 'I scored 2,200,000 Scoville on the $WASABI Spicy Test. PURE CAPSAICIN tier. I am untouchable. I dare you to try.',
  },
];

let quizScore = 0;
let currentQ = 0;

document.querySelectorAll('.q-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const score = parseInt(btn.dataset.score, 10);
    quizScore += score;

    btn.classList.add('selected');
    btn.closest('.quiz-question').querySelectorAll('.q-btn').forEach(b => { b.disabled = true; });

    document.querySelector(`.progress-dot[data-dot="${currentQ}"]`).classList.replace('active', 'done');
    currentQ++;

    if (currentQ < 3) {
      setTimeout(() => {
        document.querySelector(`.quiz-question[data-q="${currentQ - 1}"]`).classList.remove('active');
        const next = document.querySelector(`.quiz-question[data-q="${currentQ}"]`);
        next.classList.add('active');
        document.querySelector(`.progress-dot[data-dot="${currentQ}"]`).classList.add('active');
      }, 340);
    } else {
      setTimeout(showScovilleResult, 400);
    }
  });
});

function showScovilleResult() {
  const tier = scovTiers.find(t => quizScore >= t.min && quizScore <= t.max);
  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('quiz-progress').classList.add('hidden');

  const result = document.getElementById('scoville-result');
  document.getElementById('result-scoville-num').textContent = tier.scoville;
  document.getElementById('result-tier').textContent = tier.tier;
  document.getElementById('result-desc').textContent = tier.desc;

  const tweetText = encodeURIComponent(`${tier.tweet} $WASABI https://x.com/wasabicheesesol`);
  document.getElementById('scoville-share-btn').href = `https://twitter.com/intent/tweet?text=${tweetText}`;

  result.classList.remove('hidden');

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const x = window.innerWidth / 2 + (Math.random() - 0.5) * 600;
      const y = window.innerHeight * 0.6 + (Math.random() - 0.5) * 200;
      particles.push(new Particle(x, y));
    }, i * 20);
  }
}

function retakeQuiz() {
  quizScore = 0;
  currentQ = 0;

  document.querySelectorAll('.quiz-question').forEach((q, i) => {
    q.classList.toggle('active', i === 0);
    q.querySelectorAll('.q-btn').forEach(b => { b.disabled = false; b.classList.remove('selected'); });
  });
  document.querySelectorAll('.progress-dot').forEach((d, i) => {
    d.className = 'progress-dot' + (i === 0 ? ' active' : '');
  });

  document.getElementById('scoville-result').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');
  document.getElementById('quiz-progress').classList.remove('hidden');
}
