
// Corresponds to the `profiles` table
export interface Profile {
  id: string; // uuid
  updated_at?: string;
  company_name: string | null;
  description: string | null;
  logo_url: string | null;
  category: string | null;
  benefit: string | null;
  user_type: 'customer' | 'partner' | null;
}

// Corresponds to the `offers` table
export interface Offer {
  id: number;
  user_id: string;
  created_at?: string;
  title: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed' | 'custom';
  discount_value: number | null;
  custom_discount_text: string | null;
}
