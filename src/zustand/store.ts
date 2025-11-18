import { create } from "zustand";
import { persist } from "zustand/middleware";

import { 
  UniversePlayer, 
  OvergoalPlayer, 
  User,
  Season,
  Club,
  SeasonClub,
  SeasonPlayer
} from "../dojo/bindings";

// Application state
interface AppState {
  // User & Player data
  user: User | null;
  universePlayer: UniversePlayer | null;
  overgoalPlayer: OvergoalPlayer | null;
  seasonPlayer: SeasonPlayer | null;
  
  // Game world data
  currentSeason: Season | null;
  playerClub: Club | null;
  seasonClub: SeasonClub | null;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Claim flow state
  isClaimingPlayer: boolean;
  claimSuccess: boolean;
}

// Store actions
interface AppActions {
  // User actions
  setUser: (user: User | null) => void;
  getUser: () => User | null;

  
  // Player actions
  setUniversePlayer: (player: UniversePlayer | null) => void;
  setOvergoalPlayer: (overgoalPlayer: OvergoalPlayer | null) => void;
  setSeasonPlayer: (seasonPlayer: SeasonPlayer | null) => void;
  
  getUniversePlayer: () => UniversePlayer | null;
  getOvergoalPlayer: () => OvergoalPlayer | null;
  getSeasonPlayer: () => SeasonPlayer | null;
  
  // Game world actions
  setCurrentSeason: (season: Season | null) => void;
  setPlayerClub: (club: Club | null) => void;
  setSeasonClub: (seasonClub: SeasonClub | null) => void;

  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Claim flow actions
  setIsClaimingPlayer: (claiming: boolean) => void;
  setClaimSuccess: (success: boolean) => void;

  // Utility actions
  resetStore: () => void;
}

// Combine state and actions
type AppStore = AppState & AppActions;

// Initial state
const initialState: AppState = {
  user: null,
  universePlayer: null,
  overgoalPlayer: null,
  seasonPlayer: null,
  currentSeason: null,
  playerClub: null,
  seasonClub: null,
  isLoading: false,
  error: null,
  isClaimingPlayer: false,
  claimSuccess: false,
};

// Create the store
const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      ...initialState,

      // User actions
      setUser: (user) => set({ user }),
      getUser: () => get().user,

      // Player actions
      setUniversePlayer: (universePlayer) => set({ universePlayer }),
      setOvergoalPlayer: (overgoalPlayer) => set({ overgoalPlayer }),
      setSeasonPlayer: (seasonPlayer) => set({ seasonPlayer }),
      
      getUniversePlayer: () => get().universePlayer,
      getOvergoalPlayer: () => get().overgoalPlayer,
      getSeasonPlayer: () => get().seasonPlayer,
      
      // Game world actions
      setCurrentSeason: (currentSeason) => set({ currentSeason }),
      setPlayerClub: (playerClub) => set({ playerClub }),
      setSeasonClub: (seasonClub) => set({ seasonClub }),

      // UI actions
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
      // Claim flow actions
      setIsClaimingPlayer: (isClaimingPlayer) => set({ isClaimingPlayer }),
      setClaimSuccess: (claimSuccess) => set({ claimSuccess }),

      // Utility actions
      resetStore: () => set(initialState),
    }),
    {
      name: "overgoal-store",
      partialize: (state) => ({
        user: state.user,
        universePlayer: state.universePlayer,
        overgoalPlayer: state.overgoalPlayer,
        seasonPlayer: state.seasonPlayer,
        currentSeason: state.currentSeason,
        playerClub: state.playerClub,
        seasonClub: state.seasonClub,
      }),
    },
  ),
);

export default useAppStore;
