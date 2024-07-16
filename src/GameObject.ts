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
    
    // Draw the hitbox as a circle
    ctx.beginPath(); // Start a new path for the circle
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Create a circle
    ctx.strokeStyle = 'red'; // Set the color of the circle
    ctx.stroke(); // Draw the circle
  
    // Calculate the aspect ratio of the image
    const aspectRatio = this.image.naturalWidth / this.image.naturalHeight;
    
    // Calculate the drawing dimensions while maintaining the aspect ratio
    let drawWidth = this.radius * 2;
    let drawHeight = drawWidth / aspectRatio;
    
    // If the calculated height is more than twice the radius (due to a very narrow aspect ratio),
    // adjust the width instead to maintain the aspect ratio without exceeding the object's size.
    if (drawHeight > this.radius * 2) {
      drawHeight = this.radius * 2;
      drawWidth = drawHeight * aspectRatio;
    }
    
    // Draw the image centered on the object's position
    ctx.drawImage(this.image, this.x - drawWidth / 2, this.y - drawHeight / 2, drawWidth, drawHeight);
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

  isCollidingWith(other: GameObject): boolean {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < this.radius + other.radius;
  }

  

}
