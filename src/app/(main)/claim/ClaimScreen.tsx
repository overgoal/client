/*
  ClaimScreen - Example usage of the new PlayerModel components
  
  Usage:
  1. Import PlayerModel wrapper (automatically selects correct model based on body_type)
  2. Or import individual model components: ChangeableModel1, ChangeableModel2, ChangeableModel3
*/

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PlayerModel from "../../../components/models/PlayerModel";
import type { PlayerData } from "../../../components/models/shared-types";

// Example player data
const examplePlayer: PlayerData = {
  user_id: 1,
  created_at: Date.now(),
  last_updated_at: Date.now(),
  last_login_at: Date.now(),
  fame: 75,
  charisma: 80,
  stamina: 85,
  strength: 70,
  agility: 90,
  intelligence: 75,
  energy: 80,
  speed: 88,
  leadership: 72,
  pass: 85,
  shoot: 90,
  freekick: 78,
  universe_currency: 1000,
  body_type: 1, // 0, 1, or 2 - Change this to test different models
  skin_color: 1,
  beard_type: 1,
  hair_type: 0,
  hair_color: 2,
  visor_type: 1,
  visor_color: 1,
  team_id: 1,
  player_category: "gold",
  player_name: "Test Player",
  player_description: "A test player",
  linkID: 1,
};

export default function ClaimScreen() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Using PlayerModel wrapper - automatically selects correct model */}
        <PlayerModel 
          playerData={examplePlayer}
          position={[0, -1, 0]}
          scale={1}
        />
        
        {/* Alternative: Use specific model components directly */}
        {/* 
        <ChangeableModel1 
          playerData={{ ...examplePlayer, body_type: 1 }}
          position={[0, -1, 0]}
        />
        */}
        
        <OrbitControls />
      </Canvas>
      
      <div className="absolute top-4 left-4 bg-black/70 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Player Model Components</h2>
        <p className="text-sm">Body Type: {examplePlayer.body_type}</p>
        <p className="text-xs mt-2 text-gray-300">
          Change body_type (0, 1, or 2) to test different models
        </p>
      </div>
    </div>
  );
}

