import { createClient } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string; // uuid
          updated_at?: string;
          company_name: string;
          description: string;
          logo_url: string;
          category: string;
          benefit: string;
          user_type: 'customer' | 'partner';
        };
        Insert: {
          id: string;
          company_name?: string | null;
          description?: string | null;
          logo_url?: string | null;
          category?: string | null;
          benefit?: string | null;
          user_type?: 'customer' | 'partner' | null;
        };
        Update: {
          company_name?: string | null;
          description?: string | null;
          logo_url?: string | null;
          category?: string | null;
          benefit?: string | null;
          user_type?: 'customer' | 'partner' | null;
        };
        Relationships: [];
      };
      offers: {
        Row: {
          id: number;
          user_id: string;
          created_at?: string;
          title: string;
          description: string;
          discount_type: 'percentage' | 'fixed' | 'custom';
          discount_value: number | null;
          custom_discount_text: string;
        };
        Insert: {
          user_id: string;
          title: string;
          description?: string | null;
          discount_type: 'percentage' | 'fixed' | 'custom';
          discount_value?: number | null;
          custom_discount_text?: string | null;
        };
        Update: {
          title?: string;
          description?: string | null;
          discount_type?: 'percentage' | 'fixed' | 'custom';
          discount_value?: number | null;
          custom_discount_text?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'offers_user_id_fkey',
            columns: ['user_id'],
            isOneToOne: false,
            referencedRelation: 'profiles',
            referencedColumns: ['id']
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
  };
};

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Offer = Database['public']['Tables']['offers']['Row'];


const supabaseUrl = 'https://wcjqkjloofrjdyzamkxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjanFramxvb2ZyamR5emFta3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MjI4NDksImV4cCI6MjA3MTE5ODg0OX0.poHKJOj1VlomnoyJ1GWCweoIhuXk3ZH6Di-awC-DDX0';

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be defined");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);