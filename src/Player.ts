import { GameObject } from './GameObject';

export class Player extends GameObject {
  keys: { [key: string]: boolean };

  constructor(x: number, y: number, radius: number, imageSrc: string, speedX: number, speedY: number) {
    super(x, y, radius, imageSrc, speedX, speedY);
    this.keys = {};
  }

  handleKeyDown(event: KeyboardEvent) {
    this.keys[event.key] = true;
  }

  handleKeyUp(event: KeyboardEvent) {
    this.keys[event.key] = false;
  }

// In Player.ts
update(deltaTime: number) {
  if (this.keys['ArrowUp'] || this.keys['w']) {
    this.y -= this.speedY * deltaTime;
  }
  if (this.keys['ArrowDown'] || this.keys['s']) {
    this.y += this.speedY * deltaTime;
  }
  if (this.keys['ArrowLeft'] || this.keys['a']) {
    this.x -= this.speedX * deltaTime;
  }
  if (this.keys['ArrowRight'] || this.keys['d']) {
    this.x += this.speedX * deltaTime;
  }
}

}
