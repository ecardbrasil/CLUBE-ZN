import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be defined in .env file");
}

// Note: Para um ambiente de produção real, você usaria a chave de SERVIÇO (service_role)
// para contornar políticas de RLS, já que o backend é um ambiente confiável.
// Para este exemplo, a chave anônima é suficiente.
export const supabase = createClient(supabaseUrl, supabaseKey);
