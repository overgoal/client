import { useEffect, useState, useCallback, useMemo } from "react";
import { useAccount } from "@starknet-react/core";
import { addAddressPadding } from "starknet";
import { OvergoalPlayer } from "../bindings";
import useAppStore from "../../zustand/store";
import mockPlayersData from "../../data/mock-overgoal-players.json";

interface UseOvergoalPlayerReturn {
  overgoalPlayer: OvergoalPlayer | null;
  isFetched: boolean;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Mock data helper function
const getPlayerByAddress = (address: string): OvergoalPlayer | null => {
  // For demo purposes, we'll map addresses to different players
  // In a real implementation, this would be based on actual user data
  const addressHash = address.slice(-1); // Use last character of address
  const playerIndex = parseInt(addressHash, 16) % mockPlayersData.players.length;
  
  const mockPlayer = mockPlayersData.players[playerIndex] || mockPlayersData.default_player;
  
  return {
    id: mockPlayer.id,
    universe_player_id: mockPlayer.universe_player_id,
    goal_currency: mockPlayer.goal_currency,
    energy: mockPlayer.energy,
    speed: mockPlayer.speed,
    leadership: mockPlayer.leadership,
    pass: mockPlayer.pass,
    shoot: mockPlayer.shoot,
    freekick: mockPlayer.freekick,
    is_injured: mockPlayer.is_injured,
    visor_type: mockPlayer.visor_type,
    visor_color: mockPlayer.visor_color,
    player_category: mockPlayer.player_category,
    player_name: mockPlayer.player_name,
    player_description: mockPlayer.player_description,
  };
};

// Function to simulate fetching overgoal player data (using mock data)
const fetchOvergoalPlayerData = async (
  userAddress: string,
): Promise<OvergoalPlayer | null> => {
  try {
    console.log("🔍 Fetching overgoal player with address:", userAddress);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const playerData = getPlayerByAddress(userAddress);
    
    if (!playerData) {
      console.log("❌ No overgoal player found for address");
      return null;
    }

    console.log("✅ Mock overgoal player data:", playerData);
    return playerData;
  } catch (error) {
    console.error("❌ Error fetching overgoal player:", error);
    throw error;
  }
};

// Main hook
export const useOvergoalPlayer = (): UseOvergoalPlayerReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { account } = useAccount();

  const storeOvergoalPlayer = useAppStore((state) => state.overgoalPlayer);
  const setOvergoalPlayer = useAppStore((state) => state.setOvergoalPlayer);

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

      const overgoalPlayerData = await fetchOvergoalPlayerData(userAddress);
      console.log("🎮 Overgoal player data fetched:", overgoalPlayerData);

      setOvergoalPlayer(overgoalPlayerData);

      // Reduced delay since we're using mock data
      await new Promise((resolve) => setTimeout(resolve, 300));

      setIsFetched(true);

      const updatedOvergoalPlayer = useAppStore.getState().overgoalPlayer;
      console.log(
        "💾 Overgoal player in store after update:",
        updatedOvergoalPlayer,
      );
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred");
      console.error("❌ Error in refetch:", error);
      setError(error);
      setOvergoalPlayer(null);
    } finally {
      setIsLoading(false);
    }
  }, [userAddress, setOvergoalPlayer]);

  useEffect(() => {
    if (userAddress) {
      console.log("🔄 Address changed, refetching overgoal player data");
      refetch();
    }
  }, [userAddress, refetch]);

  useEffect(() => {
    if (!account) {
      console.log("❌ No account, clearing overgoal player data");
      setOvergoalPlayer(null);
      setError(null);
      setIsLoading(false);
    }
  }, [account, setOvergoalPlayer]);

  return {
    overgoalPlayer: storeOvergoalPlayer,
    isFetched,
    isLoading,
    error,
    refetch,
  };
};
