import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import IdleGame from './pages/IdleGame';
import Collection from './pages/Collection';
import Expeditions from './pages/Expeditions';
import Arena from './pages/Arena';
import Community from './pages/Community';
import GalacticMap from './pages/GalacticMap';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/idle" element={<IdleGame />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/expeditions" element={<Expeditions />} />
              <Route path="/arena" element={<Arena />} />
              <Route path="/community" element={<Community />} />
              <Route path="/map" element={<GalacticMap />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;