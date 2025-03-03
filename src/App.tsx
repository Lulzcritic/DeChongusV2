import React from 'react';
import { supabase } from './supabase';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import IdleGame from './pages/IdleGame';
import Collection from './pages/Collection';
import Expeditions from './pages/Expeditions';
import Arena from './pages/Arena';
import Community from './pages/Community';
import GalacticMap from './pages/GalacticMap';
import Login from './pages/Login';
import Register from './pages/Register';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const session = supabase.auth.getSession();

  if (!session) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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