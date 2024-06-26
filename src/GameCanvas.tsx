import React, { useRef, useEffect, useState } from 'react';
import { GameObject } from './GameObject';
import monsterImageSrc from './assets/monster.png'; // Adjust the path to your monster image

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const [fps, setFps] = useState(0);
  const [gameObjects, setGameObjects] = useState<GameObject[]>([]);

  const addMonster = () => {
    const newMonster = new GameObject(
      Math.random() * 800,
      Math.random() * 600,
      20,
      monsterImageSrc,
      Math.random() * 100 - 50,
      Math.random() * 100 - 50
    );
    setGameObjects([...gameObjects, newMonster]);
  };

  useEffect(() => {
    addMonster(); // Add an initial monster
  }, []);

  const checkCollisions = () => {
    for (let i = 0; i < gameObjects.length; i++) {
      for (let j = i + 1; j < gameObjects.length; j++) {
        if (gameObjects[i].isCollidingWith(gameObjects[j])) {
          // Handle collision here
          // For now, just log it
          console.log(`Collision detected between objects ${i} and ${j}`);

          

          




        }
      }
    }
  };

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
            obj.move(deltaTime, context); // Pass ctx to move method
          });
          checkCollisions(); // Check for collisions after moving objects
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