import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import { Board } from '../Board/Board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Board/>
      </header>
    </div>
  );
}

export default App;
