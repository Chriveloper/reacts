import { GameObject } from './GameObject';

export class Monster extends GameObject {
    constructor(x: number, y: number, radius: number, imageSrc: string, speedX: number, speedY: number) {
      super(x, y, radius, imageSrc, speedX, speedY);
    }
  
    // Additional behaviors specific to monsters can be added here
}