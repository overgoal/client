#!/usr/bin/env node

/**
 * Script to generate SQL INSERT statements for all players from players.json
 * Usage: node scripts/generate-player-inserts.js > players-insert.sql
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the players.json file
const playersPath = path.join(__dirname, '../public/players.json');
const playersData = JSON.parse(fs.readFileSync(playersPath, 'utf8'));

console.log('-- Generated player INSERT statements from players.json');
console.log('-- Total players:', playersData.length);
console.log('-- Generated on:', new Date().toISOString());
console.log('');

console.log('INSERT INTO public.players (');
console.log('    link_id, player_name, player_description, player_category,');
console.log('    fame, charisma, stamina, strength, agility, intelligence, energy, speed, leadership, pass, shoot, freekick,');
console.log('    universe_currency, body_type, skin_color, beard_type, hair_type, hair_color, visor_type, visor_color, team_id,');
console.log('    json_created_at, json_last_updated_at, json_last_login_at');
console.log(') VALUES');

// Generate INSERT statements
playersData.forEach((player, index) => {
  const isLast = index === playersData.length - 1;
  
  // Escape single quotes in strings
  const escapeSql = (str) => str ? str.replace(/'/g, "''") : '';
  
  const values = [
    `'${player.linkID}'`,
    `'${escapeSql(player.player_name)}'`,
    `'${escapeSql(player.player_description)}'`,
    `'${player.player_category}'`,
    player.fame,
    player.charisma,
    player.stamina,
    player.strength,
    player.agility,
    player.intelligence,
    player.energy,
    player.speed,
    player.leadership,
    player.pass,
    player.shoot,
    player.freekick,
    player.universe_currency,
    player.body_type,
    player.skin_color,
    player.beard_type,
    player.hair_type,
    player.hair_color,
    player.visor_type,
    player.visor_color,
    player.team_id,
    player.created_at,
    player.last_updated_at,
    player.last_login_at
  ];
  
  const line = `(${values.join(', ')})${isLast ? ';' : ','}`;
  console.log(line);
});

console.log('');
console.log('-- Players inserted successfully!');
