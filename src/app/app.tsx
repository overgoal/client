import { Routes, Route, BrowserRouter } from "react-router";

// Import existing page components
import HomePage from "./(main)/Home/HomePage";
import LoginScreen from "./(login)/Login/LoginScreen";
import MatchResultScreen from "./(main)/Match-Result/MatchResultScreen";
import MatchScreen from "./(main)/Match/MatchScreen";
import PreNonMatchScreen from "./(main)/Pre-Match/PreMatchScreenNonMatch";
import PreMatchScreen from "./(main)/Pre-Match/pre-match";

// import HomeScreen from "./routes/Home";
import MarketScreen from "./(main)/Market/MarketScreen";
import CareerScreen from "./(main)/Career/CareerScreen";
import SeasonsScreen from "./(main)/Seasons/SeasonsScreen";
import SeasonScreen from "./(main)/Season/SeasonScreen";
import SeasonClubScreen from "./(main)/Season-Club/SeasonClubScreen";
import TournamentsScreen from "./(main)/Tournaments/TournamentsScreen";
import TournamentScreen from "./(main)/Tournament/TournamentScreen";
import ProfileScreen from "./(main)/Profile/ProfileScreen";

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
  characterCreation,
  preMatchNonMatch,
} from "../routes";
import CharacterCreationScreen from "./(login)/CharacterCreation/CharacterCreationScreen";
import CardScreen from "./(main)/CardScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthenticated routes */}
        <Route path={login} element={<LoginScreen />} />

        {/* Authenticated routes */}
        <Route path={characterCreation} element={<CharacterCreationScreen />} />
        <Route path={main} element={<HomePage />} />
        <Route path={preMatchNonMatch} element={<PreNonMatchScreen />} />
        <Route path={preMatch} element={<PreMatchScreen />} />
        <Route path={match} element={<MatchScreen />} />
        <Route path={matchResult} element={<MatchResultScreen />} />
        <Route path={market} element={<MarketScreen />} />
        <Route path={career} element={<CareerScreen />} />
        <Route path={seasons} element={<SeasonsScreen />} />
        <Route path={season} element={<SeasonScreen />} />
        <Route path={seasonClub} element={<SeasonClubScreen />} />
        <Route path={tournamentAll} element={<TournamentsScreen />} />
        <Route path={tournamentCurrent} element={<TournamentScreen />} />
        <Route path={profile} element={<ProfileScreen />} />
        <Route path={"/card"} element={<CardScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
