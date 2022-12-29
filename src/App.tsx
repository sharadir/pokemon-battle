import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Intro from './pages/Intro';
import { useStores } from './stores/hooks/hooks';

function App() {
  const { uiStore } = useStores();

  useEffect(() => {
    uiStore.initData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
       <Intro/>
      </header>
    </div>
  );
}

export default App;
