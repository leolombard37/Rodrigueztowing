-- Reviews table for Rodriguez Towing
-- Run this SQL in Supabase SQL Editor

CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  service_type TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit reviews
CREATE POLICY "Allow anonymous inserts" ON reviews
  FOR INSERT WITH CHECK (true);

-- Only show approved reviews publicly
CREATE POLICY "Allow public to read approved reviews" ON reviews
  FOR SELECT USING (is_approved = true);

-- Insert some sample reviews
INSERT INTO reviews (name, city, rating, comment, service_type, is_approved) VALUES
('Michael Johnson', 'Lexington', 5, 'Called at 2 AM when my truck broke down on I-75. They arrived in 25 minutes! Professional and friendly service. Highly recommend.', 'Heavy Duty Towing', true),
('Sarah Williams', 'Louisville', 5, 'Best towing service in Kentucky! They helped me with a flat tire and were so quick and professional. Will definitely use again.', 'Roadside Assistance', true),
('Carlos Rodriguez', 'Bowling Green', 5, 'Excelente servicio! Me ayudaron cuando mi carro se quedó sin gasolina en la I-65. Llegaron rápido y el precio fue justo.', 'Roadside Assistance', true),
('Jennifer Davis', 'Richmond', 5, 'Had my car towed after an accident. The driver was compassionate and made a stressful situation much easier. Thank you Rodriguez Towing!', 'Light Duty Towing', true),
('Robert Thompson', 'Georgetown', 5, 'Used them for my semi that broke down. They have the right equipment and know-how for heavy duty jobs. Very impressed!', 'Heavy Duty Towing', true);
