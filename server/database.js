import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

export async function initializeDatabase() {
  if (db) {
    return db;
  }
  
  try {
    db = await open({
      filename: './clubzn.db',
      driver: sqlite3.Database,
    });

    // Cria a tabela de cupons se ela não existir
    await db.exec(`
      CREATE TABLE IF NOT EXISTS coupons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        offer_id INTEGER NOT NULL,
        code TEXT NOT NULL UNIQUE,
        status TEXT NOT NULL CHECK(status IN ('pending', 'used', 'expired')) DEFAULT 'pending',
        expires_at TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
      );
    `);
    console.log('Database initialized and `coupons` table is ready.');
    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1); // Encerra a aplicação se o banco de dados não puder ser iniciado
  }
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
}
