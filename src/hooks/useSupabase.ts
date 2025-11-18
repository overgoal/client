import { useCallback, useEffect, useState } from 'react'
import { supabase, handleSupabaseError } from '../lib/supabase'
import type {
  User,
  UserInsert,
  Player,
  UserPlayer,
  Match,
  MatchInsert,
  Season,
  Leaderboard
} from '../lib/database.types'

// Generic hook for database operations
export function useSupabaseQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const executeQuery = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await queryFn()
      
      if (result.error) {
        setError(handleSupabaseError(result.error))
        setData(null)
      } else {
        setData(result.data)
        setError(null)
      }
    } catch (err) {
      setError(handleSupabaseError(err))
      setData(null)
    } finally {
      setLoading(false)
    }
  }, dependencies)

  useEffect(() => {
    executeQuery()
  }, [executeQuery])

  const refetch = useCallback(() => {
    executeQuery()
  }, [executeQuery])

  return { data, loading, error, refetch }
}

// User-specific hooks
export function useUser(address: string | null) {
  return useSupabaseQuery(
    async () => {
      if (!address) return { data: null, error: null }
      
      return await supabase
        .from('users')
        .select('*')
        .eq('address', address)
        .single()
    },
    [address]
  )
}

// Player-specific hooks
export function usePlayer(playerId: string | null) {
  return useSupabaseQuery(
    async () => {
      if (!playerId) return { data: null, error: null }
      
      return await supabase
        .from('players')
        .select('*')
        .eq('id', playerId)
        .single()
    },
    [playerId]
  )
}

export function useAvailablePlayers() {
  return useSupabaseQuery(
    async () => {
      return await supabase
        .from('players')
        .select('*')
        .eq('is_available', true)
        .order('player_category', { ascending: false })
        .order('fame', { ascending: false })
    },
    []
  )
}

export function useUserPlayers(userAddress: string | null) {
  return useSupabaseQuery(
    async () => {
      if (!userAddress) return { data: null, error: null }
      
      return await supabase
        .from('user_players')
        .select(`
          *,
          player:players(*)
        `)
        .eq('user_address', userAddress)
        .order('acquired_at', { ascending: false })
    },
    [userAddress]
  )
}

export function useActivePlayer(userAddress: string | null) {
  return useSupabaseQuery(
    async () => {
      if (!userAddress) return { data: null, error: null }
      
      return await supabase
        .from('user_players')
        .select(`
          player:players(*)
        `)
        .eq('user_address', userAddress)
        .eq('is_active', true)
        .single()
    },
    [userAddress]
  )
}

export function useCreateUser() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createUser = useCallback(async (userData: UserInsert): Promise<User | null> => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: supabaseError } = await supabase
        .from('users')
        .insert(userData)
        .select()
        .single()

      if (supabaseError) {
        const errorMessage = handleSupabaseError(supabaseError)
        setError(errorMessage)
        throw new Error(errorMessage)
      }

      return data
    } catch (err) {
      const errorMessage = handleSupabaseError(err)
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { createUser, loading, error }
}

export function useAssignPlayer() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const assignPlayer = useCallback(async (
    userAddress: string, 
    playerId: string, 
    setAsActive: boolean = false
  ): Promise<UserPlayer | null> => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: supabaseError } = await supabase
        .from('user_players')
        .insert({
          user_address: userAddress,
          player_id: playerId,
          is_active: setAsActive
        })
        .select()
        .single()

      if (supabaseError) {
        const errorMessage = handleSupabaseError(supabaseError)
        setError(errorMessage)
        throw new Error(errorMessage)
      }

      return data
    } catch (err) {
      const errorMessage = handleSupabaseError(err)
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { assignPlayer, loading, error }
}

