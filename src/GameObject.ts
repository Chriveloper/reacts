export class GameObject {
  x: number;
  y: number;
  radius: number;
  image: HTMLImageElement;
  speedX: number;
  speedY: number;

  constructor(x: number, y: number, radius: number, imageSrc: string, speedX: number, speedY: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.image = new Image();
    this.image.src = imageSrc;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }

  move(deltaTime: number, ctx: CanvasRenderingContext2D) {
    this.x += this.speedX * deltaTime;
    this.y += this.speedY * deltaTime;

    // Simple boundary check (wrap around)
    if (this.x - this.radius > ctx.canvas.width) this.x = -this.radius;
    if (this.x + this.radius < 0) this.x = ctx.canvas.width + this.radius;
    if (this.y - this.radius > ctx.canvas.height) this.y = -this.radius;
    if (this.y + this.radius < 0) this.y = ctx.canvas.height + this.radius;
  }
}
