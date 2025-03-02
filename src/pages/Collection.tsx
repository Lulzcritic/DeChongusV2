import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Layers, Star, Heart, Sword, Shield, Zap, Sparkles } from 'lucide-react';

const Collection: React.FC = () => {
  const { state } = useGame();
  const [selectedChongus, setSelectedChongus] = useState(state.collection[0] || null);
  
  const rarityColors = {
    common: 'text-gray-400',
    uncommon: 'text-green-400',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    legendary: 'text-yellow-400',
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Layers size={24} className="text-green-400 mr-2" />
        <h1 className="text-3xl font-bold">Your Big Chongus Collection</h1>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Collection ({state.collection.length})</h2>
              <div className="text-sm text-gray-400">
                Sort by: <span className="text-white">Newest</span>
              </div>
            </div>
            
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {state.collection.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>Your collection is empty.</p>
                  <p className="mt-2">Collect your first Big Chongus in the Idle Game!</p>
                </div>
              ) : (
                state.collection.map((chongus) => (
                  <div
                    key={chongus.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedChongus?.id === chongus.id
                        ? 'bg-purple-900 border border-purple-500'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedChongus(chongus)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold">{chongus.name}</div>
                        <div className={`text-sm ${rarityColors[chongus.rarity]}`}>
                          {chongus.rarity.charAt(0).toUpperCase() + chongus.rarity.slice(1)}
                        </div>
                      </div>
                      <div className="text-sm">
                        <div>Level {chongus.level}</div>
                        <div className="flex items-center">
                          <Star size={12} className="text-yellow-400 mr-1" />
                          <span>
                            {Object.values(chongus.stats).reduce((a, b) => a + b, 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-2/3">
          {selectedChongus ? (
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <div className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                    <div 
                      className={`w-${selectedChongus.appearance.size}% h-${selectedChongus.appearance.size}% rounded-full bg-${selectedChongus.appearance.color}-500 flex items-center justify-center`}
                      style={{ 
                        width: `${selectedChongus.appearance.size}%`, 
                        height: `${selectedChongus.appearance.size}%`,
                        backgroundColor: getColorHex(selectedChongus.appearance.color)
                      }}
                    >
                      <Sparkles size={48} className="text-white opacity-50" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2">{selectedChongus.name}</h2>
                  <div className="flex items-center mb-4">
                    <div className={`text-sm font-bold ${rarityColors[selectedChongus.rarity]} mr-3`}>
                      {selectedChongus.rarity.toUpperCase()}
                    </div>
                    <div className="text-sm">
                      Level {selectedChongus.level}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Appearance</h3>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: getColorHex(selectedChongus.appearance.color) }}></div>
                        <div className="text-sm">Color: {selectedChongus.appearance.color}</div>
                      </div>
                      <div className="text-sm mb-2">Size: {selectedChongus.appearance.size}%</div>
                      <div className="text-sm">
                        Features: {selectedChongus.appearance.features.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg font-bold mb-3">Stats</h3>
                  <div className="space-y-3 mb-6">
                    <StatBar 
                      icon={<Heart size={16} className="text-red-400" />} 
                      name="Health" 
                      value={selectedChongus.stats.health} 
                      maxValue={500}
                      color="bg-red-500"
                    />
                    <StatBar 
                      icon={<Sword size={16} className="text-orange-400" />} 
                      name="Attack" 
                      value={selectedChongus.stats.attack} 
                      maxValue={200}
                      color="bg-orange-500"
                    />
                    <StatBar 
                      icon={<Shield size={16} className="text-blue-400" />} 
                      name="Defense" 
                      value={selectedChongus.stats.defense} 
                      maxValue={150}
                      color="bg-blue-500"
                    />
                    <StatBar 
                      icon={<Zap size={16} className="text-yellow-400" />} 
                      name="Speed" 
                      value={selectedChongus.stats.speed} 
                      maxValue={100}
                      color="bg-yellow-500"
                    />
                    <StatBar 
                      icon={<Sparkles size={16} className="text-purple-400" />} 
                      name="Special" 
                      value={selectedChongus.stats.special} 
                      maxValue={250}
                      color="bg-purple-500"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg font-bold transition-colors">
                      Train
                    </button>
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-lg font-bold transition-colors">
                      Evolve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center h-full">
              <div className="text-center py-12 text-gray-400">
                <Layers size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl">Select a Big Chongus to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface StatBarProps {
  icon: React.ReactNode;
  name: string;
  value: number;
  maxValue: number;
  color: string;
}

const StatBar: React.FC<StatBarProps> = ({ icon, name, value, maxValue, color }) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          {icon}
          <span className="ml-2 text-sm">{name}</span>
        </div>
        <span className="text-sm font-bold">{value}</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

// Helper function to get color hex values
function getColorHex(color: string): string {
  const colorMap: Record<string, string> = {
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#10b981',
    purple: '#8b5cf6',
    yellow: '#f59e0b',
    orange: '#f97316',
    pink: '#ec4899',
  };
  
  return colorMap[color] || '#6b7280';
}

export default Collection;