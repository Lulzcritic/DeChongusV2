import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Types
export interface BigChongus {
  id: string;
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  level: number;
  experience: number;
  stats: {
    health: number;
    attack: number;
    defense: number;
    speed: number;
    special: number;
  };
  appearance: {
    color: string;
    size: number;
    features: string[];
  };
}

interface GameState {
  player: {
    name: string;
    level: number;
    chongJuice: number;
    chongJuicePerSecond: number;
    lastUpdated: number;
  };
  collection: BigChongus[];
  upgrades: {
    [key: string]: {
      level: number;
      cost: number;
      effect: number;
    };
  };
  expeditions: {
    available: {
      id: string;
      name: string;
      duration: number;
      difficulty: number;
      rewards: {
        chongJuice: number;
        experience: number;
        itemChance: number;
      };
    }[];
    active: {
      id: string;
      expeditionId: string;
      team: string[];
      startTime: number;
      endTime: number;
    }[];
  };
  communityEvent: {
    title: string;
    description: string;
    goal: number;
    current: number;
    endTime: number;
    rewards: {
      chongJuice: number;
      rareChongusChance: number;
    };
  };
}

// Initial state
const initialState: GameState = {
  player: {
    name: 'Player',
    level: 1,
    chongJuice: 0,
    chongJuicePerSecond: 1,
    lastUpdated: Date.now(),
  },
  collection: [],
  upgrades: {
    juicer: {
      level: 1,
      cost: 10,
      effect: 1,
    },
    extractor: {
      level: 0,
      cost: 50,
      effect: 5,
    },
    factory: {
      level: 0,
      cost: 200,
      effect: 25,
    },
  },
  expeditions: {
    available: [
      {
        id: '1',
        name: 'Forest Expedition',
        duration: 300, // 5 minutes
        difficulty: 1,
        rewards: {
          chongJuice: 100,
          experience: 50,
          itemChance: 0.3,
        },
      },
      {
        id: '2',
        name: 'Cave Exploration',
        duration: 900, // 15 minutes
        difficulty: 2,
        rewards: {
          chongJuice: 300,
          experience: 150,
          itemChance: 0.5,
        },
      },
    ],
    active: [],
  },
  communityEvent: {
    title: 'Meme Festival',
    description: 'Collect ChongJuice to celebrate the latest viral meme!',
    goal: 10000,
    current: 0,
    endTime: Date.now() + 604800000, // 1 week
    rewards: {
      chongJuice: 1000,
      rareChongusChance: 0.5,
    },
  },
};

// Action types
type GameAction =
  | { type: 'UPDATE_IDLE_RESOURCES' }
  | { type: 'BUY_UPGRADE'; payload: { upgradeId: string } }
  | { type: 'COLLECT_CHONGUS' }
  | { type: 'START_EXPEDITION'; payload: { expeditionId: string; team: string[] } }
  | { type: 'COMPLETE_EXPEDITION'; payload: { activeExpeditionId: string } }
  | { type: 'CONTRIBUTE_TO_COMMUNITY'; payload: { amount: number } };

