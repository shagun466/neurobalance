/*
  # Authentication and User Profile Setup

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `mfi_score` (integer, default 62) - Mental Footprint Index
      - `sot_balance` (decimal, default 0) - Stress Offset Token balance
      - `wellness_streak` (integer, default 0)
      - `onboarding_completed` (boolean, default false)
      - `data_consent_given` (boolean, default false)
      - `wallet_address` (text, nullable)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

    - `wellness_activities`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `activity_type` (text) - meditation, exercise, therapy, etc.
      - `duration_minutes` (integer)
      - `sot_earned` (decimal)
      - `mfi_impact` (integer) - impact on MFI score
      - `notes` (text, nullable)
      - `completed_at` (timestamptz, default now())
      - `created_at` (timestamptz, default now())

    - `mfi_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `mfi_score` (integer)
      - `stress_level` (integer)
      - `recovery_level` (integer)
      - `recorded_at` (timestamptz, default now())

    - `user_goals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `goal_type` (text) - daily_meditation, weekly_exercise, sleep_quality, etc.
      - `target_value` (decimal)
      - `current_value` (decimal, default 0)
      - `unit` (text) - days, sessions, hours, interactions
      - `is_active` (boolean, default true)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on all tables
    - Users can only access their own data
    - Policies enforce authentication and ownership checks
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  mfi_score integer DEFAULT 62,
  sot_balance decimal(10,2) DEFAULT 0,
  wellness_streak integer DEFAULT 0,
  onboarding_completed boolean DEFAULT false,
  data_consent_given boolean DEFAULT false,
  wallet_address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create wellness_activities table
CREATE TABLE IF NOT EXISTS wellness_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  activity_type text NOT NULL,
  duration_minutes integer NOT NULL,
  sot_earned decimal(10,2) NOT NULL,
  mfi_impact integer NOT NULL,
  notes text,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create mfi_history table
CREATE TABLE IF NOT EXISTS mfi_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  mfi_score integer NOT NULL,
  stress_level integer NOT NULL,
  recovery_level integer NOT NULL,
  recorded_at timestamptz DEFAULT now()
);

-- Create user_goals table
CREATE TABLE IF NOT EXISTS user_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  goal_type text NOT NULL,
  target_value decimal(10,2) NOT NULL,
  current_value decimal(10,2) DEFAULT 0,
  unit text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_wellness_activities_user_id ON wellness_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_wellness_activities_completed_at ON wellness_activities(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_mfi_history_user_id ON mfi_history(user_id);
CREATE INDEX IF NOT EXISTS idx_mfi_history_recorded_at ON mfi_history(recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_goals_user_id ON user_goals(user_id);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wellness_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfi_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for wellness_activities
CREATE POLICY "Users can view own activities"
  ON wellness_activities FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities"
  ON wellness_activities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activities"
  ON wellness_activities FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own activities"
  ON wellness_activities FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for mfi_history
CREATE POLICY "Users can view own MFI history"
  ON mfi_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own MFI history"
  ON mfi_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_goals
CREATE POLICY "Users can view own goals"
  ON user_goals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals"
  ON user_goals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals"
  ON user_goals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals"
  ON user_goals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_goals_updated_at
  BEFORE UPDATE ON user_goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();