-- Rodriguez Towing Database Schema
-- Run this SQL in Supabase SQL Editor: https://supabase.com/dashboard/project/lrucxmrtsyqpwpytybfj/sql

-- Contacts table
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quote requests table
CREATE TABLE quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_type TEXT NOT NULL,
  vehicle_info TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  dropoff_location TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for form submissions)
CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON quote_requests
  FOR INSERT WITH CHECK (true);

-- Optional: Allow authenticated users to read all data (for admin)
-- CREATE POLICY "Allow authenticated reads" ON contacts
--   FOR SELECT USING (auth.role() = 'authenticated');

-- CREATE POLICY "Allow authenticated reads" ON quote_requests
--   FOR SELECT USING (auth.role() = 'authenticated');
