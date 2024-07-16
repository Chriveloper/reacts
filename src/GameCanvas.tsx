import React, { useRef, useEffect, useState } from 'react';
import { GameObject } from './GameObject';
import { Player } from './Player'; // Import the Player class
import monsterImageSrc from './assets/monster.png'; // Adjust the path to your monster image
import playerImageSrc from './assets/player.png'; // Adjust the path to your player image

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const [fps, setFps] = useState(0);
  const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
  const playerRef = useRef<Player | null>(null);

  const addMonster = () => {
    const newMonster = new GameObject(
      Math.random() * 800,
      Math.random() * 600,
      20,
      monsterImageSrc,
      Math.random() * 100 - 50,
      Math.random() * 100 - 50
    );
    setGameObjects((prev) => [...prev, newMonster]);
  };

  useEffect(() => {
    const player = new Player(400, 300, 20, playerImageSrc, 200, 200); // Centered within the 800x600 canvas
    playerRef.current = player;
    setGameObjects((prev) => {
      console.log('Player added', player);
      return [...prev, player];
    });
    addMonster(); // Add an initial monster

    const handleKeyDown = (event: KeyboardEvent) => {
      player.handleKeyDown(event);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      player.handleKeyUp(event);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw all game objects
    gameObjects.forEach((obj) => {
      obj.draw(ctx);
    });

    // Draw the FPS
    ctx.fillStyle = 'red';
    ctx.font = '24px Arial';
    ctx.fillText(`FPS: ${fps.toFixed(1)}`, 10, 30);
  };

  const animate = (time: number) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = (time - previousTimeRef.current) / 1000;
      const currentFps = 1 / deltaTime;
      setFps(currentFps);

      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
          gameObjects.forEach((obj) => {
            if (obj instanceof Player) {
              obj.update(deltaTime); // Update the player's position based on keys pressed
            } else {
              obj.move(deltaTime, context); // Pass ctx to move method
            }
          });
          draw(context);
        }
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [gameObjects]);

  return (
    <>
      <canvas ref={canvasRef} width={800} height={600} />
      <button onClick={addMonster}>Add Monster</button>
    </>
  );
};

export default GameCanvas;
