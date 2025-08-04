-- SQL to create LLM-calc-report table in Supabase
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS public."LLM-calc-report" (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    html_string TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_llm_calc_report_created_at 
ON public."LLM-calc-report" (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_llm_calc_report_email 
ON public."LLM-calc-report" (email);

-- Disable RLS for now to make it work (you can enable later with proper policies)
ALTER TABLE public."LLM-calc-report" DISABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT INSERT ON public."LLM-calc-report" TO anon;
GRANT INSERT ON public."LLM-calc-report" TO authenticated;
GRANT SELECT ON public."LLM-calc-report" TO service_role;
