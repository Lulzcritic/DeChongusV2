import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Swords, Shield, Trophy, User, Zap } from 'lucide-react';

const Arena: React.FC = () => {
  const { state } = useGame();
  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
  
  const toggleChongusSelection = (chongusId: string) => {
    if (selectedTeam.includes(chongusId)) {
      setSelectedTeam(selectedTeam.filter(id => id !== chongusId));
    } else if (selectedTeam.length < 3) {
      setSelectedTeam([...selectedTeam, chongusId]);
    }
  };
  
  // Mock opponents
  const opponents = [
    {
      id: '1',
      name: 'ChongusMaster42',
      level: 5,
      rank: 'Bronze',
      teamPower: 450,
      winRate: '58%',
    },
    {
      id: '2',
      name: 'BigChungus_Fan',
      level: 8,
      rank: 'Silver',
      teamPower: 720,
      winRate: '62%',
    },
    {
      id: '3',
      name: 'MemeCollector',
      level: 12,
      rank: 'Gold',
      teamPower: 1050,
      winRate: '71%',
    },
  ];
  
  const calculateTeamPower = () => {
    return selectedTeam.reduce((total, chongusId) => {
      const chongus = state.collection.find(c => c.id === chongusId);
      if (chongus) {
        return total + Object.values(chongus.stats).reduce((a, b) => a + b, 0);
      }
      return total;
    }, 0);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Swords size={24} className="text-red-400 mr-2" />
        <h1 className="text-3xl font-bold">Battle Arena</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">Find Opponents</h2>
            
            <div className="space-y-4">
              {opponents.map((opponent) => (
                <div key={opponent.id} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="text-lg font-bold">{opponent.name}</h3>
                      <div className="flex items-center text-sm text-gray-300">
                        <User size={14} className="mr-1" />
                        <span>Level {opponent.level}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-bold ${getRankColor(opponent.rank)}`}>
                        {opponent.rank}
                      </div>
                      <div className="text-sm text-gray-300">Rank</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="bg-gray-800 p-2 rounded-lg text-center">
                      <div className="text-lg font-bold">{opponent.teamPower}</div>
                      <div className="text-xs text-gray-400">Team Power</div>
                    </div>
                    <div className="bg-gray-800 p-2 rounded-lg text-center">
                      <div className="text-lg font-bold">{opponent.winRate}</div>
                      <div className="text-xs text-gray-400">Win Rate</div>
                    </div>
                  </div>
                  
                  <button
                    disabled={selectedTeam.length === 0}
                    className={`w-full py-2 px-3 rounded-lg font-bold text-sm ${
                      selectedTeam.length > 0
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    } transition-colors flex items-center justify-center`}
                  >
                    <Swords size={16} className="mr-1" />
                    Battle
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Trophy size={20} className="text-yellow-400 mr-2" />
              <h2 className="text-xl font-bold">Leaderboard</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm">
                    <th className="pb-2">Rank</th>
                    <th className="pb-2">Player</th>
                    <th className="pb-2">Rating</th>
                    <th className="pb-2">Wins</th>
                    <th className="pb-2">Losses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-700">
                    <td className="py-3 font-bold text-yellow-400">1</td>
                    <td>ChongusMaster99</td>
                    <td>1850</td>
                    <td>124</td>
                    <td>32</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-3 font-bold text-gray-300">2</td>
                    <td>UltraChongus</td>
                    <td>1720</td>
                    <td>98</td>
                    <td>41</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-3 font-bold text-orange-400">3</td>
                    <td>MemeKing</td>
                    <td>1685</td>
                    <td>112</td>
                    <td>58</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-3">4</td>
                    <td>ChongusFan2000</td>
                    <td>1590</td>
                    <td>87</td>
                    <td>52</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-3">5</td>
                    <td>BigChungusLover</td>
                    <td>1540</td>
                    <td>76</td>
                    <td>49</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2">
          <div className="bg-gray-800 p-6 rounded-lg sticky top-4">
            <h2 className="text-xl font-bold mb-4">Your Battle Team</h2>
            
            {state.collection.length === 0 ? (
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <p className="text-gray-400">You don't have any Big Chongus yet.</p>
                <p className="text-gray-400 mt-1">Collect some in the Idle Game first!</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-sm text-gray-300 mb-2">
                    Select up to 3 Big Chongus for your battle team:
                  </p>
                  
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {state.collection.map((chongus) => (
                      <div
                        key={chongus.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedTeam.includes(chongus.id)
                            ? 'bg-red-900 border border-red-500'
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                        onClick={() => toggleChongusSelection(chongus.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-bold">{chongus.name}</div>
                            <div className="text-xs text-gray-400">
                              Level {chongus.level} • {chongus.rarity}
                            </div>
                          </div>
                          <div className="text-sm">
                            <div className="flex items-center">
                              <Zap size={14} className="text-yellow-400 mr-1" />
                              <span>
                                {Object.values(chongus.stats).reduce((a, b) => a + b, 0)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold">Team Power</div>
                    <div className="text-xl font-bold text-yellow-400">{calculateTeamPower()}</div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-300">
                    <div>Selected</div>
                    <div>{selectedTeam.length}/3 Big Chongus</div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Trophy size={18} className="text-yellow-400 mr-2" />
                    <div className="font-bold">Your Stats</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Rank:</span>
                      <span className="font-bold text-bronze-400">Bronze</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Rating:</span>
                      <span className="font-bold">1200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Wins:</span>
                      <span className="font-bold">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Losses:</span>
                      <span className="font-bold">0</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get rank color
function getRankColor(rank: string): string {
  switch (rank) {
    case 'Bronze':
      return 'text-orange-400';
    case 'Silver':
      return 'text-gray-300';
    case 'Gold':
      return 'text-yellow-400';
    case 'Platinum':
      return 'text-blue-400';
    case 'Diamond':
      return 'text-purple-400';
    default:
      return 'text-white';
  }
}

export default Arena;