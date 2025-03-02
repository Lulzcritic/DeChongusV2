import React, { useState } from 'react';
import { Globe, Plane as Planet, Star, Rocket, Flag, Users } from 'lucide-react';

const GalacticMap: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<SolarSystem | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  
  // Mock data for solar systems
  const solarSystems: SolarSystem[] = [
    {
      id: '1',
      name: 'Alpha Chongus',
      position: { x: 25, y: 30 },
      size: 'large',
      planets: [
        {
          id: '1-1',
          name: 'Memeria',
          type: 'terrestrial',
          resources: { chongJuice: 50, rareElements: 20 },
          owner: 'unclaimed',
          position: { distance: 20, angle: 45 },
        },
        {
          id: '1-2',
          name: 'Chungopolis',
          type: 'gas giant',
          resources: { chongJuice: 80, rareElements: 10 },
          owner: 'player',
          position: { distance: 40, angle: 120 },
        },
        {
          id: '1-3',
          name: 'New Reddit',
          type: 'ice',
          resources: { chongJuice: 30, rareElements: 40 },
          owner: 'faction',
          position: { distance: 60, angle: 240 },
        },
      ],
    },
    {
      id: '2',
      name: 'Beta Doge',
      position: { x: 65, y: 40 },
      size: 'medium',
      planets: [
        {
          id: '2-1',
          name: 'Dogecoin',
          type: 'terrestrial',
          resources: { chongJuice: 40, rareElements: 30 },
          owner: 'unclaimed',
          position: { distance: 25, angle: 30 },
        },
        {
          id: '2-2',
          name: 'Shibarium',
          type: 'desert',
          resources: { chongJuice: 20, rareElements: 60 },
          owner: 'enemy',
          position: { distance: 45, angle: 150 },
        },
      ],
    },
    {
      id: '3',
      name: 'Gamma Pepe',
      position: { x: 40, y: 70 },
      size: 'small',
      planets: [
        {
          id: '3-1',
          name: 'Rare Pepe',
          type: 'jungle',
          resources: { chongJuice: 100, rareElements: 5 },
          owner: 'unclaimed',
          position: { distance: 30, angle: 90 },
        },
      ],
    },
  ];
  
  const handleSystemClick = (system: SolarSystem) => {
    setSelectedSystem(system);
    setSelectedPlanet(null);
  };
  
  const handlePlanetClick = (planet: Planet) => {
    setSelectedPlanet(planet);
  };
  
  const getOwnerColor = (owner: string): string => {
    switch (owner) {
      case 'player':
        return 'text-blue-400';
      case 'enemy':
        return 'text-red-400';
      case 'faction':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };
  
  const getOwnerBg = (owner: string): string => {
    switch (owner) {
      case 'player':
        return 'bg-blue-900';
      case 'enemy':
        return 'bg-red-900';
      case 'faction':
        return 'bg-purple-900';
      default:
        return 'bg-gray-700';
    }
  };
  
  const getPlanetColor = (type: string): string => {
    switch (type) {
      case 'terrestrial':
        return 'bg-green-500';
      case 'gas giant':
        return 'bg-yellow-500';
      case 'ice':
        return 'bg-blue-300';
      case 'desert':
        return 'bg-orange-400';
      case 'jungle':
        return 'bg-green-600';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Globe size={24} className="text-teal-400 mr-2" />
        <h1 className="text-3xl font-bold">Galactic Map</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="relative w-full aspect-square bg-gray-900 rounded-lg overflow-hidden">
              {/* Stars background */}
              <div className="absolute inset-0 opacity-50">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.8 + 0.2,
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Solar systems */}
              {solarSystems.map((system) => (
                <div
                  key={system.id}
                  className={`absolute cursor-pointer transition-transform hover:scale-110 ${
                    selectedSystem?.id === system.id ? 'ring-2 ring-white rounded-full' : ''
                  }`}
                  style={{
                    left: `${system.position.x}%`,
                    top: `${system.position.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => handleSystemClick(system)}
                >
                  <div
                    className={`relative rounded-full bg-yellow-400 ${
                      system.size === 'large'
                        ? 'w-6 h-6'
                        : system.size === 'medium'
                        ? 'w-5 h-5'
                        : 'w-4 h-4'
                    }`}
                  >
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-bold">
                      {system.name}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Selected system planets */}
              {selectedSystem && (
                <div
                  className="absolute w-48 h-48 rounded-full border border-gray-600"
                  style={{
                    left: `${selectedSystem.position.x}%`,
                    top: `${selectedSystem.position.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {selectedSystem.planets.map((planet) => {
                    const radians = (planet.position.angle * Math.PI) / 180;
                    const distance = planet.position.distance;
                    const x = Math.cos(radians) * distance;
                    const y = Math.sin(radians) * distance;
                    
                    return (
                      <div
                        key={planet.id}
                        className={`absolute cursor-pointer transition-transform hover:scale-110 ${
                          selectedPlanet?.id === planet.id ? 'ring-2 ring-white rounded-full' : ''
                        }`}
                        style={{
                          left: `50%`,
                          top: `50%`,
                          transform: `translate(${x}%, ${y}%)`,
                        }}
                        onClick={() => handlePlanetClick(planet)}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${getPlanetColor(planet.type)}`}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          {selectedSystem && (
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <div className="flex items-center mb-4">
                <Star size={20} className="text-yellow-400 mr-2" />
                <h2 className="text-xl font-bold">{selectedSystem.name}</h2>
              </div>
              
              <p className="text-sm text-gray-300 mb-4">
                A {selectedSystem.size} solar system with {selectedSystem.planets.length} planets.
                Click on a planet to view details.
              </p>
              
              <div className="space-y-2">
                {selectedSystem.planets.map((planet) => (
                  <div
                    key={planet.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedPlanet?.id === planet.id
                        ? 'bg-teal-900 border border-teal-500'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    onClick={() => handlePlanetClick(planet)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${getPlanetColor(
                            planet.type
                          )} mr-2`}
                        ></div>
                        <div>
                          <div className="font-bold">{planet.name}</div>
                          <div className="text-xs text-gray-400">{planet.type}</div>
                        </div>
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${getOwnerBg(
                          planet.owner
                        )} ${getOwnerColor(planet.owner)}`}
                      >
                        {planet.owner === 'unclaimed'
                          ? 'Unclaimed'
                          : planet.owner.charAt(0).toUpperCase() + planet.owner.slice(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedPlanet && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Planet size={20} className="text-teal-400 mr-2" />
                <h2 className="text-xl font-bold">{selectedPlanet.name}</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm font-bold mb-1">Type</div>
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${getPlanetColor(
                        selectedPlanet.type )} mr-2`}
                    ></div>
                    <div className="text-gray-300">
                      {selectedPlanet.type.charAt(0).toUpperCase() + selectedPlanet.type.slice(1)}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm font-bold mb-1">Resources</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center text-sm">
                      <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center mr-2">
                        <Beaker size={12} className="text-blue-400" />
                      </div>
                      <div>
                        <div className="font-bold">{selectedPlanet.resources.chongJuice}</div>
                        <div className="text-xs text-gray-400">ChongJuice</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <div className="w-6 h-6 bg-purple-900 rounded-full flex items-center justify-center mr-2">
                        <Sparkles size={12} className="text-purple-400" />
                      </div>
                      <div>
                        <div className="font-bold">{selectedPlanet.resources.rareElements}</div>
                        <div className="text-xs text-gray-400">Rare Elements</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm font-bold mb-1">Status</div>
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 ${getOwnerBg(
                        selectedPlanet.owner
                      )} rounded-full flex items-center justify-center mr-2`}
                    >
                      <Flag size={12} className={getOwnerColor(selectedPlanet.owner)} />
                    </div>
                    <div className="text-gray-300">
                      {selectedPlanet.owner === 'unclaimed'
                        ? 'Unclaimed Territory'
                        : selectedPlanet.owner === 'player'
                        ? 'Your Territory'
                        : selectedPlanet.owner === 'enemy'
                        ? 'Enemy Territory'
                        : 'Faction Territory'}
                    </div>
                  </div>
                </div>
                
                {selectedPlanet.owner === 'unclaimed' && (
                  <button className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 rounded-lg font-bold transition-colors flex items-center justify-center">
                    <Rocket size={16} className="mr-2" />
                    Colonize Planet
                  </button>
                )}
                
                {selectedPlanet.owner === 'enemy' && (
                  <button className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors flex items-center justify-center">
                    <Swords size={16} className="mr-2" />
                    Attack Planet
                  </button>
                )}
                
                {selectedPlanet.owner === 'faction' && (
                  <button className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-colors flex items-center justify-center">
                    <Users size={16} className="mr-2" />
                    Join Faction
                  </button>
                )}
                
                {selectedPlanet.owner === 'player' && (
                  <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors flex items-center justify-center">
                    <Rocket size={16} className="mr-2" />
                    Manage Colony
                  </button>
                )}
              </div>
            </div>
          )}
          
          {!selectedSystem && !selectedPlanet && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-center py-8">
                <Globe size={48} className="mx-auto mb-4 text-teal-400 opacity-50" />
                <h2 className="text-xl font-bold mb-2">Galactic Map</h2>
                <p className="text-gray-400">
                  Click on a solar system to explore planets and resources.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Types
interface SolarSystem {
  id: string;
  name: string;
  position: { x: number; y: number };
  size: 'small' | 'medium' | 'large';
  planets: Planet[];
}

interface Planet {
  id: string;
  name: string;
  type: string;
  resources: { chongJuice: number; rareElements: number };
  owner: 'unclaimed' | 'player' | 'enemy' | 'faction';
  position: { distance: number; angle: number };
}

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

const Swords = ({ size, className }: { size: number; className?: string }) => (
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
    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"></polyline>
    <line x1="13" y1="19" x2="19" y2="13"></line>
    <line x1="16" y1="16" x2="20" y2="20"></line>
    <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"></polyline>
    <line x1="5" y1="14" x2="9" y2="18"></line>
    <line x1="7" y1="17" x2="4" y2="20"></line>
  </svg>
);

export default GalacticMap;