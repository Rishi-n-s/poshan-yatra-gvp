-- Poshan Yatra 2026 - Supabase Schema Migration
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run

-- 1. Ensure 'reports' table has the 'report' column, 'school_type', and Anganwadi/School detail columns
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS report text;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS school_type text;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS anganwadi_name text;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS anganwadi_area text;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS anganwadi_village text;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS anganwadi_worker text;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS anganwadi_enrolled integer;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS anganwadi_present integer;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS anganwadi_staff integer;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS school_area text;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS school_teacher text;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS school_enrolled integer;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS school_present integer;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS school_teachers_present integer;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS student_name text;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS student_course text;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS mentor_name text;
ALTER TABLE IF EXISTS public.reports ADD COLUMN IF NOT EXISTS entry_data jsonb DEFAULT '{}'::jsonb;

-- 2. If 'reports' table doesn't exist yet, create it with all columns:
CREATE TABLE IF NOT EXISTS public.reports (
    id text PRIMARY KEY,
    group_name text,
    team_id text,
    taluka text,
    team text,
    day integer,
    date text,
    school text,
    school_type text,
    address text,
    cname text,
    cphone text,
    acts text[],
    report text,
    photos jsonb DEFAULT '[]'::jsonb,
    gps text,
    created_at timestamp with time zone DEFAULT now()
);

-- 3. Ensure 'teams' table exists
CREATE TABLE IF NOT EXISTS public.teams (
    id text PRIMARY KEY,
    name text,
    user_name text,
    pass text,
    hash text
);

-- 4. Ensure 'settings' table exists
CREATE TABLE IF NOT EXISTS public.settings (
    id text PRIMARY KEY,
    logo text
);

-- 5. Ensure storage bucket 'photos' exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 6. Storage access policies for photo uploads
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public photo access'
    ) THEN
        CREATE POLICY "Public photo access" ON storage.objects FOR SELECT USING (bucket_id = 'photos');
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow anon photo uploads'
    ) THEN
        CREATE POLICY "Allow anon photo uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'photos');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow anon photo updates'
    ) THEN
        CREATE POLICY "Allow anon photo updates" ON storage.objects FOR UPDATE USING (bucket_id = 'photos');
    END IF;
END $$;
