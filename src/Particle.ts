export default class Particle {
  public size = Math.random() * 15 + 1;
  private dx = Math.random() * 3 - 1.5;
  private dy = Math.random() * 3 - 1.5;
  private sizeDecay = 0.1;
  constructor(private x: number, private y: number, private color: string) {}

  update() {
    this.x += this.dx;
    this.y += this.dy;
    // constantly reduce size, never letting particle get to 0
    this.size -= this.size > 0.1 ? this.sizeDecay : 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