// Reducer
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'UPDATE_IDLE_RESOURCES': {
      const now = Date.now();
      const timeDiff = (now - state.player.lastUpdated) / 1000; // in seconds
      const newJuice = state.player.chongJuice + state.player.chongJuicePerSecond * timeDiff;
      
      return {
        ...state,
        player: {
          ...state.player,
          chongJuice: newJuice,
          lastUpdated: now,
        },
      };
    }
    
    case 'BUY_UPGRADE': {
      const { upgradeId } = action.payload;
      const upgrade = state.upgrades[upgradeId];
      
      if (!upgrade || state.player.chongJuice < upgrade.cost) {
        return state;
      }
      
      const newLevel = upgrade.level + 1;
      const newCost = Math.floor(upgrade.cost * 1.5);
      let newChongJuicePerSecond = state.player.chongJuicePerSecond;
      
      // Apply effect based on upgrade
      newChongJuicePerSecond += upgrade.effect;
      
      return {
        ...state,
        player: {
          ...state.player,
          chongJuice: state.player.chongJuice - upgrade.cost,
          chongJuicePerSecond: newChongJuicePerSecond,
        },
        upgrades: {
          ...state.upgrades,
          [upgradeId]: {
            ...upgrade,
            level: newLevel,
            cost: newCost,
          },
        },
      };
    }
    
    case 'COLLECT_CHONGUS': {
      // Generate a random Big Chongus
      const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'] as const;
      const rarityWeights = [60, 25, 10, 4, 1]; // Percentages
      
      // Determine rarity
      const rarityRoll = Math.random() * 100;
      let cumulativeWeight = 0;
      let selectedRarity: typeof rarities[number] = 'common';
      
      for (let i = 0; i < rarities.length; i++) {
        cumulativeWeight += rarityWeights[i];
        if (rarityRoll <= cumulativeWeight) {
          selectedRarity = rarities[i];
          break;
        }
      }
      
      // Generate stats based on rarity
      const rarityMultiplier = {
        common: 1,
        uncommon: 1.5,
        rare: 2,
        epic: 3,
        legendary: 5,
      };
      
      const baseStats = {
        health: Math.floor(Math.random() * 50) + 50,
        attack: Math.floor(Math.random() * 20) + 10,
        defense: Math.floor(Math.random() * 15) + 5,
        speed: Math.floor(Math.random() * 10) + 5,
        special: Math.floor(Math.random() * 25) + 5,
      };
      
      const multiplier = rarityMultiplier[selectedRarity];
      const stats = {
        health: Math.floor(baseStats.health * multiplier),
        attack: Math.floor(baseStats.attack * multiplier),
        defense: Math.floor(baseStats.defense * multiplier),
        speed: Math.floor(baseStats.speed * multiplier),
        special: Math.floor(baseStats.special * multiplier),
      };
      
      // Generate appearance
      const colors = ['red', 'blue', 'green', 'purple', 'yellow', 'orange', 'pink'];
      const features = [
        'big ears', 'tiny tail', 'fluffy fur', 'glowing eyes', 
        'spiky hair', 'round belly', 'long whiskers', 'spotted pattern',
        'striped pattern', 'shiny coat', 'bushy eyebrows', 'tiny paws'
      ];
      
      const randomFeatures = [];
      const featureCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < featureCount; i++) {
        const randomFeature = features[Math.floor(Math.random() * features.length)];
        if (!randomFeatures.includes(randomFeature)) {
          randomFeatures.push(randomFeature);
        }
      }
      
      const newChongus: BigChongus = {
        id: uuidv4(),
        name: `Big Chongus #${state.collection.length + 1}`,
        rarity: selectedRarity,
        level: 1,
        experience: 0,
        stats,
        appearance: {
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.floor(Math.random() * 50) + 50, // Size between 50-100
          features: randomFeatures,
        },
      };
      
      return {
        ...state,
        collection: [...state.collection, newChongus],
      };
    }
    
    case 'START_EXPEDITION': {
      const { expeditionId, team } = action.payload;
      const expedition = state.expeditions.available.find(e => e.id === expeditionId);
      
      if (!expedition) {
        return state;
      }
      
      const now = Date.now();
      const newActiveExpedition = {
        id: uuidv4(),
        expeditionId,
        team,
        startTime: now,
        endTime: now + (expedition.duration * 1000),
      };
      
      return {
        ...state,
        expeditions: {
          ...state.expeditions,
          active: [...state.expeditions.active, newActiveExpedition],
        },
      };
    }
    
    case 'COMPLETE_EXPEDITION': {
      const { activeExpeditionId } = action.payload;
      const activeExpedition = state.expeditions.active.find(e => e.id === activeExpeditionId);
      
      if (!activeExpedition) {
        return state;
      }
      
      const expedition = state.expeditions.available.find(e => e.id === activeExpedition.expeditionId);
      
      if (!expedition) {
        return state;
      }
      
      // Calculate rewards
      const chongJuiceReward = expedition.rewards.chongJuice;
      
      return {
        ...state,
        player: {
          ...state.player,
          chongJuice: state.player.chongJuice + chongJuiceReward,
        },
        expeditions: {
          ...state.expeditions,
          active: state.expeditions.active.filter(e => e.id !== activeExpeditionId),
        },
      };
    }
    
    case 'CONTRIBUTE_TO_COMMUNITY': {
      const { amount } = action.payload;
      
      if (amount <= 0 || state.player.chongJuice < amount) {
        return state;
      }
      
      const newCurrent = state.communityEvent.current + amount;
      
      return {
        ...state,
        player: {
          ...state.player,
          chongJuice: state.player.chongJuice - amount,
        },
        communityEvent: {
          ...state.communityEvent,
          current: newCurrent,
        },
      };
    }
    
    default:
      return state;
  }
};

// Context
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  // Update idle resources every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: 'UPDATE_IDLE_RESOURCES' });
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};