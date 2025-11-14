# OvergoalPlayer Hook Implementation

This document describes the implementation of the `useOvergoalPlayer` hook and related components for managing football player data in the Overgoal game.

## 📁 Files Created/Modified

### New Files
- `client/src/data/mock-overgoal-players.json` - Mock player data
- `client/src/components/OvergoalPlayerCard.tsx` - Player display component
- `client/src/components/index.ts` - Component exports
- `client/src/examples/OvergoalPlayerExample.tsx` - Usage example
- `client/docs/overgoal-player-hook.md` - This documentation

### Modified Files
- `client/src/dojo/hooks/useOvergoalPlayer.tsx` - Updated to use mock data
- `client/src/zustand/store.ts` - Updated imports and persistence

## 🎯 Implementation Overview

The implementation follows the established patterns from `usePlayer.tsx` but uses mock data instead of GraphQL queries. This allows for development and testing without requiring a live Dojo backend.

## 🏗️ Architecture

### 1. Data Layer (`mock-overgoal-players.json`)

Contains realistic football player data with the following structure:

```json
{
  "players": [
    {
      "id": "1",
      "universe_player_id": "1001",
      "goal_currency": 2500,
      "energy": 85,
      "speed": 78,
      "leadership": 92,
      "pass": 88,
      "shoot": 85,
      "freekick": 79,
      "is_injured": false,
      "visor_type": 1,
      "visor_color": 3,
      "player_category": "midfielder",
      "player_name": "Marco Silva",
      "player_description": "Dynamic midfielder with excellent vision..."
    }
  ],
  "default_player": { /* fallback player data */ }
}
```

### 2. Hook Layer (`useOvergoalPlayer.tsx`)

**Key Features:**
- ✅ Follows the same pattern as `usePlayer.tsx`
- ✅ Uses mock data instead of GraphQL
- ✅ Maintains loading states and error handling
- ✅ Integrates with Zustand store
- ✅ Simulates network delays for realistic UX

**Address-to-Player Mapping:**
```typescript
const getPlayerByAddress = (address: string): OvergoalPlayer | null => {
  const addressHash = address.slice(-1);
  const playerIndex = parseInt(addressHash, 16) % mockPlayersData.players.length;
  return mockPlayersData.players[playerIndex] || mockPlayersData.default_player;
};
```

### 3. Component Layer (`OvergoalPlayerCard.tsx`)

**Features:**
- 🎨 Modern, responsive design
- 📊 Stats visualization
- 🎯 Position-based color coding
- ⚡ Energy level indicators
- 🏥 Injury status display
- 🔄 Loading and error states

## 🚀 Usage

### Basic Hook Usage

```tsx
import { useOvergoalPlayer } from "../dojo/hooks/useOvergoalPlayer";

function MyComponent() {
  const { overgoalPlayer, isLoading, error, refetch } = useOvergoalPlayer();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!overgoalPlayer) return <div>No player found</div>;

  return (
    <div>
      <h1>{overgoalPlayer.player_name}</h1>
      <p>Speed: {Number(overgoalPlayer.speed)}</p>
      <p>Energy: {Number(overgoalPlayer.energy)}%</p>
    </div>
  );
}
```

### Using the Player Card Component

```tsx
import { OvergoalPlayerCard } from "../components/OvergoalPlayerCard";

function PlayerPage() {
  return (
    <div className="p-8">
      <OvergoalPlayerCard className="max-w-2xl mx-auto" />
    </div>
  );
}
```

### Advanced Usage with Store

```tsx
import useAppStore from "../zustand/store";

function PlayerStats() {
  const overgoalPlayer = useAppStore((state) => state.overgoalPlayer);
  const setOvergoalPlayer = useAppStore((state) => state.setOvergoalPlayer);

  // Direct store access for performance-critical components
  return (
    <div>
      {overgoalPlayer && (
        <span>Current Player: {overgoalPlayer.player_name}</span>
      )}
    </div>
  );
}
```

## 🎮 Player Categories & Stats

### Categories
- **Forward**: High shooting, speed (Red theme)
- **Midfielder**: Balanced stats, high passing (Blue theme)
- **Defender**: High leadership, lower shooting (Green theme)

### Key Stats
- **Speed** (0-100): Player's pace and acceleration
- **Shooting** (0-100): Goal scoring ability
- **Passing** (0-100): Ball distribution accuracy
- **Leadership** (0-100): Team influence and captaincy
- **Free Kick** (0-100): Set piece specialization
- **Energy** (0-100): Current stamina/fitness level

### Special Attributes
- **Goal Currency**: In-game currency earned
- **Injury Status**: Affects availability and performance
- **Visor Type/Color**: Cosmetic customization options

## 🔧 Configuration

### Mock Data Customization

To add new players, edit `mock-overgoal-players.json`:

```json
{
  "id": "9",
  "universe_player_id": "1009",
  "goal_currency": 3500,
  "energy": 90,
  "speed": 85,
  "leadership": 80,
  "pass": 88,
  "shoot": 92,
  "freekick": 75,
  "is_injured": false,
  "visor_type": 2,
  "visor_color": 4,
  "player_category": "forward",
  "player_name": "Your Player Name",
  "player_description": "Your player description..."
}
```

### Network Delay Simulation

Adjust the delay in `fetchOvergoalPlayerData`:

```typescript
// Current: 500ms delay
await new Promise((resolve) => setTimeout(resolve, 500));

// For faster development:
await new Promise((resolve) => setTimeout(resolve, 100));
```

## 🧪 Testing

### Manual Testing Steps

1. **Connect Wallet**: Use any Starknet wallet
2. **Check Player Loading**: Verify loading states work
3. **Address Variation**: Try different wallet addresses to see different players
4. **Error Handling**: Disconnect wallet to test error states
5. **Persistence**: Reload page to verify data persistence

### Automated Testing

```typescript
// Example test structure
describe('useOvergoalPlayer', () => {
  it('should load player data for connected wallet', async () => {
    // Test implementation
  });

  it('should handle loading states correctly', () => {
    // Test implementation
  });

  it('should persist player data', () => {
    // Test implementation
  });
});
```

## 🔄 Migration to Real Backend

When ready to connect to actual Dojo contracts:

1. **Update GraphQL Query**: Modify the query in `useOvergoalPlayer.tsx`
2. **Remove Mock Data**: Replace `fetchOvergoalPlayerData` with real GraphQL calls
3. **Update Interface**: Ensure the interface matches contract schema
4. **Test Integration**: Verify all functionality works with real data

### Migration Checklist

- [ ] Update GraphQL query to match contract schema
- [ ] Replace mock data fetching with real API calls
- [ ] Update error handling for network issues
- [ ] Test with real contract data
- [ ] Update documentation

## 📚 Related Documentation

- [Dojo Model Update Guide](./model-update-guide-en.md)
- [System Extension Guide](./08-extending-system.md)
- [React Hooks Pattern](./06-react-hooks-pattern.md)

## 🎯 Next Steps

1. **Add Player Actions**: Create hooks for training, trading, etc.
2. **Team Management**: Implement team/squad functionality
3. **Match Integration**: Connect players to match system
4. **NFT Integration**: Add player NFT minting/trading
5. **Advanced Stats**: Implement performance tracking

---

**Note**: This implementation provides a solid foundation for player management in the Overgoal game while maintaining compatibility with the existing Dojo architecture patterns.
