# SeasonPlayer Hook Implementation

This document describes the implementation of the `useSeasonPlayer` hook and related components for managing season-specific player performance data in the Overgoal game.

## 📁 Files Created/Modified

### New Files
- `client/src/data/mock-season-players.json` - Mock season player data with club and season info
- `client/src/dojo/hooks/useSeasonPlayer.tsx` - Season player data management hook
- `client/src/components/SeasonPlayerCard.tsx` - Season performance display component
- `client/src/examples/SeasonPlayerExample.tsx` - Usage example with season selection
- `client/docs/season-player-hook.md` - This documentation

### Modified Files
- `client/src/zustand/store.ts` - Added SeasonPlayer state management
- `client/src/components/index.ts` - Added SeasonPlayerCard export

## 🎯 Implementation Overview

The SeasonPlayer implementation manages player performance data within specific seasons, including match statistics, relationship metrics, and trophy achievements. It follows the established patterns from other player hooks but adds season-specific functionality.

## 🏗️ Architecture

### 1. Data Layer (`mock-season-players.json`)

Contains comprehensive season performance data with the following structure:

```json
{
  "season_players": [
    {
      "id": "1",
      "season_id": "2024",
      "season_club_id": "101",
      "overgoal_player_id": "1001",
      "team_relationship": 85,
      "fans_relationship": 92,
      "season_points": 2450,
      "matches_won": 18,
      "matches_lost": 4,
      "trophies_won": 2
    }
  ],
  "seasons": {
    "2024": { "name": "Premier League 2024", "status": "active" }
  },
  "clubs": {
    "101": { "name": "Cyber Lions FC", "color": "#FF6B35" }
  }
}
```

### 2. Hook Layer (`useSeasonPlayer.tsx`)

**Key Features:**
- ✅ Season-specific data filtering
- ✅ Optional season ID parameter
- ✅ Enhanced return data with season and club info
- ✅ Relationship metrics tracking
- ✅ Performance statistics calculation

**Season Selection Logic:**
```typescript
const getSeasonPlayerByAddress = (address: string, seasonId?: string): SeasonPlayer | null => {
  const targetSeasonId = seasonId || "2024"; // Default to current season
  const seasonPlayers = mockSeasonPlayersData.season_players.filter(
    player => player.season_id === targetSeasonId
  );
  // Address-based player selection within season
};
```

### 3. Component Layer (`SeasonPlayerCard.tsx`)

**Features:**
- 📊 Performance rating system (S, A, B, C, D ranks)
- 🏆 Trophy and match statistics
- 🤝 Team chemistry and fan relationship meters
- 🎨 Dynamic club colors and season status
- 📈 Win rate calculations
- 🔄 Loading and error states

## 🚀 Usage

### Basic Hook Usage

```tsx
import { useSeasonPlayer } from "../dojo/hooks/useSeasonPlayer";

function SeasonStats() {
  const { seasonPlayer, seasonInfo, clubInfo, isLoading } = useSeasonPlayer("2024");

  if (isLoading) return <div>Loading...</div>;
  if (!seasonPlayer) return <div>No season data found</div>;

  return (
    <div>
      <h1>Season: {seasonInfo?.name}</h1>
      <h2>Club: {clubInfo?.name}</h2>
      <p>Points: {Number(seasonPlayer.season_points)}</p>
      <p>Win Rate: {/* calculate win rate */}%</p>
    </div>
  );
}
```

### Using the Season Player Card Component

```tsx
import { SeasonPlayerCard } from "../components/SeasonPlayerCard";

function PlayerSeasonPage() {
  return (
    <div className="p-8">
      <SeasonPlayerCard seasonId="2024" className="max-w-2xl mx-auto" />
    </div>
  );
}
```

### Season Selection with State

```tsx
import { useState } from "react";
import { useSeasonPlayer } from "../dojo/hooks/useSeasonPlayer";

function MultiSeasonView() {
  const [selectedSeason, setSelectedSeason] = useState("2024");
  const { seasonPlayer, seasonInfo } = useSeasonPlayer(selectedSeason);

  return (
    <div>
      <select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}>
        <option value="2024">Current Season</option>
        <option value="2023">Previous Season</option>
      </select>
      {seasonPlayer && (
        <div>Season Points: {Number(seasonPlayer.season_points)}</div>
      )}
    </div>
  );
}
```

## 🎮 Season Player Metrics

### Performance Stats
- **Season Points** (0-∞): Total points earned during the season
- **Matches Won/Lost**: Win-loss record for the season
- **Win Rate**: Calculated percentage of matches won
- **Trophies Won**: Number of trophies earned in the season

### Relationship Metrics
- **Team Relationship** (0-100): Chemistry with teammates
- **Fans Relationship** (0-100): Support level from fans

