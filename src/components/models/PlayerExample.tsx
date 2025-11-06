/*
  Example: Using ChangeableModels with Player JSON data
*/

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ChangeableModels, { PlayerData } from "./ChangeableModels";
import { useEffect, useState } from "react";

/**
 * Single player display from JSON
 */
export function SinglePlayerExample() {
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/players (2).json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load players");
        return res.json();
      })
      .then((data: PlayerData[]) => {
        // Get player with ID 2 (Lincoln Jordan)
        const selectedPlayer = data.find((p) => p.player_id === 2);
        if (selectedPlayer) {
          setPlayer(selectedPlayer);
        } else {
          throw new Error("Player not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading player:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-xl">Loading player...</div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-red-500 text-xl">Error: {error || "Player not found"}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-900">
      {/* Player Info Header */}
      <div className="bg-gray-800 p-4 text-center border-b border-gray-700">
        <h1 className="text-3xl font-bold text-white">{player.player_name}</h1>
        <p className="text-gray-400 mt-1">{player.player_description}</p>
        <div className="mt-3 flex justify-center gap-6 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500">Type</span>
            <span className="text-white font-bold uppercase">{player.player_type}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Shoot</span>
            <span className="text-white font-bold">{player.shoot}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Pass</span>
            <span className="text-white font-bold">{player.pass}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Dribble</span>
            <span className="text-white font-bold">{player.dribble}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Strength</span>
            <span className="text-white font-bold">{player.strength}</span>
          </div>
        </div>
      </div>

      {/* 3D Character Display */}
      <div className="h-[calc(100vh-120px)]">
        <Canvas camera={{ position: [0, 50, 100], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          
          {/* Pass player data directly to ChangeableModels */}
          <ChangeableModels 
            playerData={player} 
            autoRandomize={false} 
          />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            minDistance={50}
            maxDistance={200}
          />
        </Canvas>
      </div>
    </div>
  );
}

/**
 * Team lineup display (multiple players)
 */
export function TeamLineupExample() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/players (2).json")
      .then((res) => res.json())
      .then((data: PlayerData[]) => {
        // Get first 3 players from team 0
        const teamPlayers = data.filter((p) => p.team === 0).slice(0, 3);
        setPlayers(teamPlayers);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading players:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-white">Loading team...</div>;
  }

  return (
    <div className="w-full h-screen bg-gray-900">
      <div className="bg-gray-800 p-4 text-center border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">Team Lineup</h1>
        <p className="text-gray-400">First 3 Players</p>
      </div>
      
      <div className="h-[calc(100vh-80px)]">
        <Canvas camera={{ position: [0, 50, 250], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          {/* Display 3 players side by side */}
          {players.map((player, index) => (
            <group key={player.player_id}>
              <ChangeableModels
                playerData={player}
                position={[(index - 1) * 80, 0, 0]}
                autoRandomize={false}
              />
              {/* Player name label (optional - would need TextGeometry or HTML overlay) */}
            </group>
          ))}
          
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}

/**
 * Player selector with preview
 */
export function PlayerSelectorExample() {
  const [allPlayers, setAllPlayers] = useState<PlayerData[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/players (2).json")
      .then((res) => res.json())
      .then((data: PlayerData[]) => {
        setAllPlayers(data);
        setSelectedPlayer(data[0]); // Select first player by default
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading players:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !selectedPlayer) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-xl">Loading players...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Player List Sidebar */}
      <div className="w-80 bg-gray-800 overflow-y-auto border-r border-gray-700">
        <div className="p-4 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
          <h2 className="text-xl font-bold text-white">Select Player</h2>
          <p className="text-sm text-gray-400">{allPlayers.length} players available</p>
        </div>
        
        {allPlayers.map((player) => (
          <button
            key={player.player_id}
            onClick={() => setSelectedPlayer(player)}
            className={`w-full p-4 text-left border-b border-gray-700 transition-colors ${
              selectedPlayer.player_id === player.player_id
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">{player.player_name}</div>
                <div className="text-sm opacity-75">
                  {player.player_type} • Team {player.team}
                </div>
              </div>
              <div className="text-right text-xs">
                <div>⚽ {player.shoot}</div>
                <div>🎯 {player.dribble}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 3D Preview Area */}
      <div className="flex-1 flex flex-col">
        {/* Player Stats Header */}
        <div className="bg-gray-800 p-6 border-b border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-2">
            {selectedPlayer.player_name}
          </h1>
          <p className="text-gray-400 mb-4">{selectedPlayer.player_description}</p>
          
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-gray-700 p-3 rounded">
              <div className="text-xs text-gray-400">Shoot</div>
              <div className="text-2xl font-bold text-white">{selectedPlayer.shoot}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="text-xs text-gray-400">Pass</div>
              <div className="text-2xl font-bold text-white">{selectedPlayer.pass}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="text-xs text-gray-400">Intelligence</div>
              <div className="text-2xl font-bold text-white">{selectedPlayer.intelligence}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="text-xs text-gray-400">Dribble</div>
              <div className="text-2xl font-bold text-white">{selectedPlayer.dribble}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="text-xs text-gray-400">Strength</div>
              <div className="text-2xl font-bold text-white">{selectedPlayer.strength}</div>
            </div>
          </div>
        </div>

        {/* 3D Character View */}
        <div className="flex-1">
          <Canvas camera={{ position: [0, 50, 100], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.3} />
            
            <ChangeableModels
              playerData={selectedPlayer}
              autoRandomize={false}
            />
            
            <OrbitControls 
              enableZoom={true}
              minDistance={50}
              maxDistance={200}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

// Export default
export default SinglePlayerExample;

