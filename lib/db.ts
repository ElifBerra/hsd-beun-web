import { Pool } from 'pg';

// Global nesnesi içine pool ekleyerek gereksiz bağlantı açılmasını önlüyoruz
declare global {
  var pgPool: Pool | undefined;
}

const pool = global.pgPool || new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false // Supabase bağlantısı için bu güvenlik ayarı şarttır
  }
});

if (process.env.NODE_ENV !== 'production') global.pgPool = pool;

export default pool;