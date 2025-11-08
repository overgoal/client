import { create } from "zustand";
import { persist } from "zustand/middleware";

import { OvergoalPlayer, Player } from "../lib/schema";

// Application state
interface AppState {
  // Player data
  player: Player | null;
  overgoalPlayer: OvergoalPlayer | null;
  // UI state
  isLoading: boolean;
  error: string | null;

  // Game state
  gameStarted: boolean;
}

// Store actions
interface AppActions {
  // Player actions
  setPlayer: (player: Player | null) => void;
  setOvergoalPlayer: (overgoalPlayer: OvergoalPlayer | null) => void;

  // overgoal player actions
  getPlayer: () => Player | null;
  getOvergoalPlayer: () => OvergoalPlayer | null;

  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Utility actions
  resetStore: () => void;
}

// Combine state and actions
type AppStore = AppState & AppActions;

// Initial state
const initialState: AppState = {
  player: null,
  overgoalPlayer: null,
  isLoading: false,
  error: null,
  gameStarted: false,
};

// Create the store
const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      ...initialState,

      // Player actions
      setPlayer: (player) => set({ player }),
      setOvergoalPlayer: (overgoalPlayer) => set({ overgoalPlayer }),
      getPlayer: () => get().player,
      getOvergoalPlayer: () => get().overgoalPlayer,

      // UI actions
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // Utility actions
      resetStore: () => set(initialState),
    }),
    {
      name: "overgoal-store",
      partialize: (state) => ({
        player: state.player,
        gameStarted: state.gameStarted,
      }),
    },
  ),
);

export default useAppStore;
