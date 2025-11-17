import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Environment variables validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

// Create Supabase client with TypeScript support
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Configure auth settings
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Use PKCE flow for better security
  },
  // Configure realtime settings
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  // Configure global settings
  global: {
    headers: {
      'x-application-name': 'overgoal-game',
    },
  },
})

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any): string => {
  if (!error) return 'An unknown error occurred'
  
  // Handle specific error types
  if (error.code === 'PGRST116') {
    return 'No data found'
  }
  
  if (error.code === '23505') {
    return 'This record already exists'
  }
  
  if (error.code === '23503') {
    return 'Referenced record does not exist'
  }
  
  if (error.code === '42501') {
    return 'Permission denied'
  }
  
  // Return the error message or a generic message
  return error.message || error.error_description || 'An error occurred'
}

// Helper function to check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// Helper function to sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Export types for use in components
export type { Database } from './database.types'
