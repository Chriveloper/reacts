import React from 'react';
import GameObject from './GameObject';

interface PlayerProps {
    x: number;
    y: number;
    radius: number;
    color: string;
    hp: number;
}

const Player: React.FC<PlayerProps> = ({ x, y, radius, color, hp }) => {
    return (
        <GameObject x={x} y={y} radius={radius} color={color} hp={hp} />
    );
}

export default Player;