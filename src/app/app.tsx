import HomePage from "../components/pages/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginScreen from "../components/pages/LoginScreen";
import MatchResultScreen from "../components/pages/MatchResultScreen";
import MatchScreen from "../components/pages/MatchScreen";
import PreMatchScreen from "../components/pages/PreMatchScreen";

import { login, main, preMatch, match, matchResult } from "../routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path={login} element={<LoginScreen />} />
      <Route path={main} element={<HomePage />} />
      <Route path={preMatch} element={<PreMatchScreen />} />
      <Route path={match} element={<MatchScreen />} />
      <Route path={matchResult} element={<MatchResultScreen />} />
      </Routes>
    </BrowserRouter>
  )
} 

export default App;