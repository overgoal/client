-- Supabase Database Schema for Overgoal Game
-- Run these commands in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Users table - for Cartridge Connector authentication
CREATE TABLE IF NOT EXISTS public.users (
    address TEXT PRIMARY KEY, -- Starknet address from Cartridge Connector (e.g., 0x...)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    username TEXT,
    last_login_at TIMESTAMP WITH TIME ZONE,
    selected_player_id UUID, -- Reference to the player they're currently using
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Players table - pre-seeded game characters
CREATE TABLE IF NOT EXISTS public.players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    link_id TEXT UNIQUE NOT NULL, -- From JSON linkID field
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Basic info
    player_name TEXT NOT NULL,
    player_description TEXT,
    player_category TEXT NOT NULL CHECK (player_category IN ('bronze', 'gold', 'platinum')),
    
    -- Game stats
    fame INTEGER NOT NULL CHECK (fame >= 0 AND fame <= 100),
    charisma INTEGER NOT NULL CHECK (charisma >= 0 AND charisma <= 100),
    stamina INTEGER NOT NULL CHECK (stamina >= 0 AND stamina <= 100),
    strength INTEGER NOT NULL CHECK (strength >= 0 AND strength <= 100),
    agility INTEGER NOT NULL CHECK (agility >= 0 AND agility <= 100),
    intelligence INTEGER NOT NULL CHECK (intelligence >= 0 AND intelligence <= 100),
    energy INTEGER NOT NULL CHECK (energy >= 0 AND energy <= 100),
    speed INTEGER NOT NULL CHECK (speed >= 0 AND speed <= 100),
    leadership INTEGER NOT NULL CHECK (leadership >= 0 AND leadership <= 100),
    pass INTEGER NOT NULL CHECK (pass >= 0 AND pass <= 100),
    shoot INTEGER NOT NULL CHECK (shoot >= 0 AND shoot <= 100),
    freekick INTEGER NOT NULL CHECK (freekick >= 0 AND freekick <= 100),
    
    -- Currency and progression
    universe_currency INTEGER DEFAULT 0 NOT NULL CHECK (universe_currency >= 0),
    level INTEGER DEFAULT 1 NOT NULL CHECK (level >= 1),
    experience INTEGER DEFAULT 0 NOT NULL CHECK (experience >= 0),
    
    -- Appearance
    body_type INTEGER NOT NULL CHECK (body_type >= 0),
    skin_color INTEGER NOT NULL CHECK (skin_color >= 0),
    beard_type INTEGER NOT NULL CHECK (beard_type >= 0),
    hair_type INTEGER NOT NULL CHECK (hair_type >= 0),
    hair_color INTEGER NOT NULL CHECK (hair_color >= 0),
    visor_type INTEGER NOT NULL CHECK (visor_type >= 0),
    visor_color INTEGER NOT NULL CHECK (visor_color >= 0),
    
    -- Team and ownership
    team_id INTEGER NOT NULL DEFAULT 0,
    owner_address TEXT REFERENCES public.users(address) ON DELETE SET NULL,
    is_available BOOLEAN DEFAULT true NOT NULL, -- Can be selected by users
    
    -- Timestamps from JSON
    json_created_at BIGINT, -- Original timestamp from JSON
    json_last_updated_at BIGINT,
    json_last_login_at BIGINT,
    
    metadata JSONB DEFAULT '{}'::jsonb
);

-- User-Player relationship table (for ownership/selection)
CREATE TABLE IF NOT EXISTS public.user_players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_address TEXT NOT NULL REFERENCES public.users(address) ON DELETE CASCADE,
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    is_active BOOLEAN DEFAULT false NOT NULL, -- Currently selected player
    metadata JSONB DEFAULT '{}'::jsonb,
    UNIQUE(user_address, player_id)
);

-- Matches table
CREATE TABLE IF NOT EXISTS public.matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    player1_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    player2_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    winner_id UUID REFERENCES public.players(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    match_data JSONB DEFAULT '{}'::jsonb,
    season_id UUID REFERENCES public.seasons(id) ON DELETE SET NULL,
    CONSTRAINT different_players CHECK (player1_id != player2_id)
);

