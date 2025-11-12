// Pre game
export const login = "/login";
export const characterCreation = "/character-creation/:playerId";

// Game
export const main = "/";
export const home = "/home";
export const market = "/market";

// Seasons and tournaments
export const seasons = "/seasons";
export const season = "/season/:seasonId";
export const seasonClub = "/season-club/:seasonId/:clubId";
export const tournamentAll = "/tournaments";
export const tournamentCurrent = "/tournament/:tournamentId";

//User
export const profile = "/profile/:playerId";
export const career = "/career";

// Match
export const preMatch = "/pre-match/:matchId";
export const preMatchNonMatch = "/pre-match-non-match";
export const match = "/match/:matchId";
export const matchResult = "/match-result/:matchId";

//Card
export const claim = "/claim/:id";

//Settings
export const settings = "/settings";
