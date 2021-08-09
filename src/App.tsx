import React from 'react';
import logo from './logo.svg';
import './App.css';
import InputPaste from './components/InputPaste';
import ListPaste from './components/ListPaste';

function App():JSX.Element {
  return (
    <div>
      <InputPaste />
      <ListPaste />
    </div>
  );
}

export default App;
