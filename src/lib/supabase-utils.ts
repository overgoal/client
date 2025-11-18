import { supabase } from './supabase'
import type { 
  User,
  UserInsert,
  UserUpdate,
  Player, 
  PlayerInsert,
  UserPlayer,
  UserPlayerInsert,
  Match, 
  MatchInsert,
  Season,
  Leaderboard 
} from './database.types'

// Database utility functions for common operations

/**
 * User utilities
 */
export const userUtils = {
  // Get user by address
  async getByAddress(address: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('address', address)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // No data found
      throw error
    }

    return data
  },

  // Create or update user (upsert)
  async upsert(userData: UserInsert): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .upsert(userData, { 
        onConflict: 'address',
        ignoreDuplicates: false 
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update user
  async update(address: string, updates: UserUpdate): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('address', address)
      .select()
      .single()

    if (error) throw error
    return data
  }
}

/**
 * Player utilities
 */
export const playerUtils = {
  // Get all available players
  async getAvailable(): Promise<Player[]> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('is_available', true)
      .order('player_category', { ascending: false }) // platinum, gold, bronze
      .order('fame', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get player by ID
  async getById(id: string): Promise<Player | null> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // No data found
      throw error
    }

    return data
  },

  // Get player by link_id
  async getByLinkId(linkId: string): Promise<Player | null> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('link_id', linkId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // No data found
      throw error
    }

    return data
  },

  // Get players by category
  async getByCategory(category: 'bronze' | 'gold' | 'platinum'): Promise<Player[]> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('player_category', category)
      .eq('is_available', true)
      .order('fame', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get players by team
  async getByTeam(teamId: number): Promise<Player[]> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('team_id', teamId)
      .order('fame', { ascending: false })

    if (error) throw error
    return data || []
  }
}

/**
 * User-Player relationship utilities
 */
