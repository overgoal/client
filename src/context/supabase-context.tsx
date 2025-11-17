import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User as SupabaseUser, Session } from '@supabase/supabase-js'
import { supabase, handleSupabaseError } from '../lib/supabase'
import type { User, Player, UserPlayer } from '../lib/database.types'
import { userUtils, userPlayerUtils } from '../lib/supabase-utils'

interface SupabaseContextType {
  // Auth state (Cartridge Connector)
  userAddress: string | null
  user: User | null // Our custom user from database
  session: Session | null // Supabase session (if using traditional auth)
  loading: boolean
  
  // Player state
  activePlayer: Player | null
  userPlayers: (UserPlayer & { player: Player })[]
  playerLoading: boolean
  
  // Auth methods (for Cartridge Connector integration)
  connectWallet: (address: string, username?: string) => Promise<User | null>
  disconnectWallet: () => Promise<void>
  
  // Traditional auth methods (optional)
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  
  // Player methods
  assignPlayer: (playerId: string, setAsActive?: boolean) => Promise<UserPlayer | null>
  setActivePlayer: (playerId: string) => Promise<UserPlayer | null>
  refreshUserData: () => Promise<void>
  
  // Computed state
  isAuthenticated: boolean
  error: string | null
  clearError: () => void
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

interface SupabaseProviderProps {
  children: ReactNode
}

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  // Auth state
  const [userAddress, setUserAddress] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Player state
  const [activePlayer, setActivePlayer] = useState<Player | null>(null)
  const [userPlayers, setUserPlayers] = useState<(UserPlayer & { player: Player })[]>([])
  const [playerLoading, setPlayerLoading] = useState(false)
  
  // Error state
  const [error, setError] = useState<string | null>(null)

  // Initialize auth state
  useEffect(() => {
    // Get initial session (for traditional auth)
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Error getting session:', sessionError)
          setError(handleSupabaseError(sessionError))
        } else {
          setSession(initialSession)
          
          // If we have a session, try to load user data
          if (initialSession?.user) {
            await loadUserData(initialSession.user.id)
          }
        }
      } catch (err) {
        console.error('Error initializing auth:', err)
        setError(handleSupabaseError(err))
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id)
        
        setSession(session)
        setLoading(false)
        
        // Clear user data when signing out
        if (event === 'SIGNED_OUT') {
          setUser(null)
          setActivePlayer(null)
          setUserPlayers([])
          setUserAddress(null)
        }
        
        // Load user data when signing in
        if (event === 'SIGNED_IN' && session?.user) {
          await loadUserData(session.user.id)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Load user data from our custom users table
  const loadUserData = async (address: string) => {
    try {
      setPlayerLoading(true)
      setError(null)

      // Load user data
      const userData = await userUtils.getByAddress(address)
      setUser(userData)
      setUserAddress(address)

      if (userData) {
        // Load user's players
        const userPlayersData = await userPlayerUtils.getUserPlayers(address)
        setUserPlayers(userPlayersData)

        // Load active player
        const activePlayerData = await userPlayerUtils.getActivePlayer(address)
        setActivePlayer(activePlayerData)
      }
    } catch (err) {
      console.error('Error loading user data:', err)
      setError(handleSupabaseError(err))
    } finally {
      setPlayerLoading(false)
    }
  }

  // Cartridge Connector integration
  const connectWallet = async (address: string, username?: string): Promise<User | null> => {
    try {
      setLoading(true)
      setError(null)

      // Create or update user in our database
      const userData = await userUtils.upsert({
        address,
        username,
        last_login_at: new Date().toISOString()
      })

      setUser(userData)
      setUserAddress(address)

      // Load user's players
      await loadUserData(address)

      return userData
    } catch (err) {
      const errorMessage = handleSupabaseError(err)
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      setLoading(true)
      setError(null)

      // Clear all state
      setUser(null)
      setUserAddress(null)
      setActivePlayer(null)
      setUserPlayers([])
      
      // Also sign out from Supabase if authenticated
      if (session) {
        await supabase.auth.signOut()
      }
    } catch (err) {
      const errorMessage = handleSupabaseError(err)
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Traditional auth methods
  const signIn = async (email: string, password: string) => {
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

      // User data will be loaded automatically via auth state change
    } catch (err) {
      const errorMessage = handleSupabaseError(err)
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
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
  }

  const signOut = async () => {
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
  }

  // Player methods
  const assignPlayer = async (playerId: string, setAsActive: boolean = false): Promise<UserPlayer | null> => {
    if (!userAddress) {
      throw new Error('User must be connected to assign a player')
    }

    try {
      setPlayerLoading(true)
      setError(null)

      const userPlayer = await userPlayerUtils.assignPlayer(userAddress, playerId, setAsActive)

      // Refresh user data
      await loadUserData(userAddress)

      return userPlayer
    } catch (err) {
      const errorMessage = handleSupabaseError(err)
      setError(errorMessage)
      throw err
    } finally {
      setPlayerLoading(false)
    }
  }

  const setActivePlayerMethod = async (playerId: string): Promise<UserPlayer | null> => {
    if (!userAddress) {
      throw new Error('User must be connected to set active player')
    }

    try {
      setPlayerLoading(true)
      setError(null)

      const userPlayer = await userPlayerUtils.setActivePlayer(userAddress, playerId)

      // Refresh user data
      await loadUserData(userAddress)

      return userPlayer
    } catch (err) {
      const errorMessage = handleSupabaseError(err)
      setError(errorMessage)
      throw err
    } finally {
      setPlayerLoading(false)
    }
  }

  const refreshUserData = async () => {
    if (!userAddress) return
    await loadUserData(userAddress)
  }

  const clearError = () => {
    setError(null)
  }

  const contextValue: SupabaseContextType = {
    // Auth state
    userAddress,
    user,
    session,
    loading,
    
    // Player state
    activePlayer,
    userPlayers,
    playerLoading,
    
    // Auth methods
    connectWallet,
    disconnectWallet,
    signIn,
    signUp,
    signOut,
    
    // Player methods
    assignPlayer,
    setActivePlayer: setActivePlayerMethod,
    refreshUserData,
    
    // Computed state
    isAuthenticated: !!userAddress || !!session,
    error,
    clearError,
  }

  return (
    <SupabaseContext.Provider value={contextValue}>
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabaseContext() {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabaseContext must be used within a SupabaseProvider')
  }
  return context
}

// Convenience hooks
export function useSupabaseAuth() {
  const { 
    userAddress, 
    user, 
    session, 
    loading, 
    connectWallet, 
    disconnectWallet, 
    signIn, 
    signUp, 
    signOut, 
    isAuthenticated, 
    error, 
    clearError 
  } = useSupabaseContext()
  
  return { 
    userAddress, 
    user, 
    session, 
    loading, 
    connectWallet, 
    disconnectWallet, 
    signIn, 
    signUp, 
    signOut, 
    isAuthenticated, 
    error, 
    clearError 
  }
}

export function useSupabasePlayer() {
  const { 
    activePlayer, 
    userPlayers, 
    playerLoading, 
    assignPlayer, 
    setActivePlayer, 
    refreshUserData, 
    error, 
    clearError 
  } = useSupabaseContext()
  
  return { 
    activePlayer, 
    userPlayers, 
    loading: playerLoading, 
    assignPlayer, 
    setActivePlayer, 
    refreshUserData, 
    error, 
    clearError 
  }
}