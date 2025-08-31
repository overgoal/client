import { z } from "zod";

// schema validation models

// Shared primitives
const uuid = z.string().uuid();
const datetime = z.date();

//Enums

// Match status
export enum MatchStatus {
    Started = "started",
    InProgress = "in_progress",
    HalfTime = "half_time",
    Finished = "finished",
  }
  
  // Event types
  export enum EventType {
    Training = "training",
    Personal = "personal",
    Social = "social",
    Injury = "injury",
    Other = "other",
  }
  
  // Action types
  export enum ActionType {
    OpenPlay = "open_play",
    SetPiece = "set_piece",
    CornerKick = "corner_kick",
    FreeKick = "free_kick",
    PenaltyKick = "penalty_kick",
    Other = "other",
  }
  
  // Match results
  export enum MatchActionResult {
    Positive = "positive",
    Negative = "negative",
  }
  


// ===== User & Player =====
export const User = z.object({
  id: uuid,
  username: z.string(),
  created_at: datetime,
});
export type User = z.infer<typeof User>;

export const Player = z.object({
  id: uuid,
  user_id: uuid,
  name: z.string(),
  created_at: datetime,
  last_updated_at: datetime,
  last_login_at: datetime.optional(),
  fame: z.number().int(),
  charisma: z.number().int(),
  stamina: z.number().int(),
  intelligence: z.number().int(),
  leadership: z.number().int(),
  universe_currency: z.number().int(),
});
export type Player = z.infer<typeof Player>;

export const OvergoalPlayer = z.object({
  player_id: uuid,
  goal_currency: z.number().int(),
  energy: z.number().int(),
  speed: z.number().int(),
  dribble: z.number().int(),
  pass: z.number().int(),
  vision: z.number().int(),
  freekick: z.number().int(),
  strength: z.number().int(),
  profile_image: z.string().url().nullable(),
  is_retired: z.boolean(),
});
export type OvergoalPlayer = z.infer<typeof OvergoalPlayer>;

export const NPC = z.object({
  id: uuid,
  name: z.string(),
  type: z.string(),
  level: z.number().int(),
});
export type NPC = z.infer<typeof NPC>;

// ===== Clubs & Seasons =====
export const Club = z.object({
  id: uuid,
  name: z.string(),
});
export type Club = z.infer<typeof Club>;

export const Season = z.object({
  id: uuid,
  name: z.string(),
  start_date: z.date(),
  end_date: z.date(),
  prize_pool: z.number(),
});
export type Season = z.infer<typeof Season>;

export const SeasonClub = z.object({
  id: uuid,
  season_id: uuid,
  club_id: uuid,
  manager_id: uuid,
  coach_id: uuid,
  season_points: z.number().int(),
  offense: z.number().int(),
  defense: z.number().int(),
  intensity: z.number().int(),
  chemistry: z.number().int(),
  matches_won: z.number().int(),
  matches_lost: z.number().int(),
  matches_drawn: z.number().int(),
});
export type SeasonClub = z.infer<typeof SeasonClub>;

export const SeasonPlayer = z.object({
  id: uuid,
  season_id: uuid,
  player_id: uuid,
  team_relationship: z.string(),
  season_points: z.number().int(),
  matches_won: z.number().int(),
  matches_lost: z.number().int(),
  trophies_won: z.number().int(),
});
export type SeasonPlayer = z.infer<typeof SeasonPlayer>;

// ===== Badges =====
export const Badge = z.object({
  id: uuid,
  name: z.string(),
  description: z.string(),
  skills_modifier: z.record(z.string(), z.number()),
});
export type Badge = z.infer<typeof Badge>;

export const PlayerBadge = z.object({
  player_id: uuid,
  badge_id: uuid,
});
export type PlayerBadge = z.infer<typeof PlayerBadge>;

// ===== Matches =====
export const Match = z.object({
  id: uuid,
  season_id: uuid,
  field_state_id: uuid.optional(),
  home_season_club_id: uuid,
  away_season_club_id: uuid,
  date: z.date(),
  home_score: z.number().int(),
  away_score: z.number().int(),
  current_time: z.number().int(),
  match_status: z.nativeEnum(MatchStatus),
});
export type Match = z.infer<typeof Match>;

export const FieldState = z.object({
  id: uuid,
  match_id: uuid,
  minute: z.number().int(),
  my_team_positions: z.array(z.tuple([z.number(), z.number()])),
  opponent_positions: z.array(z.tuple([z.number(), z.number()])),
  ball_position: z.tuple([z.number(), z.number()]),
  distance_to_goal: z.number(),
});
export type FieldState = z.infer<typeof FieldState>;

export const MatchDecision = z.object({
  id: uuid,
  match_id: uuid,
  player_id: uuid,
  minute: z.number().int(),
  type: z.string(),
  strength: z.string(),
  kick_position: z.string(),
});
export type MatchDecision = z.infer<typeof MatchDecision>;

export const MatchAction = z.object({
  id: uuid,
  match_id: uuid,
  season_club_id: uuid,
  player_id: uuid,
  type: z.nativeEnum(ActionType),
  result: z.nativeEnum(MatchActionResult),
  field_state_id: uuid,
  decision_id: uuid,
});
export type MatchAction = z.infer<typeof MatchAction>;

// ===== Events =====
export const NonMatchEvent = z.object({
  id: uuid,
  player_id: uuid,
  season_id: uuid,
  type: z.string(),
  title: z.string(),
  description: z.string(),
  outcome_type: z.string(),
});
export type NonMatchEvent = z.infer<typeof NonMatchEvent>;

export const NonMatchEventOutcome = z.object({
  id: uuid,
  non_match_event_id: uuid,
  description: z.string(),
  is_positive: z.boolean(),
  modified_stats: z.record(z.string(), z.number()),
  goal_earned: z.number().int(),
});
export type NonMatchEventOutcome = z.infer<typeof NonMatchEventOutcome>;

// ===== Aggregator =====
export const schema = {
  User,
  Player,
  OvergoalPlayer,
  NPC,
  Club,
  Season,
  SeasonClub,
  SeasonPlayer,
  Badge,
  PlayerBadge,
  Match,
  FieldState,
  MatchDecision,
  MatchAction,
  NonMatchEvent,
  NonMatchEventOutcome,
};
