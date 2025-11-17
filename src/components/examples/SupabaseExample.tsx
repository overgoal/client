import { useState, useEffect } from 'react'
import { useSupabaseAuth, useSupabasePlayer } from '../../context/supabase-context'
import { useAvailablePlayers, useUser, useUserPlayers, useActivePlayer } from '../../hooks/useSupabase'
import { playerUtils, userUtils } from '../../lib/supabase-utils'

export function SupabaseExample() {
  const [walletAddress, setWalletAddress] = useState('')
  const [username, setUsername] = useState('')
  const [selectedPlayerId, setSelectedPlayerId] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Context hooks
  const { 
    userAddress, 
    user, 
    connectWallet, 
    disconnectWallet, 
    isAuthenticated, 
    error: authError 
  } = useSupabaseAuth()
  
  const {
    activePlayer,
    userPlayers,
    assignPlayer,
    setActivePlayer,
    refreshUserData,
    loading: playerLoading
  } = useSupabasePlayer()

  // Data hooks
  const { data: availablePlayers, loading: playersLoading, error: playersError } = useAvailablePlayers()
  const { data: userData, loading: userDataLoading } = useUser(userAddress)
  const { data: userPlayersData, loading: userPlayersLoading } = useUserPlayers(userAddress)
  const { data: activePlayerData, loading: activePlayerLoading } = useActivePlayer(userAddress)

  // Test wallet connection (simulating Cartridge Connector)
  const handleConnectWallet = async () => {
    if (!walletAddress) {
      setMessage('Please enter a wallet address')
      return
    }

    try {
      setLoading(true)
      setMessage('')
      
      await connectWallet(walletAddress, username || undefined)
      setMessage('Wallet connected successfully!')
    } catch (err) {
      setMessage(`Error connecting wallet: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDisconnectWallet = async () => {
    try {
      setLoading(true)
      setMessage('')
      
      await disconnectWallet()
      setMessage('Wallet disconnected successfully!')
      setWalletAddress('')
      setUsername('')
    } catch (err) {
      setMessage(`Error disconnecting wallet: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  // Test player assignment
  const handleAssignPlayer = async () => {
    if (!selectedPlayerId) {
      setMessage('Please select a player to assign')
      return
    }

    try {
      setLoading(true)
      setMessage('')
      
      await assignPlayer(selectedPlayerId, true) // Set as active
      setMessage('Player assigned successfully!')
    } catch (err) {
      setMessage(`Error assigning player: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  // Test setting active player
  const handleSetActivePlayer = async (playerId: string) => {
    try {
      setLoading(true)
      setMessage('')
      
      await setActivePlayer(playerId)
      setMessage('Active player updated successfully!')
    } catch (err) {
      setMessage(`Error setting active player: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  // Test direct database operations
  const handleTestDatabaseOperations = async () => {
    try {
      setLoading(true)
      setMessage('')

      // Test getting available players
      const players = await playerUtils.getAvailable()
      console.log('Available players:', players)

      // Test getting players by category
      const bronzePlayers = await playerUtils.getByCategory('bronze')
      console.log('Bronze players:', bronzePlayers)

      if (userAddress) {
        // Test user operations
        const userInfo = await userUtils.getByAddress(userAddress)
        console.log('User info:', userInfo)
      }

      setMessage(`Database operations completed! Check console for results. Found ${players.length} available players.`)
    } catch (err) {
      setMessage(`Error in database operations: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Supabase Integration Example</h1>

      {/* Connection Status */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
        <div className="space-y-2">
          <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
          <p><strong>User Address:</strong> {userAddress || 'Not connected'}</p>
          <p><strong>Username:</strong> {user?.username || 'Not set'}</p>
          <p><strong>Active Player:</strong> {activePlayer?.player_name || 'None selected'}</p>
        </div>
      </div>

      {/* Wallet Connection */}
      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Wallet Connection (Cartridge Connector Simulation)</h2>
        
        {!isAuthenticated ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Wallet Address:</label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="0x1234..."
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Username (optional):</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              onClick={handleConnectWallet}
              disabled={loading || !walletAddress}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        ) : (
          <button
            onClick={handleDisconnectWallet}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Disconnecting...' : 'Disconnect Wallet'}
          </button>
        )}
      </div>

      {/* Available Players */}
      {isAuthenticated && (
        <div className="bg-white border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Available Players</h2>
          
          {playersLoading ? (
            <p>Loading players...</p>
          ) : playersError ? (
            <p className="text-red-500">Error loading players: {playersError}</p>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select a player to assign:</label>
                <select
                  value={selectedPlayerId}
                  onChange={(e) => setSelectedPlayerId(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Choose a player...</option>
                  {availablePlayers?.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.player_name} ({player.player_category}) - Fame: {player.fame}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleAssignPlayer}
                disabled={loading || !selectedPlayerId}
                className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Assigning...' : 'Assign Player'}
              </button>
              
              <div className="text-sm text-gray-600">
                Total available players: {availablePlayers?.length || 0}
              </div>
            </div>
          )}
        </div>
      )}

      {/* User's Players */}
      {isAuthenticated && userPlayers.length > 0 && (
        <div className="bg-white border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Your Players</h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userPlayers.map((userPlayer) => (
              <div
                key={userPlayer.id}
                className={`p-3 border rounded-lg ${
                  userPlayer.is_active ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
              >
                <h3 className="font-semibold">{userPlayer.player.player_name}</h3>
                <p className="text-sm text-gray-600">Category: {userPlayer.player.player_category}</p>
                <p className="text-sm text-gray-600">Fame: {userPlayer.player.fame}</p>
                <p className="text-sm text-gray-600">Team: {userPlayer.player.team_id}</p>
                
                {userPlayer.is_active ? (
                  <span className="inline-block mt-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                    Active
                  </span>
                ) : (
                  <button
                    onClick={() => handleSetActivePlayer(userPlayer.player.id)}
                    disabled={loading}
                    className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded disabled:opacity-50"
                  >
                    Set Active
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Database Operations Test */}
      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Database Operations Test</h2>
        <button
          onClick={handleTestDatabaseOperations}
          disabled={loading}
          className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Database Operations'}
        </button>
      </div>

      {/* Loading States */}
      {(playerLoading || userDataLoading || userPlayersLoading || activePlayerLoading) && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Loading player data...
        </div>
      )}

      {/* Messages */}
      {message && (
        <div className={`px-4 py-3 rounded ${
          message.includes('Error') ? 'bg-red-100 border border-red-400 text-red-700' : 
          'bg-green-100 border border-green-400 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {/* Auth Error */}
      {authError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Auth Error: {authError}
        </div>
      )}

      {/* Debug Info */}
      <details className="bg-gray-50 p-4 rounded-lg">
        <summary className="cursor-pointer font-semibold">Debug Information</summary>
        <pre className="mt-2 text-sm overflow-auto">
          {JSON.stringify({
            userAddress,
            user,
            activePlayer: activePlayer ? {
              id: activePlayer.id,
              name: activePlayer.player_name,
              category: activePlayer.player_category
            } : null,
            userPlayersCount: userPlayers.length,
            availablePlayersCount: availablePlayers?.length || 0,
            isAuthenticated,
            loading: {
              main: loading,
              player: playerLoading,
              players: playersLoading,
              userData: userDataLoading,
              userPlayers: userPlayersLoading,
              activePlayer: activePlayerLoading
            }
          }, null, 2)}
        </pre>
      </details>
    </div>
  )
}