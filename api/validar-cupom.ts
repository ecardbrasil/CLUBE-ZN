import { createClient } from '@supabase/supabase-js';
import type { Database } from '../lib/supabaseClient';

const handleCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
};

export default async function handler(req, res) {
  if (handleCors(req, res)) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'Coupon code is required.' });
    }

    const { data: coupon, error: couponError } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();
      
    if (couponError || !coupon) {
      return res.status(404).json({ error: 'Cupom não encontrado.' });
    }

    if (coupon.status === 'used') {
      return res.status(409).json({ error: 'Este cupom já foi utilizado.' });
    }

    const isExpired = new Date() > new Date(coupon.expires_at);
    if (coupon.status === 'expired' || isExpired) {
      if (coupon.status !== 'expired') {
        await supabase.from('coupons').update({ status: 'expired' }).eq('id', coupon.id);
      }
      return res.status(410).json({ error: 'Este cupom está expirado.' });
    }
    
    // Mark as used
    const { error: updateError } = await supabase
      .from('coupons')
      .update({ status: 'used' })
      .eq('id', coupon.id);

    if (updateError) throw updateError;
    
    // Fetch related data for response
    // NOTE: In a real app, user profiles might not store 'company_name'. 
    // This assumes customer name might be in a 'full_name' field, but uses company_name for consistency with the existing structure.
    const { data: profileData } = await supabase
      .from('profiles')
      .select('company_name') 
      .eq('id', coupon.user_id)
      .single();

    const { data: offerData } = await supabase
      .from('offers')
      .select('title')
      .eq('id', coupon.offer_id)
      .single();

    res.status(200).json({
      message: 'Cupom validado com sucesso!',
      validationData: {
        customerName: profileData?.company_name || 'Cliente',
        offerTitle: offerData?.title || 'Oferta não encontrada',
        validatedAt: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Error validating coupon:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}
