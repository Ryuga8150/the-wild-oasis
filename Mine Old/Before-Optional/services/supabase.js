import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabaseUrl = "https://lkqrogatvcgwnithrafo.supabase.co";
const superbaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcXJvZ2F0dmNnd25pdGhyYWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0Nzk3MDQsImV4cCI6MjAwOTA1NTcwNH0.CsdTxZ-eNnth7PXo44ioJeZP0kPqyeB1KpGiiEvRRjE";
const supabase = createClient(supabaseUrl, superbaseKey);

export default supabase;
