import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Intro from './pages/Intro';
import Battle from './pages/Battle';
import { useStores } from './stores/hooks/hooks';

function App() {
  const { uiStore } = useStores();

  useEffect(() => {
    uiStore.initData();
  }, []);

  return (
    <React.Fragment>
        <BrowserRouter>
            <Routes>
              <Route path='/battle' element={<Battle/>} />
              <Route path='*' element={<Intro/>} />
            </Routes>
        </BrowserRouter>
  </React.Fragment>
  );
}

export default App;
