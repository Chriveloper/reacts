import React, { useState } from 'react';
import './App.css';
import Greeting from './Greeting';
import GameCanvas from './GameCanvas';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <Greeting name="Vite + React" />
      <p>Gierig {count}</p>
      <img src={reactLogo} className="App-logo" alt="react logo" />
      <img src={viteLogo} className="App-logo" alt="vite logo" />
      <button onClick={() => setCount(count + 1)}>Golum</button>
      <GameCanvas />
    </div>
  );
}

export default App;
