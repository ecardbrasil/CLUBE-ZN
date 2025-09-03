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
    const { codes } = req.body;
    if (!Array.isArray(codes) || codes.length === 0) {
      return res.status(400).json({ error: 'An array of codes is required.' });
    }
    
    const upperCaseCodes = codes.map(c => String(c).toUpperCase());
    
    // Find which of the provided codes are valid for an update
    const { data: validCoupons, error: selectError } = await supabase
        .from('coupons')
        .select('code')
        .in('code', upperCaseCodes)
        .eq('status', 'pending')
        .gt('expires_at', new Date().toISOString());

    if (selectError) throw selectError;

    const codesToUpdate = validCoupons.map(c => c.code);
    const results = {
        success: [],
        failed: [],
    };

    if (codesToUpdate.length > 0) {
        const { error: updateError } = await supabase
            .from('coupons')
            .update({ status: 'used' })
            .in('code', codesToUpdate);
        
        if (updateError) {
            // If the bulk update fails, we can't be sure which succeeded
            return res.status(500).json({ error: 'Failed to sync coupons.' });
        }
        results.success = codesToUpdate;
    }
    
    // Determine which codes failed
    results.failed = upperCaseCodes.reduce((acc, code) => {
        if (!codesToUpdate.includes(code)) {
            acc.push({ code, reason: 'Inválido, expirado, já utilizado ou não encontrado.' });
        }
        return acc;
    }, []);
    
    return res.status(200).json(results);

  } catch (error) {
    console.error('Error syncing coupons:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}
