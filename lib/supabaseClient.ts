import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wjcjpqloofzrdyzamkxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjanFramxvb2ZyamR5emFta3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MjI4NDksImV4cCI6MjA3MTE5ODg0OX0.poHKJOj1VlomnoyJ1GWCweoIhuXk3ZH6Di-awC-DDX0';

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be defined");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