-- Seasons table
CREATE TABLE IF NOT EXISTS public.seasons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT DEFAULT 'upcoming' NOT NULL CHECK (status IN ('upcoming', 'active', 'completed')),
    max_participants INTEGER CHECK (max_participants > 0),
    current_participants INTEGER DEFAULT 0 NOT NULL CHECK (current_participants >= 0),
    prize_pool INTEGER DEFAULT 0 CHECK (prize_pool >= 0),
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT valid_date_range CHECK (end_date > start_date)
);

-- Leaderboards table
CREATE TABLE IF NOT EXISTS public.leaderboards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    season_id UUID REFERENCES public.seasons(id) ON DELETE CASCADE,
    wins INTEGER DEFAULT 0 NOT NULL CHECK (wins >= 0),
    losses INTEGER DEFAULT 0 NOT NULL CHECK (losses >= 0),
    draws INTEGER DEFAULT 0 NOT NULL CHECK (draws >= 0),
    points INTEGER DEFAULT 0 NOT NULL CHECK (points >= 0),
    rank INTEGER CHECK (rank > 0),
    metadata JSONB DEFAULT '{}'::jsonb,
    UNIQUE(player_id, season_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_address ON public.users(address);
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);
CREATE INDEX IF NOT EXISTS idx_users_last_login ON public.users(last_login_at DESC);

CREATE INDEX IF NOT EXISTS idx_players_link_id ON public.players(link_id);
CREATE INDEX IF NOT EXISTS idx_players_category ON public.players(player_category);
CREATE INDEX IF NOT EXISTS idx_players_team ON public.players(team_id);
CREATE INDEX IF NOT EXISTS idx_players_owner ON public.players(owner_address);
CREATE INDEX IF NOT EXISTS idx_players_available ON public.players(is_available);
CREATE INDEX IF NOT EXISTS idx_players_fame ON public.players(fame DESC);

CREATE INDEX IF NOT EXISTS idx_user_players_user ON public.user_players(user_address);
CREATE INDEX IF NOT EXISTS idx_user_players_player ON public.user_players(player_id);
CREATE INDEX IF NOT EXISTS idx_user_players_active ON public.user_players(is_active);

CREATE INDEX IF NOT EXISTS idx_matches_player1 ON public.matches(player1_id);
CREATE INDEX IF NOT EXISTS idx_matches_player2 ON public.matches(player2_id);
CREATE INDEX IF NOT EXISTS idx_matches_winner ON public.matches(winner_id);
CREATE INDEX IF NOT EXISTS idx_matches_status ON public.matches(status);
CREATE INDEX IF NOT EXISTS idx_matches_season ON public.matches(season_id);
CREATE INDEX IF NOT EXISTS idx_matches_created_at ON public.matches(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_seasons_status ON public.seasons(status);
CREATE INDEX IF NOT EXISTS idx_seasons_start_date ON public.seasons(start_date);
CREATE INDEX IF NOT EXISTS idx_seasons_end_date ON public.seasons(end_date);

CREATE INDEX IF NOT EXISTS idx_leaderboards_player ON public.leaderboards(player_id);
CREATE INDEX IF NOT EXISTS idx_leaderboards_season ON public.leaderboards(season_id);
CREATE INDEX IF NOT EXISTS idx_leaderboards_rank ON public.leaderboards(rank);
CREATE INDEX IF NOT EXISTS idx_leaderboards_points ON public.leaderboards(points DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at_users
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_players
    BEFORE UPDATE ON public.players
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_matches
    BEFORE UPDATE ON public.matches
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_seasons
    BEFORE UPDATE ON public.seasons
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_leaderboards
    BEFORE UPDATE ON public.leaderboards
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Row Level Security (RLS) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboards ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all users" ON public.users
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own record" ON public.users
    FOR INSERT WITH CHECK (auth.uid()::text = address);

CREATE POLICY "Users can update their own record" ON public.users
    FOR UPDATE USING (auth.uid()::text = address);

-- Players policies
CREATE POLICY "Anyone can view players" ON public.players
    FOR SELECT USING (true);

CREATE POLICY "Only system can modify players" ON public.players
    FOR ALL USING (false); -- Players are read-only for users

-- User-Players policies
CREATE POLICY "Users can view their own player relationships" ON public.user_players
    FOR SELECT USING (auth.uid()::text = user_address);

CREATE POLICY "Users can manage their own player relationships" ON public.user_players
    FOR ALL USING (auth.uid()::text = user_address);

-- Matches policies
CREATE POLICY "Anyone can view matches" ON public.matches
    FOR SELECT USING (true);

CREATE POLICY "Users can create matches with their players" ON public.matches
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_players up1 
            WHERE up1.user_address = auth.uid()::text 
            AND up1.player_id = player1_id
        ) OR EXISTS (
            SELECT 1 FROM public.user_players up2 
            WHERE up2.user_address = auth.uid()::text 
            AND up2.player_id = player2_id
        )
    );

