import React from 'react';
import { Link } from 'react-router-dom';
import { Rabbit, Beaker, Layers, Mountain, Swords, Users, Globe } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

const Home: React.FC = () => {
  const { state } = useGame();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Rabbit size={80} className="text-yellow-400" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-yellow-400">DeChongus</h1>
        <p className="text-xl text-gray-300 mb-8">
          Collect, train, and battle with your Big Chongus in this multiplayer idle game!
        </p>
        <div className="bg-purple-800 inline-block px-6 py-3 rounded-lg">
          <span className="text-2xl font-bold">{Math.floor(state.player.chongJuice)}</span> ChongJuice
          <span className="text-gray-300 ml-2">({state.player.chongJuicePerSecond}/s)</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GameModeCard 
          to="/idle"
          icon={<Beaker size={40} className="text-blue-400" />}
          title="Idle Game"
          description="Collect ChongJuice and buy upgrades to produce more automatically."
          color="bg-blue-900"
        />
        
        <GameModeCard 
          to="/collection"
          icon={<Layers size={40} className="text-green-400" />}
          title="Collection"
          description="View and manage your collection of Big Chongus with unique stats and appearances."
          color="bg-green-900"
        />
        
        <GameModeCard 
          to="/expeditions"
          icon={<Mountain size={40} className="text-orange-400" />}
          title="Expeditions"
          description="Send your Big Chongus on expeditions to gather resources and items."
          color="bg-orange-900"
        />
        
        <GameModeCard 
          to="/arena"
          icon={<Swords size={40} className="text-red-400" />}
          title="Arena"
          description="Battle against other players' Big Chongus teams in PvP combat."
          color="bg-red-900"
        />
        
        <GameModeCard 
          to="/community"
          icon={<Users size={40} className="text-purple-400" />}
          title="Community Events"
          description="Participate in weekly community events based on real memes from Twitter."
          color="bg-purple-900"
        />
        
        <GameModeCard 
          to="/map"
          icon={<Globe size={40} className="text-teal-400" />}
          title="Galactic Map"
          description="Explore and conquer planets in a shared universe with all players."
          color="bg-teal-900"
        />
      </div>
      
      <div className="mt-12 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Current Community Event</h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h3 className="text-xl font-semibold text-yellow-400">{state.communityEvent.title}</h3>
            <p className="text-gray-300">{state.communityEvent.description}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-gray-700 h-4 w-64 rounded-full overflow-hidden">
              <div 
                className="bg-yellow-400 h-full" 
                style={{ width: `${(state.communityEvent.current / state.communityEvent.goal) * 100}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-300 mt-1">
              {state.communityEvent.current} / {state.communityEvent.goal} ChongJuice
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface GameModeCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const GameModeCard: React.FC<GameModeCardProps> = ({ to, icon, title, description, color }) => {
  return (
    <Link to={to} className={`${color} p-6 rounded-lg hover:opacity-90 transition-opacity`}>
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-xl font-bold ml-3">{title}</h2>
      </div>
      <p className="text-gray-300">{description}</p>
    </Link>
  );
};

export default Home;