import express from 'express';
import cors from 'cors';
import { customAlphabet } from 'nanoid';
import { initializeDatabase, getDb } from './database.js';
import { supabase } from './supabaseClient.js';

const app = express();
const port = 4000;

// Configuração de Middlewares
app.use(cors());
app.use(express.json());

// Gerador de código customizado: 6 caracteres, alfanumérico, maiúsculo.
const generateCode = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

// Endpoint para gerar um novo cupom
app.post('/api/gerar-cupom', async (req, res) => {
  const { userId, offerId } = req.body;
  if (!userId || !offerId) {
    return res.status(400).json({ error: 'userId e offerId são obrigatórios.' });
  }

  const db = getDb();

  try {
    // Verifica e limpa cupons expirados para este usuário/oferta antes de criar um novo
    await db.run(
      `UPDATE coupons SET status = 'expired' WHERE user_id = ? AND offer_id = ? AND status = 'pending' AND expires_at < strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`,
      [userId, offerId]
    );

    // Verifica se já existe um cupom pendente e válido para este usuário e oferta
    const existingCoupon = await db.get(
      "SELECT * FROM coupons WHERE user_id = ? AND offer_id = ? AND status = 'pending'",
      [userId, offerId]
    );

    if (existingCoupon) {
      return res.json({ code: existingCoupon.code, expiresAt: existingCoupon.expires_at });
    }

    // Se não existir, cria um novo
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutos a partir de agora

    await db.run(
      'INSERT INTO coupons (user_id, offer_id, code, expires_at) VALUES (?, ?, ?, ?)',
      [userId, offerId, code, expiresAt]
    );

    res.status(201).json({ code, expiresAt });
  } catch (error) {
    console.error('Erro ao gerar cupom:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Endpoint para validar um cupom
app.post('/api/validar-cupom', async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'O código do cupom é obrigatório.' });
  }

  const db = getDb();
  
  try {
    const coupon = await db.get('SELECT * FROM coupons WHERE code = ?', code.toUpperCase());

    if (!coupon) {
      return res.status(404).json({ error: 'Cupom não encontrado.' });
    }

    if (coupon.status === 'used') {
      return res.status(409).json({ error: 'Este cupom já foi utilizado.' });
    }
    
    const isExpired = new Date() > new Date(coupon.expires_at);
    if (coupon.status === 'expired' || isExpired) {
      // Garante que o status seja 'expired' no banco
      if (coupon.status !== 'expired') {
        await db.run("UPDATE coupons SET status = 'expired' WHERE id = ?", coupon.id);
      }
      return res.status(410).json({ error: 'Este cupom está expirado.' });
    }

    // Se chegou aqui, o cupom é válido. Marca como usado.
    await db.run("UPDATE coupons SET status = 'used' WHERE id = ?", coupon.id);

    // Busca dados do cliente e da oferta no Supabase para retornar ao parceiro
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('company_name, description') // Simulando busca do nome do cliente (vamos assumir que é 'company_name' para simplificar)
      .eq('id', coupon.user_id)
      .single();

    const { data: offerData, error: offerError } = await supabase
      .from('offers')
      .select('title, description')
      .eq('id', coupon.offer_id)
      .single();

    if (profileError || offerError) {
      console.error('Erro ao buscar dados do Supabase:', profileError || offerError);
      // Mesmo com erro no Supabase, a validação foi um sucesso. Retornamos o que temos.
    }
    
    res.json({
      message: 'Cupom validado com sucesso!',
      validationData: {
        customerName: profileData?.company_name || 'Cliente não encontrado',
        offerTitle: offerData?.title || 'Oferta não encontrada',
        validatedAt: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Erro ao validar cupom:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Endpoint para sincronizar cupons validados offline
app.post('/api/sync-cupons', async (req, res) => {
    const { codes } = req.body;
    if (!Array.isArray(codes) || codes.length === 0) {
        return res.status(400).json({ error: 'Array de códigos é obrigatório.' });
    }

    const db = getDb();
    const results = {
        success: [],
        failed: [],
    };

    for (const code of codes) {
        try {
            const coupon = await db.get('SELECT * FROM coupons WHERE code = ?', code.toUpperCase());
            if (coupon && coupon.status === 'pending' && new Date() < new Date(coupon.expires_at)) {
                await db.run("UPDATE coupons SET status = 'used' WHERE id = ?", coupon.id);
                results.success.push(code);
            } else {
                results.failed.push({ code, reason: 'Inválido, expirado ou já utilizado.' });
            }
        } catch (error) {
            results.failed.push({ code, reason: 'Erro no servidor durante a validação.' });
        }
    }

    res.json(results);
});


// Iniciar o servidor
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Backend do Clube ZN rodando em http://localhost:${port}`);
  });
}).catch(err => {
    console.error("Falha ao iniciar o servidor", err);
});
