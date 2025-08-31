import { Routes, Route, BrowserRouter } from "react-router";

// Import existing page components
import HomePage from "./(main)/Home/HomePage";
import LoginScreen from "./(main)/Login/LoginScreen";
import MatchResultScreen from "./(main)/Match-Result/MatchResultScreen";
import MatchScreen from "./(main)/Match/MatchScreen";
import PreMatchScreen from "./(main)/Pre-Match/PreMatchScreen";

// import HomeScreen from "./routes/Home";
import MarketScreen from "./(main)/Market/MarketScreen";
import CareerScreen from "./(main)/Career/CareerScreen";
import SeasonsScreen from "./(main)/Seasons/SeasonsScreen";
import SeasonScreen from "./(main)/Season/SeasonScreen";
import SeasonClubScreen from "./(main)/Season-Club/SeasonClubScreen";
import TournamentsScreen from "./(main)/Tournaments/TournamentsScreen";
import TournamentScreen from "./(main)/Tournament/TournamentScreen";
import ProfileScreen from "./(main)/Profile/ProfileScreen";
import PlayerStatsScreen from "./(main)/Player-Stats/PlayerStatsScreen";

// Import all routes
import {
  main,
  login,
  market,
  career,
  seasons,
  season,
  seasonClub,
  tournamentAll,
  tournamentCurrent,
  profile,
  preMatch,
  match,
  matchResult,
  playerStats,
} from "../routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Existing routes */}
        <Route path={login} element={<LoginScreen />} />
        <Route path={main} element={<HomePage />} />
        <Route path={preMatch} element={<PreMatchScreen />} />
        <Route path={match} element={<MatchScreen />} />
        <Route path={matchResult} element={<MatchResultScreen />} />

        {/* New routes */}
        <Route path={market} element={<MarketScreen />} />
        <Route path={career} element={<CareerScreen />} />
        <Route path={seasons} element={<SeasonsScreen />} />
        <Route path={season} element={<SeasonScreen />} />
        <Route path={seasonClub} element={<SeasonClubScreen />} />
        <Route path={tournamentAll} element={<TournamentsScreen />} />
        <Route path={tournamentCurrent} element={<TournamentScreen />} />
        <Route path={profile} element={<ProfileScreen />} />
        <Route path={playerStats} element={<PlayerStatsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
