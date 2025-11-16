import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Player } from "../lib/schema";
import { OvergoalPlayer, SeasonPlayer } from "../dojo/bindings";

// Application state
interface AppState {
  // Player data
  player: Player | null;
  overgoalPlayer: OvergoalPlayer | null;
  seasonPlayer: SeasonPlayer | null;
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
  setSeasonPlayer: (seasonPlayer: SeasonPlayer | null) => void;

  // Player getters
  getPlayer: () => Player | null;
  getOvergoalPlayer: () => OvergoalPlayer | null;
  getSeasonPlayer: () => SeasonPlayer | null;

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
  seasonPlayer: null,
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
      setSeasonPlayer: (seasonPlayer) => set({ seasonPlayer }),
      getPlayer: () => get().player,
      getOvergoalPlayer: () => get().overgoalPlayer,
      getSeasonPlayer: () => get().seasonPlayer,

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
        overgoalPlayer: state.overgoalPlayer,
        seasonPlayer: state.seasonPlayer,
        gameStarted: state.gameStarted,
      }),
    },
  ),
);

export default useAppStore;
