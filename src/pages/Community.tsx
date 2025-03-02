import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Users, Calendar, Award, TrendingUp, Gift } from 'lucide-react';

const Community: React.FC = () => {
  const { state, dispatch } = useGame();
  const [contributionAmount, setContributionAmount] = useState(100);
  
  const handleContribute = () => {
    if (contributionAmount > 0 && state.player.chongJuice >= contributionAmount) {
      dispatch({
        type: 'CONTRIBUTE_TO_COMMUNITY',
        payload: { amount: contributionAmount },
      });
    }
  };
  
  // Calculate time remaining for the event
  const getTimeRemaining = () => {
    const now = Date.now();
    const timeLeft = Math.max(0, state.communityEvent.endTime - now);
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m`;
  };
  
  // Calculate progress percentage
  const progressPercentage = Math.min(
    100,
    (state.communityEvent.current / state.communityEvent.goal) * 100
  );
  
  // Mock past events
  const pastEvents = [
    {
      id: '1',
      title: 'Doge Coin Surge',
      description: 'Collect ChongJuice to celebrate Doge Coin reaching new heights!',
      goal: 8000,
      achieved: 9240,
      completed: true,
    },
    {
      id: '2',
      title: 'Distracted Boyfriend Meme Day',
      description: 'Contribute to the community pool for the classic meme anniversary.',
      goal: 5000,
      achieved: 4850,
      completed: false,
    },
    {
      id: '3',
      title: 'Stonks Only Go Up',
      description: 'Help the community reach the goal inspired by the Stonks meme.',
      goal: 7500,
      achieved: 8100,
      completed: true,
    },
  ];
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Users size={24} className="text-purple-400 mr-2" />
        <h1 className="text-3xl font-bold">Community Events</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <div className="flex items-center mb-4">
              <Calendar size={24} className="text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold">Current Event</h2>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                {state.communityEvent.title}
              </h3>
              
              <p className="text-gray-300 mb-4">{state.communityEvent.description}</p>
              
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-300">Progress:</div>
                <div className="text-sm font-bold">
                  {state.communityEvent.current} / {state.communityEvent.goal} ChongJuice
                </div>
              </div>
              
              <div className="h-4 bg-gray-800 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-purple-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center text-sm text-gray-300">
                  <Calendar size={14} className="mr-1" />
                  <span>Time remaining: {getTimeRemaining()}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-300">
                  <Users size={14} className="mr-1" />
                  <span>Contributors: 247</span>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <h4 className="font-bold mb-2 flex items-center">
                  <Gift size={16} className="text-purple-400 mr-1" />
                  Rewards (if goal is reached)
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-700 p-2 rounded-lg flex items-center">
                    <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center mr-2">
                      <Beaker size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="font-bold">{state.communityEvent.rewards.chongJuice}</div>
                      <div className="text-gray-400">ChongJuice</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-2 rounded-lg flex items-center">
                    <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center mr-2">
                      <Sparkles size={16} className="text-purple-400" />
                    </div>
                    <div>
                      <div className="font-bold">
                        {Math.round(state.communityEvent.rewards.rareChongusChance * 100)}%
                      </div>
                      <div className="text-gray-400">Rare Chongus Chance</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-2/3">
                  <input
                    type="range"
                    min="10"
                    max={Math.min(1000, Math.floor(state.player.chongJuice))}
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(Number(e.target.value))}
                    className="w-full"
                    disabled={state.player.chongJuice < 10}
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>10</span>
                    <span>{contributionAmount}</span>
                    <span>1000</span>
                  </div>
                </div>
                
                <button
                  onClick={handleContribute}
                  disabled={state.player.chongJuice < contributionAmount}
                  className={`w-full sm:w-1/3 py-3 px-4 rounded-lg font-bold ${
                    state.player.chongJuice >= contributionAmount
                      ? 'bg-purple-500 hover:bg-purple-600'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  } transition-colors`}
                >
                  Contribute
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Award size={24} className="text-yellow-400 mr-2" />
              <h2 className="text-2xl font-bold">Past Events</h2>
            </div>
            
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <div key={event.id} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <div
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        event.completed
                          ? 'bg-green-900 text-green-400'
                          : 'bg-red-900 text-red-400'
                      }`}
                    >
                      {event.completed ? 'COMPLETED' : 'FAILED'}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">{event.description}</p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-gray-400">Progress:</div>
                    <div className="text-xs font-bold">
                      {event.achieved} / {event.goal} ChongJuice
                    </div>
                  </div>
                  
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${event.completed ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(100, (event.achieved / event.goal) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <div className="flex items-center mb-4">
              <TrendingUp size={20} className="text-green-400 mr-2" />
              <h2 className="text-xl font-bold">Top Contributors</h2>
            </div>
            
            <div className="space-y-2">
              {[
                { name: 'ChongusFan2000', amount: 1250, rank: 1 },
                { name: 'MemeCollector', amount: 980, rank: 2 },
                { name: 'BigChungusLover', amount: 875, rank: 3 },
                { name: 'DeChongusKing', amount: 720, rank: 4 },
                { name: 'MemeQueen', amount: 650, rank: 5 },
              ].map((contributor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                        index === 0
                          ? 'bg-yellow-900 text-yellow-400'
                          : index === 1
                          ? 'bg-gray-600 text-gray-300'
                          : index === 2
                          ? 'bg-orange-900 text-orange-400'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {contributor.rank}
                    </div>
                    <div className="font-bold">{contributor.name}</div>
                  </div>
                  <div className="font-bold">{contributor.amount}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Your Contribution</h2>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-purple-400">
                  {state.communityEvent.current > 0 ? 0 : 0}
                </div>
                <div className="text-sm text-gray-300">Your contribution this week</div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Rank:</span>
                  <span className="font-bold">N/A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Percentile:</span>
                  <span className="font-bold">0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Contributed:</span>
                  <span className="font-bold">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import these components at the top of the file
const Beaker = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4.5 3h15"></path>
    <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"></path>
    <path d="M6 14h12"></path>
  </svg>
);

const Sparkles = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path>
  </svg>
);

export default Community;