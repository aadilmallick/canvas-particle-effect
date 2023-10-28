import Particle from "./Particle";

export default class ParticleManager {
  private particles: Particle[] = [];
  private hue = 0;
  private mouseX: number | null = null;
  private mouseY: number | null = null;
  private lastFrameTime = performance.now();

  constructor(
    private particleCount: number,
    private ctx: CanvasRenderingContext2D
  ) {
    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.addParticles();
    });
  }

  private addParticles() {
    if (this.mouseX === null || this.mouseY === null) return;
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(
        new Particle(this.mouseX, this.mouseY, `hsl(${this.hue}, 100%, 50%)`)
      );
    }
  }

  private update() {
    this.hue += 1;
    this.particles.forEach((particle) => particle.update());
    this.particles = this.particles.filter((particle) => particle.size > 0.1);
  }

  private draw() {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.restore();
    this.particles.forEach((particle) => particle.draw(this.ctx));
  }

  public loop(timestamp: number = 0) {
    this.update();
    this.draw();

    const deltaTime = timestamp - this.lastFrameTime;
    // throttle particle creation to 60fps
    if (deltaTime > 1000 / 60) {
      if (this.mouseX !== null && this.mouseY !== null) {
        this.addParticles();
      }
    }
    this.lastFrameTime = timestamp;

    requestAnimationFrame((t) => this.loop(t));
  }
}
