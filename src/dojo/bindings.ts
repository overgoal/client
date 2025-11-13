import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

// Type definition for `universe::models::user::User` struct
export interface User {
  owner: string;
  username: string;
  created_at: number;
}

// Type definition for `universe::models::player::Player` struct
export interface Player {
  id: string;
  user_id: string;
  created_at: number;
  last_updated_at: number;
  last_login_at: number;
  fame: number;
  charisma: number;
  stamina: number;
  intelligence: number;
  leadership: number;
  universe_currency: number;
}

// Type definition for `achievement::events::index::TrophyCreation` struct
export interface TrophyCreation {
  id: number;
  hidden: boolean;
  index: number;
  points: number;
  start: number;
  end: number;
  group: number;
  icon: number;
  title: number;
  description: string;
  tasks: Array<Task>;
  data: string;
}

// Type definition for `achievement::events::index::TrophyCreationValue` struct
export interface TrophyCreationValue {
  hidden: boolean;
  index: number;
  points: number;
  start: number;
  end: number;
  group: number;
  icon: number;
  title: number;
  description: string;
  tasks: Array<Task>;
  data: string;
}

// Type definition for `achievement::events::index::TrophyProgression` struct
export interface TrophyProgression {
  player_id: number;
  task_id: number;
  count: number;
  time: number;
}

// Type definition for `achievement::events::index::TrophyProgressionValue` struct
export interface TrophyProgressionValue {
  count: number;
  time: number;
}

// Type definition for `achievement::types::index::Task` struct
export interface Task {
  id: number;
  total: number;
  description: string;
}

export interface SchemaType extends ISchemaType {
  universe: {
    User: User;
    Player: Player;
  };
  achievement: {
    TrophyCreation: TrophyCreation;
    TrophyCreationValue: TrophyCreationValue;
    TrophyProgression: TrophyProgression;
    TrophyProgressionValue: TrophyProgressionValue;
    Task: Task;
  };
}
export const schema: SchemaType = {
  universe: {
    User: {
      owner: "",
      username: "",
      created_at: 0,
    },
    Player: {
      id: "",
      user_id: "",
      created_at: 0,
      last_updated_at: 0,
      last_login_at: 0,
      fame: 0,
      charisma: 0,
      stamina: 0,
      intelligence: 0,
      leadership: 0,
      universe_currency: 0,
    },
  },
  achievement: {
    TrophyCreation: {
      id: 0,
      hidden: false,
      index: 0,
      points: 0,
      start: 0,
      end: 0,
      group: 0,
      icon: 0,
      title: 0,
      description: "",
      tasks: [{ id: 0, total: 0, description: "" }],
      data: "",
    },
    TrophyCreationValue: {
      hidden: false,
      index: 0,
      points: 0,
      start: 0,
      end: 0,
      group: 0,
      icon: 0,
      title: 0,
      description: "",
      tasks: [{ id: 0, total: 0, description: "" }],
      data: "",
    },
    TrophyProgression: {
      player_id: 0,
      task_id: 0,
      count: 0,
      time: 0,
    },
    TrophyProgressionValue: {
      count: 0,
      time: 0,
    },
    Task: {
      id: 0,
      total: 0,
      description: "",
    },
  },
};
export enum ModelsMapping {
  User = "universe-User",
  Player = "universe-Player",
  TrophyCreation = "achievement-TrophyCreation",
  TrophyCreationValue = "achievement-TrophyCreationValue",
  TrophyProgression = "achievement-TrophyProgression",
  TrophyProgressionValue = "achievement-TrophyProgressionValue",
  Task = "achievement-Task",
}
