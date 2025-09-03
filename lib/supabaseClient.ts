import { createClient } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string; // uuid
          updated_at?: string;
          company_name: string | null;
          description: string | null;
          logo_url: string | null;
          category: string | null;
          benefit: string | null;
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
          description: string | null;
          discount_type: 'percentage' | 'fixed' | 'custom';
          discount_value: number | null;
          custom_discount_text: string | null;
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
      coupons: {
        Row: {
          id: number;
          user_id: string;
          offer_id: number;
          code: string;
          status: 'pending' | 'used' | 'expired';
          expires_at: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          offer_id: number;
          code: string;
          status?: 'pending' | 'used' | 'expired';
          expires_at: string;
          created_at?: string;
        };
        Update: {
          status?: 'pending' | 'used' | 'expired';
        };
        Relationships: [
          {
            foreignKeyName: 'coupons_offer_id_fkey',
            columns: ['offer_id'],
            isOneToOne: false,
            referencedRelation: 'offers',
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'coupons_user_id_fkey',
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
export type Coupon = Database['public']['Tables']['coupons']['Row'];


// TODO: Substitua pelos dados do seu projeto Supabase, encontrados em Configurações do Projeto > API.
const supabaseUrl = 'https://<SEU-ID-DE-PROJETO>.supabase.co';
const supabaseKey = '<SUA-CHAVE-ANON>';

export const isSupabaseConfigured =
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes('<SEU-ID-DE-PROJETO>') &&
  !supabaseKey.includes('<SUA-CHAVE-ANON>');


export const supabase = createClient<Database>(supabaseUrl, supabaseKey);