export const userPlayerUtils = {
  // Get user's players
  async getUserPlayers(userAddress: string): Promise<(UserPlayer & { player: Player })[]> {
    const { data, error } = await supabase
      .from('user_players')
      .select(`
        *,
        player:players(*)
      `)
      .eq('user_address', userAddress)
      .order('acquired_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get user's active player
  async getActivePlayer(userAddress: string): Promise<Player | null> {
    const { data, error } = await supabase
      .from('user_players')
      .select(`
        player:players(*)
      `)
      .eq('user_address', userAddress)
      .eq('is_active', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // No data found
      throw error
    }

    return data?.player || null
  },

  // Assign player to user
  async assignPlayer(userAddress: string, playerId: string, setAsActive: boolean = false): Promise<UserPlayer> {
    const { data, error } = await supabase
      .from('user_players')
      .insert({
        user_address: userAddress,
        player_id: playerId,
        is_active: setAsActive
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Set active player
  async setActivePlayer(userAddress: string, playerId: string): Promise<UserPlayer> {
    const { data, error } = await supabase
      .from('user_players')
      .update({ is_active: true })
      .eq('user_address', userAddress)
      .eq('player_id', playerId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update player stats
  async updateStats(
    playerId: string, 
    stats: {
      experience?: number
      coins?: number
      health?: number
      energy?: number
      stamina?: number
      shoot?: number
      dribble?: number
    }
  ): Promise<Player> {
    const { data, error } = await supabase
      .from('players')
      .update({
        ...stats,
        updated_at: new Date().toISOString(),
        last_action_timestamp: new Date().toISOString()
      })
      .eq('id', playerId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get top players by experience
  async getTopPlayers(limit: number = 10): Promise<Player[]> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('experience', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  },

  // Check if player can perform action (based on stamina/energy)
  async canPerformAction(playerId: string, requiredStamina: number = 10): Promise<boolean> {
    const { data, error } = await supabase
      .from('players')
      .select('stamina, energy')
      .eq('id', playerId)
      .single()

    if (error) throw error
    return (data?.stamina || 0) >= requiredStamina
  }
}

/**
 * Match utilities
 */
export const matchUtils = {
  // Create a new match
  async create(matchData: MatchInsert): Promise<Match> {
    const { data, error } = await supabase
      .from('matches')
      .insert(matchData)
      .select(`
        *,
        player1:players!matches_player1_id_fkey(*),
        player2:players!matches_player2_id_fkey(*),
        winner:players!matches_winner_id_fkey(*)
      `)
      .single()

    if (error) throw error
    return data
  },

  // Get matches for a player
  async getPlayerMatches(playerId: string, limit: number = 20): Promise<Match[]> {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        player1:players!matches_player1_id_fkey(*),
        player2:players!matches_player2_id_fkey(*),
        winner:players!matches_winner_id_fkey(*)
      `)
      .or(`player1_id.eq.${playerId},player2_id.eq.${playerId}`)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  },

  // Update match result
  async updateResult(
    matchId: string, 
    winnerId: string | null, 
    matchData?: Record<string, any>
  ): Promise<Match> {
    const { data, error } = await supabase
      .from('matches')
      .update({
        winner_id: winnerId,
        status: 'completed',
        match_data: matchData,
        updated_at: new Date().toISOString()
      })
      .eq('id', matchId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get recent matches
  async getRecentMatches(limit: number = 10): Promise<Match[]> {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        player1:players!matches_player1_id_fkey(id, player_name, player_category),
        player2:players!matches_player2_id_fkey(id, player_name, player_category),
        winner:players!matches_winner_id_fkey(id, player_name, player_category)
      `)
      .eq('status', 'completed')
      .order('updated_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }
}

/**
 * Season utilities
 */
export const seasonUtils = {
  // Get current active season
  async getCurrentSeason(): Promise<Season | null> {
    const { data, error } = await supabase
      .from('seasons')
      .select('*')
      .eq('status', 'active')
      .order('start_date', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // No active season
      throw error
    }

    return data
  },

  // Get all seasons
  async getAll(): Promise<Season[]> {
    const { data, error } = await supabase
      .from('seasons')
      .select('*')
      .order('start_date', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Check if season is active
  async isSeasonActive(seasonId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('seasons')
      .select('status, start_date, end_date')
      .eq('id', seasonId)
      .single()

    if (error) return false

    const now = new Date()
    const startDate = new Date(data.start_date)
    const endDate = new Date(data.end_date)

    return data.status === 'active' && now >= startDate && now <= endDate
  }
}

/**
 * Leaderboard utilities
 */
export const leaderboardUtils = {
  // Get leaderboard for a season
  async getSeasonLeaderboard(seasonId?: string, limit: number = 50): Promise<Leaderboard[]> {
    let query = supabase
      .from('leaderboards')
      .select(`
        *,
        player:players(id, player_name, player_category, level, experience, fame)
      `)
      .order('rank', { ascending: true })
      .limit(limit)

    if (seasonId) {
      query = query.eq('season_id', seasonId)
    }

    const { data, error } = await query

    if (error) throw error
    return data || []
  },

  // Update player leaderboard stats
  async updatePlayerStats(
    playerId: string,
    seasonId: string | null,
    stats: {
      wins?: number
      losses?: number
      draws?: number
      points?: number
    }
  ): Promise<Leaderboard> {
    const { data, error } = await supabase
      .from('leaderboards')
      .upsert({
        player_id: playerId,
        season_id: seasonId,
        ...stats,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'player_id,season_id',
        ignoreDuplicates: false
      })
      .select(`
        *,
        player:players(id, player_name, player_category, level, experience, fame)
      `)
      .single()

    if (error) throw error
    return data
  },

  // Get player's leaderboard position
  async getPlayerPosition(playerId: string, seasonId?: string): Promise<Leaderboard | null> {
    let query = supabase
      .from('leaderboards')
      .select(`
        *,
        player:players(id, player_name, player_category, level, experience, fame)
      `)
      .eq('player_id', playerId)

    if (seasonId) {
      query = query.eq('season_id', seasonId)
    }

    const { data, error } = await query.single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return data
  }
}

/**
 * Real-time subscription utilities
 */
export const realtimeUtils = {
  // Subscribe to player changes
  subscribeToPlayer(playerId: string, callback: (player: Player) => void) {
    return supabase
      .channel(`player-${playerId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players',
          filter: `id=eq.${playerId}`,
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            callback(payload.new as Player)
          }
        }
      )
      .subscribe()
  },

  // Subscribe to match updates
  subscribeToMatches(playerId: string, callback: (match: Match) => void) {
    return supabase
      .channel(`matches-${playerId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'matches',
          filter: `or(player1_id.eq.${playerId},player2_id.eq.${playerId})`,
        },
        (payload) => {
          callback(payload.new as Match)
        }
      )
      .subscribe()
  },

  // Subscribe to leaderboard changes
  subscribeToLeaderboard(seasonId: string | null, callback: (leaderboard: Leaderboard) => void) {
    const filter = seasonId ? `season_id=eq.${seasonId}` : 'season_id=is.null'
    
    return supabase
      .channel(`leaderboard-${seasonId || 'global'}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leaderboards',
          filter,
        },
        (payload) => {
          callback(payload.new as Leaderboard)
        }
      )
      .subscribe()
  }
}

/**
 * Batch operations
 */
export const batchUtils = {
  // Update multiple players at once
  async updateMultiplePlayers(updates: Array<{ id: string; data: Partial<Player> }>): Promise<Player[]> {
    const promises = updates.map(({ id, data }) =>
      supabase
        .from('players')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()
    )

    const results = await Promise.all(promises)
    
    // Check for errors
    const errors = results.filter(result => result.error)
    if (errors.length > 0) {
      throw new Error(`Batch update failed: ${errors.map(e => e.error?.message).join(', ')}`)
    }

    return results.map(result => result.data).filter(Boolean) as Player[]
  },

  // Create multiple matches
  async createMultipleMatches(matches: MatchInsert[]): Promise<Match[]> {
    const { data, error } = await supabase
      .from('matches')
      .insert(matches)
      .select()

    if (error) throw error
    return data || []
  }
}

/**
 * Analytics utilities
 */
export const analyticsUtils = {
  // Get player statistics
  async getPlayerStats(playerId: string) {
    const [playerData, matchesData, leaderboardData] = await Promise.all([
      supabase.from('players').select('*').eq('id', playerId).single(),
      supabase.from('matches').select('*').or(`player1_id.eq.${playerId},player2_id.eq.${playerId}`),
      supabase.from('leaderboards').select('*').eq('player_id', playerId)
    ])

    if (playerData.error) throw playerData.error

    const matches = matchesData.data || []
    const wins = matches.filter(m => m.winner_id === playerId).length
    const losses = matches.filter(m => m.status === 'completed' && m.winner_id && m.winner_id !== playerId).length
    const draws = matches.filter(m => m.status === 'completed' && !m.winner_id).length

    return {
      player: playerData.data,
      totalMatches: matches.length,
      wins,
      losses,
      draws,
      winRate: matches.length > 0 ? (wins / matches.length) * 100 : 0,
      leaderboardEntries: leaderboardData.data || []
    }
  },

  // Get global statistics
  async getGlobalStats() {
    const [playersCount, matchesCount, activeSeasons] = await Promise.all([
      supabase.from('players').select('id', { count: 'exact', head: true }),
      supabase.from('matches').select('id', { count: 'exact', head: true }),
      supabase.from('seasons').select('*').eq('status', 'active')
    ])

    return {
      totalPlayers: playersCount.count || 0,
      totalMatches: matchesCount.count || 0,
      activeSeasons: activeSeasons.data || []
    }
  }
}