### Performance Ratings
- **S Rank**: 4000+ points (Elite performance)
- **A Rank**: 3000-3999 points (Excellent performance)
- **B Rank**: 2000-2999 points (Good performance)
- **C Rank**: 1000-1999 points (Average performance)
- **D Rank**: <1000 points (Below average performance)

### Relationship Levels
- **Excellent**: 90-100 (Green indicator)
- **Good**: 75-89 (Blue indicator)
- **Average**: 60-74 (Yellow indicator)
- **Poor**: 40-59 (Orange indicator)
- **Critical**: 0-39 (Red indicator)

## 🔧 Configuration

### Adding New Seasons

To add new seasons, update `mock-season-players.json`:

```json
{
  "seasons": {
    "2025": {
      "name": "Premier League 2025",
      "status": "upcoming"
    }
  },
  "season_players": [
    {
      "id": "new_id",
      "season_id": "2025",
      // ... other fields
    }
  ]
}
```

### Adding New Clubs

```json
{
  "clubs": {
    "new_club_id": {
      "name": "New Team FC",
      "color": "#FF5733"
    }
  }
}
```

### Customizing Performance Ratings

Modify the `getPerformanceRating` function in `SeasonPlayerCard.tsx`:

```typescript
const getPerformanceRating = () => {
  const points = Number(seasonPlayer.season_points);
  if (points >= 5000) return { rating: "S+", color: "text-purple-400", bg: "bg-purple-900/30" };
  // ... adjust thresholds as needed
};
```

## 🧪 Testing

### Manual Testing Scenarios

1. **Season Switching**: Test with different season IDs
2. **Address Variation**: Try different wallet addresses
3. **Performance Ranges**: Verify rating calculations
4. **Relationship Meters**: Check color coding and labels
5. **Data Persistence**: Reload page to verify state persistence

### Test Cases

```typescript
describe('useSeasonPlayer', () => {
  it('should load season player data for specific season', async () => {
    // Test season-specific data loading
  });

  it('should default to current season when no seasonId provided', () => {
    // Test default season behavior
  });

  it('should return additional season and club info', () => {
    // Test enhanced return data
  });

  it('should handle season changes correctly', () => {
    // Test season switching
  });
});
```

## 📊 Data Relationships

### Entity Connections
```
SeasonPlayer ──┐
               ├── Season (via season_id)
               ├── Club (via season_club_id)
               └── OvergoalPlayer (via overgoal_player_id)
```

### Data Flow
1. User connects wallet → Address determined
2. Season ID provided (optional) → Season filter applied
3. Mock data filtered by season and address → Player selected
4. Additional info fetched → Season and club details loaded
5. Component renders → Performance metrics displayed

## 🔄 Migration to Real Backend

When ready to connect to actual Dojo contracts:

### GraphQL Query Example
```graphql
query GetSeasonPlayer($playerId: ContractAddress!, $seasonId: BigNumberish!) {
  seasonPlayerModels(where: { 
    overgoal_player_id: $playerId, 
    season_id: $seasonId 
  }) {
    edges {
      node {
        id
        season_id
        season_club_id
        overgoal_player_id
        team_relationship
        fans_relationship
        season_points
        matches_won
        matches_lost
        trophies_won
      }
    }
  }
}
```

### Migration Steps
1. Replace mock data fetching with GraphQL calls
2. Update query to match contract schema
3. Add proper error handling for network issues
4. Implement real-time updates for active seasons
5. Add caching for completed seasons

## 🎯 Advanced Features

### Potential Enhancements

1. **Historical Comparison**: Compare performance across seasons
2. **Team Analytics**: Aggregate team performance metrics
3. **Trend Analysis**: Track performance improvements over time
4. **Achievement System**: Season-specific achievements and milestones
5. **Social Features**: Compare with other players in same season

### Implementation Examples

```tsx
// Historical comparison
const { seasonPlayer: current } = useSeasonPlayer("2024");
const { seasonPlayer: previous } = useSeasonPlayer("2023");

// Performance trend
const improvement = current && previous ? 
  Number(current.season_points) - Number(previous.season_points) : 0;

// Team aggregation
const useTeamSeasonStats = (seasonId: string, clubId: string) => {
  // Aggregate all players in same club/season
};
```

## 📚 Related Documentation

- [OvergoalPlayer Hook](./overgoal-player-hook.md)
- [Dojo Model Update Guide](./model-update-guide-en.md)
- [System Extension Guide](./08-extending-system.md)

## 🎯 Next Steps

1. **Season Management**: Create season creation/management hooks
2. **Club Integration**: Implement club-specific functionality
3. **Match Integration**: Connect to match results system
4. **Leaderboards**: Season and club leaderboards
5. **Rewards System**: Season-end rewards and achievements

---

**Note**: This implementation provides a comprehensive foundation for season-based player management while maintaining compatibility with the existing Overgoal architecture patterns.
