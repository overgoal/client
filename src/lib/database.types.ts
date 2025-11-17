// Database types for Supabase
// These types should be generated from your Supabase schema
// Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > src/lib/database.types.ts

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          address: string
          created_at: string
          updated_at: string
          username: string | null
          last_login_at: string | null
          selected_player_id: string | null
          metadata: Record<string, any> | null
        }
        Insert: {
          address: string
          created_at?: string
          updated_at?: string
          username?: string | null
          last_login_at?: string | null
          selected_player_id?: string | null
          metadata?: Record<string, any> | null
        }
        Update: {
          address?: string
          created_at?: string
          updated_at?: string
          username?: string | null
          last_login_at?: string | null
          selected_player_id?: string | null
          metadata?: Record<string, any> | null
        }
      }
      players: {
        Row: {
          id: string
          link_id: string
          created_at: string
          updated_at: string
          player_name: string
          player_description: string | null
          player_category: 'bronze' | 'gold' | 'platinum'
          fame: number
          charisma: number
          stamina: number
          strength: number
          agility: number
          intelligence: number
          energy: number
          speed: number
          leadership: number
          pass: number
          shoot: number
          freekick: number
          universe_currency: number
          level: number
          experience: number
          body_type: number
          skin_color: number
          beard_type: number
          hair_type: number
          hair_color: number
          visor_type: number
          visor_color: number
          team_id: number
          owner_address: string | null
          is_available: boolean
          json_created_at: number | null
          json_last_updated_at: number | null
          json_last_login_at: number | null
          metadata: Record<string, any> | null
        }
        Insert: {
          id?: string
          link_id: string
          created_at?: string
          updated_at?: string
          player_name: string
          player_description?: string | null
          player_category: 'bronze' | 'gold' | 'platinum'
          fame: number
          charisma: number
          stamina: number
          strength: number
          agility: number
          intelligence: number
          energy: number
          speed: number
          leadership: number
          pass: number
          shoot: number
          freekick: number
          universe_currency?: number
          level?: number
          experience?: number
          body_type: number
          skin_color: number
          beard_type: number
          hair_type: number
          hair_color: number
          visor_type: number
          visor_color: number
          team_id?: number
          owner_address?: string | null
          is_available?: boolean
          json_created_at?: number | null
          json_last_updated_at?: number | null
          json_last_login_at?: number | null
          metadata?: Record<string, any> | null
        }
        Update: {
          id?: string
          link_id?: string
          created_at?: string
          updated_at?: string
          player_name?: string
          player_description?: string | null
          player_category?: 'bronze' | 'gold' | 'platinum'
          fame?: number
          charisma?: number
          stamina?: number
          strength?: number
          agility?: number
          intelligence?: number
          energy?: number
          speed?: number
          leadership?: number
          pass?: number
          shoot?: number
          freekick?: number
          universe_currency?: number
          level?: number
          experience?: number
          body_type?: number
          skin_color?: number
          beard_type?: number
          hair_type?: number
          hair_color?: number
          visor_type?: number
          visor_color?: number
          team_id?: number
          owner_address?: string | null
          is_available?: boolean
          json_created_at?: number | null
          json_last_updated_at?: number | null
          json_last_login_at?: number | null
          metadata?: Record<string, any> | null
        }
      }
      user_players: {
        Row: {
          id: string
          user_address: string
          player_id: string
          acquired_at: string
          is_active: boolean
          metadata: Record<string, any> | null
        }
        Insert: {
          id?: string
          user_address: string
          player_id: string
          acquired_at?: string
          is_active?: boolean
          metadata?: Record<string, any> | null
        }
        Update: {
          id?: string
          user_address?: string
          player_id?: string
          acquired_at?: string
          is_active?: boolean
          metadata?: Record<string, any> | null
        }
      }
      matches: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          player1_id: string
          player2_id: string
          winner_id: string | null
          status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          match_data: Record<string, any> | null
          season_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          player1_id: string
          player2_id: string
          winner_id?: string | null
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          match_data?: Record<string, any> | null
          season_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          player1_id?: string
          player2_id?: string
          winner_id?: string | null
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          match_data?: Record<string, any> | null
          season_id?: string | null
        }
      }
      seasons: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          start_date: string
          end_date: string
          status: 'upcoming' | 'active' | 'completed'
          max_participants: number | null
          current_participants: number
          prize_pool: number | null
          metadata: Record<string, any> | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          start_date: string
          end_date: string
          status?: 'upcoming' | 'active' | 'completed'
          max_participants?: number | null
          current_participants?: number
          prize_pool?: number | null
          metadata?: Record<string, any> | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          start_date?: string
          end_date?: string
          status?: 'upcoming' | 'active' | 'completed'
          max_participants?: number | null
          current_participants?: number
          prize_pool?: number | null
          metadata?: Record<string, any> | null
        }
      }
      leaderboards: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          player_id: string
          season_id: string | null
          wins: number
          losses: number
          draws: number
          points: number
          rank: number | null
          metadata: Record<string, any> | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          player_id: string
          season_id?: string | null
          wins?: number
          losses?: number
          draws?: number
          points?: number
          rank?: number | null
          metadata?: Record<string, any> | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          player_id?: string
          season_id?: string | null
          wins?: number
          losses?: number
          draws?: number
          points?: number
          rank?: number | null
          metadata?: Record<string, any> | null
        }
      }
    }
    Views: {
      // Add views here if you have any
    }
    Functions: {
      // Add functions here if you have any
    }
    Enums: {
      match_status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
      season_status: 'upcoming' | 'active' | 'completed'
    }
  }
}

// Helper types for easier usage
export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export type Player = Database['public']['Tables']['players']['Row']
export type PlayerInsert = Database['public']['Tables']['players']['Insert']
export type PlayerUpdate = Database['public']['Tables']['players']['Update']

export type UserPlayer = Database['public']['Tables']['user_players']['Row']
export type UserPlayerInsert = Database['public']['Tables']['user_players']['Insert']
export type UserPlayerUpdate = Database['public']['Tables']['user_players']['Update']

export type Match = Database['public']['Tables']['matches']['Row']
export type MatchInsert = Database['public']['Tables']['matches']['Insert']
export type MatchUpdate = Database['public']['Tables']['matches']['Update']

export type Season = Database['public']['Tables']['seasons']['Row']
export type SeasonInsert = Database['public']['Tables']['seasons']['Insert']
export type SeasonUpdate = Database['public']['Tables']['seasons']['Update']

export type Leaderboard = Database['public']['Tables']['leaderboards']['Row']
export type LeaderboardInsert = Database['public']['Tables']['leaderboards']['Insert']
export type LeaderboardUpdate = Database['public']['Tables']['leaderboards']['Update']

export type MatchStatus = Database['public']['Enums']['match_status']
export type SeasonStatus = Database['public']['Enums']['season_status']
