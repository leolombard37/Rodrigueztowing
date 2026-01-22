-- =====================================================
-- RLS Policies for Rodriguez Towing Admin Dashboard
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hofdhokiqotowgzulyus/sql/new
-- =====================================================

-- =====================================================
-- CONTACTS TABLE POLICIES
-- =====================================================

-- Allow authenticated users (admin) to read all contacts
CREATE POLICY "Allow authenticated reads on contacts" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- =====================================================
-- QUOTE_REQUESTS TABLE POLICIES
-- =====================================================

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

-- =====================================================
-- REVIEWS TABLE POLICIES
-- =====================================================

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
-- ENABLE REALTIME (for live updates in admin dashboard)
-- =====================================================

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE contacts;
ALTER PUBLICATION supabase_realtime ADD TABLE quote_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE reviews;
