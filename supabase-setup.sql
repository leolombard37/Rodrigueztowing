-- =====================================================
-- COMPLETE DATABASE SETUP for Rodriguez Towing
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hofdhokiqotowgzulyus/sql/new
-- =====================================================

-- =====================================================
-- STEP 1: CREATE TABLES
-- =====================================================

-- Contacts table (for contact form submissions)
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quote requests table (for quote form submissions)
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_type TEXT NOT NULL,
  vehicle_info TEXT,
  location TEXT,
  is_urgent BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table (for customer reviews)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  service_type TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- STEP 2: ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 3: CREATE RLS POLICIES
-- =====================================================

-- CONTACTS TABLE POLICIES
-- -----------------------

-- Allow anyone (anonymous) to insert contacts (for contact form)
CREATE POLICY "Allow anonymous inserts on contacts" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users (admin) to read all contacts
CREATE POLICY "Allow authenticated reads on contacts" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);


-- QUOTE_REQUESTS TABLE POLICIES
-- -----------------------------

-- Allow anyone (anonymous) to insert quotes (for quote form)
CREATE POLICY "Allow anonymous inserts on quote_requests" ON quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users (admin) to read all quotes
CREATE POLICY "Allow authenticated reads on quote_requests" ON quote_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admin) to update quote status
CREATE POLICY "Allow authenticated updates on quote_requests" ON quote_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- REVIEWS TABLE POLICIES
-- ----------------------

-- Allow anyone (anonymous) to insert reviews (for review form)
CREATE POLICY "Allow anonymous inserts on reviews" ON reviews
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anyone (anonymous) to read APPROVED reviews (for public display)
CREATE POLICY "Allow anonymous reads approved reviews" ON reviews
  FOR SELECT
  TO anon
  USING (is_approved = true);

-- Allow authenticated users (admin) to read ALL reviews (including unapproved)
CREATE POLICY "Allow authenticated reads all reviews" ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admin) to update reviews (approve/unapprove)
CREATE POLICY "Allow authenticated updates on reviews" ON reviews
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users (admin) to delete reviews
CREATE POLICY "Allow authenticated deletes on reviews" ON reviews
  FOR DELETE
  TO authenticated
  USING (true);


-- =====================================================
-- STEP 4: ENABLE REALTIME (for live updates in admin dashboard)
-- =====================================================

ALTER PUBLICATION supabase_realtime ADD TABLE contacts;
ALTER PUBLICATION supabase_realtime ADD TABLE quote_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE reviews;

-- =====================================================
-- SETUP COMPLETE!
-- Next: Create an admin user in Authentication > Users
-- =====================================================
