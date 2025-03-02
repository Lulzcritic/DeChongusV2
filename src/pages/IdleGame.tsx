import React from 'react';
import { useGame } from '../contexts/GameContext';
import { Beaker, TrendingUp, Factory, Droplets } from 'lucide-react';

const IdleGame: React.FC = () => {
  const { state, dispatch } = useGame();
  
  const handleBuyUpgrade = (upgradeId: string) => {
    dispatch({ type: 'BUY_UPGRADE', payload: { upgradeId } });
  };
  
  const handleCollectChongus = () => {
    if (state.player.chongJuice >= 1000) {
      dispatch({ type: 'COLLECT_CHONGUS' });
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="w-full md:w-2/3">
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Beaker className="mr-2 text-blue-400" />
              ChongJuice Factory
            </h2>
            
            <div className="flex flex-col items-center mb-8">
              <div className="text-5xl font-bold text-blue-400 mb-2">
                {Math.floor(state.player.chongJuice)}
              </div>
              <div className="text-gray-300">
                ChongJuice ({state.player.chongJuicePerSecond}/second)
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UpgradeCard
                id="juicer"
                name="Basic Juicer"
                description="A simple machine that extracts ChongJuice."
                icon={<Droplets className="text-blue-400" />}
                level={state.upgrades.juicer.level}
                cost={state.upgrades.juicer.cost}
                effect={state.upgrades.juicer.effect}
                canAfford={state.player.chongJuice >= state.upgrades.juicer.cost}
                onBuy={() => handleBuyUpgrade('juicer')}
              />
              
              <UpgradeCard
                id="extractor"
                name="Advanced Extractor"
                description="More efficient at extracting ChongJuice."
                icon={<TrendingUp className="text-green-400" />}
                level={state.upgrades.extractor.level}
                cost={state.upgrades.extractor.cost}
                effect={state.upgrades.extractor.effect}
                canAfford={state.player.chongJuice >= state.upgrades.extractor.cost}
                onBuy={() => handleBuyUpgrade('extractor')}
              />
              
              <UpgradeCard
                id="factory"
                name="Mega Factory"
                description="Industrial-scale ChongJuice production."
                icon={<Factory className="text-orange-400" />}
                level={state.upgrades.factory.level}
                cost={state.upgrades.factory.cost}
                effect={state.upgrades.factory.effect}
                canAfford={state.player.chongJuice >= state.upgrades.factory.cost}
                onBuy={() => handleBuyUpgrade('factory')}
              />
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Collect Big Chongus</h2>
            <p className="text-gray-300 mb-4">
              Spend 1,000 ChongJuice to collect a new Big Chongus with random stats and appearance!
            </p>
            
            <button
              onClick={handleCollectChongus}
              disabled={state.player.chongJuice < 1000}
              className={`w-full py-3 px-4 rounded-lg font-bold ${
                state.player.chongJuice >= 1000
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              } transition-colors`}
            >
              Collect Big Chongus (1,000 ChongJuice)
            </button>
            
            <div className="mt-4 text-sm text-gray-400">
              You have {state.collection.length} Big Chongus in your collection.
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Stats</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Total ChongJuice:</span>
                <span className="font-bold">{Math.floor(state.player.chongJuice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Production Rate:</span>
                <span className="font-bold">{state.player.chongJuicePerSecond}/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Collection Size:</span>
                <span className="font-bold">{state.collection.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface UpgradeCardProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  level: number;
  cost: number;
  effect: number;
  canAfford: boolean;
  onBuy: () => void;
}

const UpgradeCard: React.FC<UpgradeCardProps> = ({
  name,
  description,
  icon,
  level,
  cost,
  effect,
  canAfford,
  onBuy,
}) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-lg font-bold ml-2">{name}</h3>
      </div>
      <p className="text-sm text-gray-300 mb-2">{description}</p>
      <div className="text-sm text-gray-300 mb-2">
        Level: <span className="font-bold">{level}</span>
      </div>
      <div className="text-sm text-gray-300 mb-2">
        Effect: <span className="font-bold">+{effect}/s</span>
      </div>
      <button
        onClick={onBuy}
        disabled={!canAfford}
        className={`w-full py-2 px-3 rounded font-bold text-sm ${
          canAfford
            ? 'bg-blue-500 hover:bg-blue-600'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        } transition-colors`}
      >
        Upgrade ({Math.floor(cost)} Juice)
      </button>
    </div>
  );
};

export default IdleGame;