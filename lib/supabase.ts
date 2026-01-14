import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface Contact {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  created_at?: string;
}

export interface QuoteRequest {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  service_type: string;
  vehicle_info: string;
  pickup_location: string;
  dropoff_location?: string;
  notes?: string;
  status?: "pending" | "contacted" | "completed";
  created_at?: string;
}
