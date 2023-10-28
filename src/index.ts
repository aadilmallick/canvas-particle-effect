import ParticleManager from "./ParticleManager";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// 1. set canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 2. Add resize event listener
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particleManager = new ParticleManager(10, ctx);
particleManager.loop();
