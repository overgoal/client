import { useEffect, useState, useCallback, useMemo } from "react";
import { useAccount } from "@starknet-react/core";
import { addAddressPadding } from "starknet";
import { SeasonPlayer } from "../bindings";
import useAppStore from "../../zustand/store";
import mockSeasonPlayersData from "../../data/mock-season-players.json";

interface UseSeasonPlayerReturn {
  seasonPlayer: SeasonPlayer | null;
  isFetched: boolean;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  // Additional helper data
  seasonInfo: { name: string; status: string } | null;
  clubInfo: { name: string; color: string } | null;
}

// Mock data helper function
const getSeasonPlayerByAddress = (address: string, seasonId?: string): SeasonPlayer | null => {
  // For demo purposes, we'll map addresses to different season players
  // In a real implementation, this would be based on actual user data and selected season
  const targetSeasonId = seasonId || "2024"; // Default to current season
  
  // Filter players by season first
  const seasonPlayers = mockSeasonPlayersData.season_players.filter(
    player => player.season_id === targetSeasonId
  );
  
  if (seasonPlayers.length === 0) {
    return mockSeasonPlayersData.default_season_player;
  }
  
  const addressHash = address.slice(-1); // Use last character of address
  const playerIndex = parseInt(addressHash, 16) % seasonPlayers.length;
  
  const mockPlayer = seasonPlayers[playerIndex] || mockSeasonPlayersData.default_season_player;
  
  return {
    id: mockPlayer.id,
    season_id: mockPlayer.season_id,
    season_club_id: mockPlayer.season_club_id,
    overgoal_player_id: mockPlayer.overgoal_player_id,
    team_relationship: mockPlayer.team_relationship,
    fans_relationship: mockPlayer.fans_relationship,
    season_points: mockPlayer.season_points,
    matches_won: mockPlayer.matches_won,
    matches_lost: mockPlayer.matches_lost,
    trophies_won: mockPlayer.trophies_won,
  };
};

// Helper to get season info
const getSeasonInfo = (seasonId: string) => {
  const seasons = mockSeasonPlayersData.seasons as Record<string, { name: string; status: string }>;
  return seasons[seasonId] || null;
};

// Helper to get club info
const getClubInfo = (clubId: string) => {
  const clubs = mockSeasonPlayersData.clubs as Record<string, { name: string; color: string }>;
  return clubs[clubId] || null;
};

// Function to simulate fetching season player data (using mock data)
const fetchSeasonPlayerData = async (
  userAddress: string,
  seasonId?: string,
): Promise<{
  seasonPlayer: SeasonPlayer | null;
  seasonInfo: { name: string; status: string } | null;
  clubInfo: { name: string; color: string } | null;
}> => {
  try {
    console.log("🔍 Fetching season player with address:", userAddress, "season:", seasonId);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const seasonPlayerData = getSeasonPlayerByAddress(userAddress, seasonId);
    
    if (!seasonPlayerData) {
      console.log("❌ No season player found for address");
      return {
        seasonPlayer: null,
        seasonInfo: null,
        clubInfo: null,
      };
    }

    const seasonInfo = getSeasonInfo(seasonPlayerData.season_id.toString());
    const clubInfo = getClubInfo(seasonPlayerData.season_club_id.toString());

    console.log("✅ Mock season player data:", {
      seasonPlayer: seasonPlayerData,
      seasonInfo,
      clubInfo,
    });

    return {
      seasonPlayer: seasonPlayerData,
      seasonInfo,
      clubInfo,
    };
  } catch (error) {
    console.error("❌ Error fetching season player:", error);
    throw error;
  }
};

// Main hook
export const useSeasonPlayer = (seasonId?: string): UseSeasonPlayerReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [seasonInfo, setSeasonInfo] = useState<{ name: string; status: string } | null>(null);
  const [clubInfo, setClubInfo] = useState<{ name: string; color: string } | null>(null);
  const { account } = useAccount();

  const storeSeasonPlayer = useAppStore((state) => state.seasonPlayer);
  const setSeasonPlayer = useAppStore((state) => state.setSeasonPlayer);

  const userAddress = useMemo(
    () => (account ? addAddressPadding(account.address).toLowerCase() : ""),
    [account],
  );

  const refetch = useCallback(async () => {
    if (!userAddress) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const { seasonPlayer, seasonInfo: fetchedSeasonInfo, clubInfo: fetchedClubInfo } = 
        await fetchSeasonPlayerData(userAddress, seasonId);
      
      console.log("🎮 Season player data fetched:", seasonPlayer);

      setSeasonPlayer(seasonPlayer);
      setSeasonInfo(fetchedSeasonInfo);
      setClubInfo(fetchedClubInfo);

      // Reduced delay since we're using mock data
      await new Promise((resolve) => setTimeout(resolve, 300));

      setIsFetched(true);

      const updatedSeasonPlayer = useAppStore.getState().seasonPlayer;
      console.log(
        "💾 Season player in store after update:",
        updatedSeasonPlayer,
      );
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred");
      console.error("❌ Error in refetch:", error);
      setError(error);
      setSeasonPlayer(null);
      setSeasonInfo(null);
      setClubInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, [userAddress, seasonId, setSeasonPlayer]);

  useEffect(() => {
    if (userAddress) {
      console.log("🔄 Address or season changed, refetching season player data");
      refetch();
    }
  }, [userAddress, seasonId, refetch]);

  useEffect(() => {
    if (!account) {
      console.log("❌ No account, clearing season player data");
      setSeasonPlayer(null);
      setSeasonInfo(null);
      setClubInfo(null);
      setError(null);
      setIsLoading(false);
    }
  }, [account, setSeasonPlayer]);

  return {
    seasonPlayer: storeSeasonPlayer,
    isFetched,
    isLoading,
    error,
    refetch,
    seasonInfo,
    clubInfo,
  };
};