export function useSetActivePlayer() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setActivePlayer = useCallback(async (
    userAddress: string, 
    playerId: string
  ): Promise<UserPlayer | null> => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: supabaseError } = await supabase
        .from('user_players')
        .update({ is_active: true })
        .eq('user_address', userAddress)
        .eq('player_id', playerId)
        .select()
        .single()

      if (supabaseError) {
        const errorMessage = handleSupabaseError(supabaseError)
        setError(errorMessage)
        throw new Error(errorMessage)
      }

      return data
    } catch (err) {
      const errorMessage = handleSupabaseError(err)
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { setActivePlayer, loading, error }
}

// Match-specific hooks
export function usePlayerMatches(playerId: string | null) {
  return useSupabaseQuery(
    async () => {
      if (!playerId) return { data: null, error: null }
      
      return await supabase
        .from('matches')
        .select(`
          *,
          player1:players!matches_player1_id_fkey(*),
          player2:players!matches_player2_id_fkey(*),
          winner:players!matches_winner_id_fkey(*)
        `)
        .or(`player1_id.eq.${playerId},player2_id.eq.${playerId}`)
        .order('created_at', { ascending: false })
    },
    [playerId]
  )
}

export function useCreateMatch() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createMatch = useCallback(async (matchData: MatchInsert): Promise<Match | null> => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: supabaseError } = await supabase
        .from('matches')
        .insert(matchData)
        .select()
        .single()

      if (supabaseError) {
        const errorMessage = handleSupabaseError(supabaseError)
        setError(errorMessage)
        throw new Error(errorMessage)
      }

      return data
    } catch (err) {
      const errorMessage = handleSupabaseError(err)
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { createMatch, loading, error }
}

// Season-specific hooks
export function useActiveSeasons() {
  return useSupabaseQuery(
    async () => {
      return await supabase
        .from('seasons')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
    },
    []
  )
}

export function useSeasons() {
  return useSupabaseQuery(
    async () => {
      return await supabase
        .from('seasons')
        .select('*')
        .order('created_at', { ascending: false })
    },
    []
  )
}

// Leaderboard hooks
export function useLeaderboard(seasonId?: string | null) {
  return useSupabaseQuery(
    async () => {
      let query = supabase
        .from('leaderboards')
        .select(`
          *,
          player:players(*)
        `)
        .order('rank', { ascending: true })

      if (seasonId) {
        query = query.eq('season_id', seasonId)
      }

      return await query
    },
    [seasonId]
  )
}

// Real-time subscription hooks
export function useRealtimePlayer(playerId: string | null) {
  const [player, setPlayer] = useState<Player | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!playerId) {
      setPlayer(null)
      setLoading(false)
      return
    }

    // Initial fetch
    const fetchPlayer = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('players')
          .select('*')
          .eq('id', playerId)
          .single()

        if (fetchError) {
          setError(handleSupabaseError(fetchError))
        } else {
          setPlayer(data)
          setError(null)
        }
      } catch (err) {
        setError(handleSupabaseError(err))
      } finally {
        setLoading(false)
      }
    }

    fetchPlayer()

    // Set up real-time subscription
    const subscription = supabase
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
            setPlayer(payload.new as Player)
          } else if (payload.eventType === 'DELETE') {
            setPlayer(null)
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [playerId])

  return { player, loading, error }
}

// Auth hooks
export function useSupabaseAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          setError(handleSupabaseError(sessionError))
        } else {
          setUser(session?.user ?? null)
          setError(null)
        }
      } catch (err) {
        setError(handleSupabaseError(err))
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
        setError(null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        const errorMessage = handleSupabaseError(signInError)
        setError(errorMessage)
        throw new Error(errorMessage)
      }

      return data
    } catch (err) {
      const errorMessage = handleSupabaseError(err)
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        const errorMessage = handleSupabaseError(signUpError)
        setError(errorMessage)
        throw new Error(errorMessage)
      }

      return data
    } catch (err) {
      const errorMessage = handleSupabaseError(err)
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { error: signOutError } = await supabase.auth.signOut()

      if (signOutError) {
        const errorMessage = handleSupabaseError(signOutError)
        setError(errorMessage)
        throw new Error(errorMessage)
      }
    } catch (err) {
      const errorMessage = handleSupabaseError(err)
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  }
}
