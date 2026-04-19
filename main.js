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
  });
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
