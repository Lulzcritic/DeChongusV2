import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Mountain, Clock, Award, Layers, AlertTriangle } from 'lucide-react';

const Expeditions: React.FC = () => {
  const { state, dispatch } = useGame();
  const [selectedExpedition, setSelectedExpedition] = useState(state.expeditions.available[0] || null);
  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
  
  const handleStartExpedition = () => {
    if (selectedExpedition && selectedTeam.length > 0) {
      dispatch({
        type: 'START_EXPEDITION',
        payload: {
          expeditionId: selectedExpedition.id,
          team: selectedTeam,
        },
      });
      setSelectedTeam([]);
    }
  };
  
  const handleCompleteExpedition = (expeditionId: string) => {
    dispatch({
      type: 'COMPLETE_EXPEDITION',
      payload: {
        activeExpeditionId: expeditionId,
      },
    });
  };
  
  const toggleChongusSelection = (chongusId: string) => {
    if (selectedTeam.includes(chongusId)) {
      setSelectedTeam(selectedTeam.filter(id => id !== chongusId));
    } else if (selectedTeam.length < 3) {
      setSelectedTeam([...selectedTeam, chongusId]);
    }
  };
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const getExpeditionTimeLeft = (expedition: { startTime: number; endTime: number }): string => {
    const now = Date.now();
    if (now >= expedition.endTime) {
      return 'Complete';
    }
    
    const timeLeftMs = expedition.endTime - now;
    const timeLeftSeconds = Math.ceil(timeLeftMs / 1000);
    return formatTime(timeLeftSeconds);
  };
  
  const isExpeditionComplete = (expedition: { startTime: number; endTime: number }): boolean => {
    return Date.now() >= expedition.endTime;
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Mountain size={24} className="text-orange-400 mr-2" />
        <h1 className="text-3xl font-bold">Expeditions</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">Available Expeditions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {state.expeditions.available.map((expedition) => (
                <div
                  key={expedition.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedExpedition?.id === expedition.id
                      ? 'bg-orange-900 border border-orange-500'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedExpedition(expedition)}
                >
                  <h3 className="text-lg font-bold mb-2">{expedition.name}</h3>
                  
                  <div className="flex items-center text-sm text-gray-300 mb-2">
                    <Clock size={14} className="mr-1" />
                    <span>Duration: {formatTime(expedition.duration)}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-300 mb-2">
                    <AlertTriangle size={14} className="mr-1" />
                    <span>Difficulty: {Array(expedition.difficulty).fill('★').join('')}</span>
                  </div>
                  
                  <div className="text-sm font-bold">Rewards:</div>
                  <div className="text-sm text-gray-300">
                    • {expedition.rewards.chongJuice} ChongJuice
                  </div>
                  <div className="text-sm text-gray-300">
                    • {expedition.rewards.experience} Experience
                  </div>
                  <div className="text-sm text-gray-300">
                    • {Math.round(expedition.rewards.itemChance * 100)}% chance for items
                  </div>
                </div>
              ))}
            </div>
            
            {selectedExpedition && (
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-3">Selected Expedition: {selectedExpedition.name}</h3>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-300 mb-2">
                    Select up to 3 Big Chongus for your expedition team:
                  </p>
                  
                  {state.collection.length === 0 ? (
                    <div className="bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-gray-400">You don't have any Big Chongus yet.</p>
                      <p className="text-gray-400 mt-1">Collect some in the Idle Game first!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {state.collection.map((chongus) => (
                        <div
                          key={chongus.id}
                          className={`p-2 rounded-lg cursor-pointer transition-colors ${
                            selectedTeam.includes(chongus.id)
                              ? 'bg-green-900 border border-green-500'
                              : 'bg-gray-800 hover:bg-gray-700'
                          }`}
                          onClick={() => toggleChongusSelection(chongus.id)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-bold text-sm">{chongus.name}</div>
                              <div className="text-xs text-gray-400">
                                Level {chongus.level} • {chongus.rarity}
                              </div>
                            </div>
                            <div className="text-xs">
                              <div className="flex items-center">
                                <span>Power: </span>
                                <span className="font-bold ml-1">
                                  {Object.values(chongus.stats).reduce((a, b) => a + b, 0)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleStartExpedition}
                  disabled={selectedTeam.length === 0}
                  className={`w-full py-3 px-4 rounded-lg font-bold ${
                    selectedTeam.length > 0
                      ? 'bg-orange-500 hover:bg-orange-600 text-black'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  } transition-colors`}
                >
                  Start Expedition with {selectedTeam.length} Big Chongus
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Clock size={20} className="text-blue-400 mr-2" />
              <h2 className="text-xl font-bold">Active Expeditions</h2>
            </div>
            
            {state.expeditions.active.length === 0 ? (
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <p className="text-gray-400">No active expeditions.</p>
                <p className="text-gray-400 mt-1">Start one to gather resources!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.expeditions.active.map((activeExpedition) => {
                  const expedition = state.expeditions.available.find(
                    (e) => e.id === activeExpedition.expeditionId
                  );
                  
                  if (!expedition) return null;
                  
                  const isComplete = isExpeditionComplete(activeExpedition);
                  
                  return (
                    <div key={activeExpedition.id} className="bg-gray-700 p-4 rounded-lg">
                      <h3 className="font-bold mb-2">{expedition.name}</h3>
                      
                      <div className="flex items-center text-sm text-gray-300 mb-2">
                        <Layers size={14} className="mr-1" />
                        <span>Team: {activeExpedition.team.length} Big Chongus</span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Progress:</span>
                          <span className={isComplete ? 'text-green-400' : 'text-blue-400'}>
                            {isComplete ? 'Complete!' : getExpeditionTimeLeft(activeExpedition)}
                          </span>
                        </div>
                        
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{
                              width: isComplete
                                ? '100%'
                                : `${
                                    ((Date.now() - activeExpedition.startTime) /
                                      (activeExpedition.endTime - activeExpedition.startTime)) *
                                    100
                                  }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      {isComplete && (
                        <button
                          onClick={() => handleCompleteExpedition(activeExpedition.id)}
                          className="w-full py-2 px-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-sm transition-colors flex items-center justify-center"
                        >
                          <Award size={16} className="mr-1" />
                          Collect Rewards
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expeditions;