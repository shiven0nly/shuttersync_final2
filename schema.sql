-- Drop existing table to ensure correct types (CAUTION: This deletes existing registrations)
DROP TABLE IF EXISTS workshop_registrations;

-- Workshop Registrations Table
-- Linked to Supabase Auth for unified identity
CREATE TABLE workshop_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    workshop_id INTEGER NOT NULL DEFAULT 2,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure a user can only register once for a specific workshop
    UNIQUE(user_id, workshop_id)
);

-- Enable Row Level Security
ALTER TABLE workshop_registrations ENABLE ROW LEVEL SECURITY;

-- 1. Allow users to insert their own registrations
-- auth.uid() returns uuid, user_id is uuid.
CREATE POLICY "Users can register themselves" 
ON workshop_registrations FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 2. Allow users to view their own registrations
CREATE POLICY "Users can view own registrations" 
ON workshop_registrations FOR SELECT 
USING (auth.uid() = user_id);

-- 3. Allow admins to view everything
CREATE POLICY "Admins can view all registrations" 
ON workshop_registrations FOR SELECT 
USING (
    auth.jwt() ->> 'email' = 'admin@chillthrive.com'
);
