import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainComponent />} />
    </Routes>
  );
}

export default App;
