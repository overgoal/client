import { create } from "zustand";

// Game state interface
interface GameState {
  game: null;
  ballPosition: [number, number, number] | null;
  isBallKicked: boolean;
}

// Game actions interface
interface GameActions {
  setGame: (game: null) => void;
  setBallPosition: (ballPosition: [number, number, number] | null) => void;
  resetBallPosition: () => void;
  setIsBallKicked: (isBallKicked: boolean) => void;
}

// Combined store type
type GameStore = GameState & GameActions;

// Initial state
const initialState: GameState = {
  game: null,
  ballPosition: null,
  isBallKicked: false,
};

// Create the store
export const useGameStore = create<GameStore>((set) => ({
  // Initial state
  ...initialState,

  // Actions
  setGame: (game) => set({ game }),

  setBallPosition: (ballPosition) => set({ ballPosition }),
  setIsBallKicked: (isBallKicked) => set({ isBallKicked }),
  resetBallPosition: () => set({ ballPosition: null }),
}));
