-- SQL to create Newsletter table in Supabase
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS public."Newsletter-signup" (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    source VARCHAR(100) NOT NULL DEFAULT 'llmcalc',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create unique index to prevent duplicate email/source combinations
CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_email_source 
ON public."Newsletter-signup" (email, source);

-- Enable Row Level Security (RLS)
ALTER TABLE public."Newsletter-signup" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for newsletter signups)
-- This allows anyone to insert new newsletter subscriptions
CREATE POLICY "Allow public newsletter signup" ON public."Newsletter-signup"
    FOR INSERT 
    TO public 
    WITH CHECK (true);

-- Create policy to prevent public reads/updates/deletes
-- Only authenticated users with proper permissions can read the data
CREATE POLICY "Restrict newsletter access" ON public."Newsletter-signup"
    FOR ALL
    TO authenticated
    USING (false);

-- Grant necessary permissions
GRANT INSERT ON public."Newsletter-signup" TO anon;
GRANT INSERT ON public."Newsletter-signup" TO authenticated;

-- Optional: Create an index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_newsletter_created_at 
ON public."Newsletter-signup" (created_at DESC);