-- Seasons policies
CREATE POLICY "Anyone can view seasons" ON public.seasons
    FOR SELECT USING (true);

-- Leaderboards policies
CREATE POLICY "Anyone can view leaderboards" ON public.leaderboards
    FOR SELECT USING (true);

CREATE POLICY "System can manage leaderboards" ON public.leaderboards
    FOR ALL USING (true);

-- Functions for game logic
CREATE OR REPLACE FUNCTION public.calculate_level_from_experience(exp INTEGER)
RETURNS INTEGER AS $$
BEGIN
    -- Simple level calculation: level = floor(sqrt(experience / 100)) + 1
    RETURN FLOOR(SQRT(exp / 100.0)) + 1;
END;
$$ LANGUAGE plpgsql;

-- Function to ensure only one active player per user
CREATE OR REPLACE FUNCTION public.ensure_single_active_player()
RETURNS TRIGGER AS $$
BEGIN
    -- If setting a player as active, deactivate all others for this user
    IF NEW.is_active = true THEN
        UPDATE public.user_players 
        SET is_active = false 
        WHERE user_address = NEW.user_address 
        AND player_id != NEW.player_id;
        
        -- Update the user's selected_player_id
        UPDATE public.users 
        SET selected_player_id = NEW.player_id 
        WHERE address = NEW.user_address;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to ensure single active player
CREATE TRIGGER ensure_single_active_player_trigger
    AFTER INSERT OR UPDATE ON public.user_players
    FOR EACH ROW
    EXECUTE FUNCTION public.ensure_single_active_player();

-- Function to update leaderboard after match completion
CREATE OR REPLACE FUNCTION public.update_leaderboard_after_match()
RETURNS TRIGGER AS $$
DECLARE
    player1_stats RECORD;
    player2_stats RECORD;
BEGIN
    -- Only update leaderboard when match is completed
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        -- Get or create leaderboard entries for both players
        INSERT INTO public.leaderboards (player_id, season_id, wins, losses, draws, points)
        VALUES (NEW.player1_id, NEW.season_id, 0, 0, 0, 0)
        ON CONFLICT (player_id, season_id) DO NOTHING;
        
        INSERT INTO public.leaderboards (player_id, season_id, wins, losses, draws, points)
        VALUES (NEW.player2_id, NEW.season_id, 0, 0, 0, 0)
        ON CONFLICT (player_id, season_id) DO NOTHING;
        
        -- Update stats based on match result
        IF NEW.winner_id = NEW.player1_id THEN
            -- Player 1 wins
            UPDATE public.leaderboards 
            SET wins = wins + 1, points = points + 3
            WHERE player_id = NEW.player1_id AND season_id = NEW.season_id;
            
            UPDATE public.leaderboards 
            SET losses = losses + 1
            WHERE player_id = NEW.player2_id AND season_id = NEW.season_id;
            
        ELSIF NEW.winner_id = NEW.player2_id THEN
            -- Player 2 wins
            UPDATE public.leaderboards 
            SET wins = wins + 1, points = points + 3
            WHERE player_id = NEW.player2_id AND season_id = NEW.season_id;
            
            UPDATE public.leaderboards 
            SET losses = losses + 1
            WHERE player_id = NEW.player1_id AND season_id = NEW.season_id;
            
        ELSE
            -- Draw
            UPDATE public.leaderboards 
            SET draws = draws + 1, points = points + 1
            WHERE player_id IN (NEW.player1_id, NEW.player2_id) AND season_id = NEW.season_id;
        END IF;
        
        -- Update ranks (this could be optimized for large datasets)
        WITH ranked_players AS (
            SELECT 
                id,
                ROW_NUMBER() OVER (ORDER BY points DESC, wins DESC, (wins + draws + losses) DESC) as new_rank
            FROM public.leaderboards 
            WHERE season_id = NEW.season_id OR (season_id IS NULL AND NEW.season_id IS NULL)
        )
        UPDATE public.leaderboards 
        SET rank = ranked_players.new_rank
        FROM ranked_players 
        WHERE public.leaderboards.id = ranked_players.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update leaderboard after match completion
