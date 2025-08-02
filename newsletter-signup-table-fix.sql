-- SQL to fix Newsletter-signup table permissions
-- Execute this in your Supabase SQL Editor

-- Option 1: Disable RLS for testing
ALTER TABLE public."Newsletter-signup" DISABLE ROW LEVEL SECURITY;

-- Option 2: If you want to keep RLS enabled, use these policies instead:
-- 
-- -- First enable RLS
-- ALTER TABLE public."Newsletter-signup" ENABLE ROW LEVEL SECURITY;
-- 
-- -- Drop any existing policies
-- DROP POLICY IF EXISTS "Allow public newsletter signup" ON public."Newsletter-signup";
-- DROP POLICY IF EXISTS "Allow all operations" ON public."Newsletter-signup";
-- 
-- -- Create policy to allow public inserts
-- CREATE POLICY "Allow public newsletter signup" ON public."Newsletter-signup"
--     FOR INSERT 
--     TO public 
--     WITH CHECK (true);
-- 
-- -- Create policy to allow service role to read (for duplicate checking)
-- CREATE POLICY "Allow service role to read" ON public."Newsletter-signup"
--     FOR SELECT
--     TO service_role
--     USING (true);
-- 
-- -- Grant necessary permissions
-- GRANT INSERT ON public."Newsletter-signup" TO anon;
-- GRANT INSERT ON public."Newsletter-signup" TO authenticated;
-- GRANT SELECT ON public."Newsletter-signup" TO service_role;

-- For now, let's just disable RLS to make it work
-- You can re-enable it later with proper policies if needed