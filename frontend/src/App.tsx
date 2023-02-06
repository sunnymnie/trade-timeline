import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Trades } from './features/trades/Trades'
import './App.css';

function App() {
  return (
    <div className="App">
      <Trades />
    </div>
  );
}

export default App;
