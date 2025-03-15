import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Connect from './pages/Connect';
import Particles from './components/Particles';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Particles />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;