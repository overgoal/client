# Supabase Database Setup Guide

This guide will help you set up Supabase database connection for the Overgoal game.

## 🚀 Quick Start

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new account
2. Create a new project
3. Wait for the project to be set up (usually takes 2-3 minutes)

### 2. Get Your Project Credentials

1. Go to your project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** (looks like: `https://your-project-ref.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Set Up Environment Variables

Create a `.env` file in the client directory with your Supabase credentials:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 4. Set Up Database Schema

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `src/lib/database-schema.sql`
4. Click **Run** to execute the schema

### 5. Configure Row Level Security (Optional but Recommended)

The schema includes RLS policies, but you may want to customize them based on your needs:

- **Players**: Can view all, but only update their own records
- **Matches**: Anyone can view, players can create/update matches they participate in
- **Seasons**: Read-only for all users
- **Leaderboards**: Read-only for users, system manages updates

## 📁 File Structure

```
src/
├── lib/
│   ├── supabase.ts              # Main Supabase client configuration
│   ├── database.types.ts        # TypeScript types for database schema
│   ├── supabase-utils.ts        # Utility functions for database operations
│   └── database-schema.sql      # SQL schema for database setup
├── hooks/
│   └── useSupabase.ts          # React hooks for database operations
└── context/
    └── supabase-context.tsx    # React context for Supabase state management
```

## 🔧 Usage Examples

### Basic Setup in Your App

```tsx
// In your main App component or layout
import { SupabaseProvider } from './context/supabase-context'

function App() {
  return (
    <SupabaseProvider>
      {/* Your app components */}
    </SupabaseProvider>
  )
}
```

### Using the Context

```tsx
import { useSupabaseAuth, useSupabasePlayer } from './context/supabase-context'

function PlayerProfile() {
  const { user, signOut } = useSupabaseAuth()
  const { player, createPlayer, updatePlayer } = useSupabasePlayer()

  // Your component logic
}
```

### Using Individual Hooks

```tsx
import { usePlayer, useCreatePlayer } from './hooks/useSupabase'

function PlayerComponent() {
  const { data: player, loading, error } = usePlayer(walletAddress)
  const { createPlayer, loading: creating } = useCreatePlayer()

  // Your component logic
}
```

### Direct Database Operations

```tsx
import { playerUtils, matchUtils } from './lib/supabase-utils'

// Get player by wallet address
const player = await playerUtils.getByWalletAddress('0x123...')

// Update player stats
const updatedPlayer = await playerUtils.updateStats(playerId, {
  experience: 150,
  coins: 50
})

// Create a match
const match = await matchUtils.create({
  player1_id: 'uuid1',
  player2_id: 'uuid2',
  status: 'pending'
})
```

## 🔄 Real-time Features

The setup includes real-time subscriptions for:

- **Player updates**: Get notified when player stats change
- **Match updates**: Real-time match status and results
- **Leaderboard changes**: Live leaderboard updates

```tsx
import { realtimeUtils } from './lib/supabase-utils'

// Subscribe to player changes
const subscription = realtimeUtils.subscribeToPlayer(playerId, (player) => {
  console.log('Player updated:', player)
})

// Don't forget to unsubscribe
subscription.unsubscribe()
```

## 🛡️ Security Best Practices

1. **Environment Variables**: Never commit your `.env` file to version control
2. **Row Level Security**: The schema includes RLS policies for data protection
3. **API Keys**: Use the anon key for client-side operations only
4. **Service Role**: Only use the service role key for server-side operations

## 📊 Database Schema Overview

### Tables

- **players**: Store player information, stats, and game progress
- **matches**: Track game matches between players
- **seasons**: Manage game seasons and tournaments
- **leaderboards**: Player rankings and statistics

### Key Features

- **Automatic timestamps**: `created_at` and `updated_at` are managed automatically
- **Level calculation**: Player level is calculated from experience automatically
- **Leaderboard updates**: Rankings are updated automatically after match completion
- **Data validation**: Constraints ensure data integrity
- **Indexes**: Optimized for common query patterns

## 🔧 Customization

### Adding New Fields

1. Update the database schema in Supabase
2. Regenerate types: `npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database.types.ts`
3. Update utility functions in `supabase-utils.ts`
4. Update React hooks as needed

### Custom Queries

Add custom queries to `supabase-utils.ts`:

```typescript
export const customUtils = {
  async getTopPlayersByLevel(limit: number = 10) {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('level', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Environment variables not loading**: Make sure your `.env` file is in the correct location and restart your dev server

2. **RLS policies blocking queries**: Check your RLS policies in Supabase dashboard

3. **Type errors**: Regenerate your types after schema changes

4. **Connection errors**: Verify your Supabase URL and API key

### Debug Mode

Enable debug logging by adding to your environment:

```bash
VITE_SUPABASE_DEBUG=true
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)

## 🤝 Contributing

When adding new database features:

1. Update the schema in `database-schema.sql`
2. Add corresponding TypeScript types
3. Create utility functions for common operations
4. Add React hooks for component usage
5. Update this documentation

## 📝 License

This Supabase integration follows the same license as the main project.
