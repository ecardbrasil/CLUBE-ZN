import { createClient } from '@supabase/supabase-js';
import { customAlphabet } from 'nanoid';
import type { Database } from '../lib/supabaseClient';

// Helper function to set CORS headers and handle OPTIONS pre-flight requests
const handleCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust for production
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true; // Indicates that the request was handled
  }
  return false;
};

export default async function handler(req, res) {
  if (handleCors(req, res)) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Supabase client initialization using environment variables
  const supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  const generateCode = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

  try {
    const { userId, offerId } = req.body;
    if (!userId || !offerId) {
        return res.status(400).json({ error: 'userId and offerId are required.' });
    }

    const now = new Date().toISOString();

    // 1. Clean up expired coupons for this user/offer combo
    await supabase
        .from('coupons')
        .update({ status: 'expired' })
        .eq('user_id', userId)
        .eq('offer_id', offerId)
        .eq('status', 'pending')
        .lt('expires_at', now);
    
    // 2. Check for an existing, valid, pending coupon
    const { data: existingCoupon, error: selectError } = await supabase
        .from('coupons')
        .select('code, expires_at')
        .eq('user_id', userId)
        .eq('offer_id', offerId)
        .eq('status', 'pending')
        .gt('expires_at', now)
        .single();
    
    if (selectError && selectError.code !== 'PGRST116') { // PGRST116 is "No rows found"
        throw selectError;
    }

    // 3. If a valid coupon exists, return it
    if (existingCoupon) {
        return res.status(200).json({ code: existingCoupon.code, expiresAt: existingCoupon.expires_at });
    }

    // 4. If not, create a new one
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes from now

    const { error: insertError } = await supabase
        .from('coupons')
        .insert({
            user_id: userId,
            offer_id: offerId,
            code: code,
            expires_at: expiresAt,
        });

    if (insertError) throw insertError;

    return res.status(201).json({ code, expiresAt });

  } catch (error) {
    console.error('Error generating coupon:', error);
    return res.status(500).json({ error: 'Internal Server Error.' });
  }
}
