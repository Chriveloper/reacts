import React, { useRef, useEffect } from 'react';

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Game variables
    const player = { x: 50, y: 50, width: 20, height: 20, color: 'blue' };

    const drawPlayer = () => {
      context.fillStyle = player.color;
      context.fillRect(player.x, player.y, player.width, player.height);
    };

    const gameLoop = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawPlayer();
      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />;
};

export default GameCanvas;
