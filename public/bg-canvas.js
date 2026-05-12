const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let W, H;
const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
resize();
window.addEventListener('resize', resize);

// Water line at 65%
const WL = () => H * 0.65;

class InkDrop {
  constructor(randomY) {
    this.reset();
    if (randomY) this.y = Math.random() * H;
  }
  reset() {
    this.x = W * 0.1 + Math.random() * W * 0.8;
    this.y = Math.random() * H * 0.55; // spawn in top black zone (0-55%)
    this.vy = 0.6 + Math.random() * 1.4;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.r = 3 + Math.random() * 7;
    this.alpha = 0.85 + Math.random() * 0.15;
    this.state = 'falling';
    this.bloomR = this.r;
    this.bloomAlpha = this.alpha;
    this.tendrils = [];
  }
  update() {
    if (this.state === 'falling') {
      this.vy += 0.04;
      this.y += this.vy;
      this.x += this.vx;
      if (this.y > WL()) {
        this.state = 'blooming';
        const count = 5 + Math.floor(Math.random() * 6);
        for (let i = 0; i < count; i++) {
          const angle = Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 1.4;
          const speed = 0.5 + Math.random() * 2.5;
          this.tendrils.push({
            x: this.x, y: this.y,
            vx: Math.cos(angle) * speed,
            vy: Math.abs(Math.sin(angle)) * speed + 0.3,
            r: this.r * (0.25 + Math.random() * 0.5),
            alpha: this.bloomAlpha * 0.9,
            life: 1.0,
            decay: 0.006 + Math.random() * 0.006,
          });
        }
      }
    }
    if (this.state === 'blooming') {
      this.bloomR += 0.6 + this.bloomR * 0.02;
      this.bloomAlpha *= 0.975;
      for (const t of this.tendrils) {
        t.x += t.vx; t.y += t.vy;
        t.vx += (Math.random() - 0.5) * 0.18;
        t.vy += 0.015;
        t.vx *= 0.97; t.vy *= 0.97;
        t.r += 0.25;
        t.alpha *= 0.972;
        t.life -= t.decay;
      }
      this.tendrils = this.tendrils.filter(t => t.life > 0);
      if (this.bloomAlpha < 0.004 && this.tendrils.length === 0) this.state = 'dead';
    }
  }
  draw() {
    if (this.state === 'falling') {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(Math.atan2(this.vy, this.vx) - Math.PI / 2);
      const g = ctx.createRadialGradient(0, -this.r * 0.2, 0, 0, this.r * 0.3, this.r * 1.6);
      g.addColorStop(0, `rgba(0,0,0,${this.alpha})`);
      g.addColorStop(0.5, `rgba(5,5,5,${this.alpha * 0.7})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.ellipse(0, 0, this.r * 0.65, this.r * 1.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
    }
    if (this.state === 'blooming') {
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.bloomR);
      g.addColorStop(0, `rgba(0,0,0,${this.bloomAlpha * 0.85})`);
      g.addColorStop(0.35, `rgba(10,10,10,${this.bloomAlpha * 0.45})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.bloomR, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      for (const t of this.tendrils) {
        const tg = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.r * 4);
        tg.addColorStop(0, `rgba(0,0,0,${t.alpha * t.life * 0.9})`);
        tg.addColorStop(0.4, `rgba(15,15,15,${t.alpha * t.life * 0.35})`);
        tg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = tg; ctx.fill();
      }
    }
  }
}

const drops = Array.from({ length: 22 }, (_, i) => new InkDrop(true));
let ripples = [];

const waterParts = Array.from({ length: 200 }, () => ({
  x: Math.random(), y: 0.65 + Math.random() * 0.35,
  r: 0.6 + Math.random() * 2.5,
  alpha: 0.04 + Math.random() * 0.09,
  dx: (Math.random() - 0.5) * 0.0005,
  dy: (Math.random() - 0.5) * 0.0003,
}));

const render = () => {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, W, H);

  // Background: 65% black, 35% water
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0,    '#000000');
  bg.addColorStop(0.60, '#000000');  // solid black until 60%
  bg.addColorStop(0.67, '#0d1015');  // subtle transition
  bg.addColorStop(0.72, '#1a2030');  // murky water
  bg.addColorStop(0.82, '#1e2535');
  bg.addColorStop(0.92, '#222a3a');
  bg.addColorStop(1,    '#252e40');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Water shimmer overlay
  const shimmer = ctx.createLinearGradient(0, H * 0.63, 0, H * 0.78);
  shimmer.addColorStop(0, 'rgba(180,200,255,0)');
  shimmer.addColorStop(0.4, 'rgba(150,180,220,0.04)');
  shimmer.addColorStop(0.7, 'rgba(120,160,210,0.07)');
  shimmer.addColorStop(1, 'rgba(100,140,200,0)');
  ctx.fillStyle = shimmer;
  ctx.fillRect(0, H * 0.63, W, H * 0.15);

  // Water texture particles
  for (const p of waterParts) {
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
    if (p.y < 0.65) p.y = 1; if (p.y > 1) p.y = 0.65;
    const brightness = 55 + Math.floor(p.y * 50);
    ctx.beginPath();
    ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${brightness},${brightness + 15},${brightness + 30},${p.alpha})`;
    ctx.fill();
  }

  // Boundary surface line at 65%
  const surfaceGrad = ctx.createLinearGradient(0, H * 0.62, 0, H * 0.70);
  surfaceGrad.addColorStop(0, 'rgba(0,0,0,0)');
  surfaceGrad.addColorStop(0.45, 'rgba(0,0,0,0.5)');
  surfaceGrad.addColorStop(0.55, 'rgba(0,0,0,0.25)');
  surfaceGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = surfaceGrad;
  ctx.fillRect(0, H * 0.62, W, H * 0.08);

  // Drops
  for (const d of drops) {
    d.update(); d.draw();
    if (d.state === 'dead') {
      ripples.push({ x: d.x, y: d.y, r: 0, alpha: 0.3, maxR: 30 + Math.random() * 70 });
      d.reset();
    }
  }

  // Ripples
  ripples = ripples.filter(r => r.alpha > 0.005 && r.r < r.maxR);
  for (const r of ripples) {
    r.r += 0.9; r.alpha *= 0.962;
    ctx.beginPath();
    ctx.ellipse(r.x, r.y, r.r, r.r * 0.28, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(100,130,180,${r.alpha})`;
    ctx.lineWidth = 0.9;
    ctx.stroke();
  }

  if (Math.random() < 0.025) {
    ripples.push({ x: Math.random() * W, y: WL() + Math.random() * H * 0.08, r: 0, alpha: 0.12, maxR: 20 + Math.random() * 40 });
  }
};
render();
