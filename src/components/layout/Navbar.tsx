import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import { Rabbit, Beaker, Layers, Mountain, Swords, Users, Globe } from 'lucide-react';

const Navbar: React.FC = () => {
  const { state } = useGame();
  
  return (
    <nav className="bg-purple-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Rabbit size={32} className="text-yellow-400" />
            <span className="text-2xl font-bold">DeChongus</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="bg-purple-800 px-3 py-1 rounded-full">
              <span className="font-bold">{Math.floor(state.player.chongJuice)}</span> ChongJuice
            </div>
            <div className="bg-purple-800 px-3 py-1 rounded-full">
              <span className="font-bold">{state.player.chongJuicePerSecond}</span>/s
            </div>
          </div>
        </div>
        
        <div className="flex space-x-1 py-2 overflow-x-auto">
          <NavLink to="/idle" icon={<Beaker size={18} />} label="Idle Game" />
          <NavLink to="/collection" icon={<Layers size={18} />} label="Collection" />
          <NavLink to="/expeditions" icon={<Mountain size={18} />} label="Expeditions" />
          <NavLink to="/arena" icon={<Swords size={18} />} label="Arena" />
          <NavLink to="/community" icon={<Users size={18} />} label="Community" />
          <NavLink to="/map" icon={<Globe size={18} />} label="Galactic Map" />
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  return (
    <Link 
      to={to} 
      className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Navbar;