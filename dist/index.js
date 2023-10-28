// src/Particle.ts
class Particle {
  x;
  y;
  color;
  size = Math.random() * 15 + 1;
  dx = Math.random() * 3 - 1.5;
  dy = Math.random() * 3 - 1.5;
  sizeDecay = 0.1;
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.size -= this.size > 0.1 ? this.sizeDecay : 0;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// src/ParticleManager.ts
class ParticleManager {
  particleCount;
  ctx;
  particles = [];
  hue = 0;
  mouseX = null;
  mouseY = null;
  lastFrameTime = performance.now();
  constructor(particleCount, ctx) {
    this.particleCount = particleCount;
    this.ctx = ctx;
    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.addParticles();
    });
  }
  addParticles() {
    if (this.mouseX === null || this.mouseY === null)
      return;
    for (let i = 0;i < this.particleCount; i++) {
      this.particles.push(new Particle(this.mouseX, this.mouseY, `hsl(${this.hue}, 100%, 50%)`));
    }
  }
  update() {
    this.hue += 1;
    this.particles.forEach((particle) => particle.update());
    this.particles = this.particles.filter((particle) => particle.size > 0.1);
  }
  draw() {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.restore();
    this.particles.forEach((particle) => particle.draw(this.ctx));
  }
  loop(timestamp = 0) {
    this.update();
    this.draw();
    const deltaTime = timestamp - this.lastFrameTime;
    if (deltaTime > 16.666666666666668) {
      if (this.mouseX !== null && this.mouseY !== null) {
        this.addParticles();
      }
    }
    this.lastFrameTime = timestamp;
    requestAnimationFrame((t) => this.loop(t));
  }
}

// src/index.ts
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
var particleManager = new ParticleManager(10, ctx);
particleManager.loop();