CREATE TRIGGER update_leaderboard_trigger
    AFTER UPDATE ON public.matches
    FOR EACH ROW
    EXECUTE FUNCTION public.update_leaderboard_after_match();

-- Function to get player statistics
CREATE OR REPLACE FUNCTION public.get_player_stats(player_uuid UUID)
RETURNS TABLE (
    total_matches BIGINT,
    wins BIGINT,
    losses BIGINT,
    draws BIGINT,
    win_rate NUMERIC,
    current_rank INTEGER,
    total_points INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(m.total_matches, 0) as total_matches,
        COALESCE(l.wins, 0) as wins,
        COALESCE(l.losses, 0) as losses,
        COALESCE(l.draws, 0) as draws,
        CASE 
            WHEN COALESCE(m.total_matches, 0) > 0 
            THEN ROUND((COALESCE(l.wins, 0)::NUMERIC / m.total_matches::NUMERIC) * 100, 2)
            ELSE 0::NUMERIC
        END as win_rate,
        l.rank as current_rank,
        COALESCE(l.points, 0) as total_points
    FROM 
        (SELECT COUNT(*) as total_matches 
         FROM public.matches 
         WHERE (player1_id = player_uuid OR player2_id = player_uuid) 
         AND status = 'completed') m
    FULL OUTER JOIN 
        (SELECT wins, losses, draws, rank, points 
         FROM public.leaderboards 
         WHERE player_id = player_uuid 
         AND season_id IS NULL 
         LIMIT 1) l ON true;
END;
$$ LANGUAGE plpgsql;

-- Seed players data from JSON
-- This section contains all the player data from players.json
-- Run this after creating the tables to populate the players

INSERT INTO public.players (
    link_id, player_name, player_description, player_category,
    fame, charisma, stamina, strength, agility, intelligence, energy, speed, leadership, pass, shoot, freekick,
    universe_currency, body_type, skin_color, beard_type, hair_type, hair_color, visor_type, visor_color, team_id,
    json_created_at, json_last_updated_at, json_last_login_at
) VALUES 
-- Sample players (first few from JSON) - you'll need to add all 4321 players
('53c62627-1e11-42d9-8a99-8e5cdd8c68c1', 'Oliver Thompson', 'Constant presence & Decent speed', 'bronze',
 50, 46, 52, 49, 50, 51, 49, 51, 46, 49, 49, 49,
 4748, 0, 0, 1, 0, 4, 2, 0, 0,
 1762538622412, 1762538622412, 1762538622412),

('3ad36c1b-54fc-4671-b220-b42841ef3954', 'Caleb Baker', 'Dream distributor, Smart decision maker', 'bronze',
 47, 47, 46, 43, 51, 55, 46, 52, 45, 56, 52, 49,
 3101, 1, 1, 0, 1, 4, 0, 1, 0,
 1762538622412, 1762538622412, 1762538622412),

('da6b7521-2801-4cf8-b8d4-069b7ac5e0fa', 'Dominic Sanchez', 'Body of steel, Runs all game', 'bronze',
 52, 47, 54, 55, 46, 49, 52, 48, 45, 51, 51, 52,
 1958, 2, 0, 0, 1, 1, 1, 0, 0,
 1762538622412, 1762538622412, 1762538622412);

-- Note: This is just a sample. You need to generate INSERT statements for all 4321 players
-- You can use the generate-player-inserts.js script to create the full INSERT statements

-- Insert some sample data (optional)
-- INSERT INTO public.seasons (name, description, start_date, end_date, status) VALUES
-- ('Season 1', 'The inaugural season of Overgoal', NOW(), NOW() + INTERVAL '30 days', 'active');

-- Create a view for easy leaderboard queries
CREATE OR REPLACE VIEW public.leaderboard_view AS
SELECT 
    l.*,
    p.player_name,
    p.player_category,
    p.team_id,
    s.name as season_name
FROM public.leaderboards l
JOIN public.players p ON l.player_id = p.id
LEFT JOIN public.seasons s ON l.season_id = s.id
ORDER BY l.rank ASC NULLS LAST, l.points DESC;
