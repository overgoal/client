import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to add linkID to all players
function addLinkIdsToPlayers() {
  // Read the players.json file
  const playersPath = path.join(__dirname, '../../public/players.json');
  const playersData = JSON.parse(fs.readFileSync(playersPath, 'utf-8'));

  // Add linkID to each player
  const updatedPlayers = playersData.map(player => ({
    ...player,
    linkID: uuidv4()
  }));

  // Write back to file with proper formatting
  fs.writeFileSync(
    playersPath,
    JSON.stringify(updatedPlayers, null, 2),
    'utf-8'
  );

  console.log(`✅ Successfully added linkID to ${updatedPlayers.length} players`);
  return updatedPlayers;
}

// Run the function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  addLinkIdsToPlayers();
}

addLinkIdsToPlayers();