import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
  max: 10, // Aynı anda en fazla 10 bağlantı açık kalsın
  idleTimeoutMillis: 30000, // Boştaki bağlantıları 30 sn sonra kapat
  connectionTimeoutMillis: 2000, // Bağlanamazsan 2 sn içinde vazgeç (bekletme)
});

export default pool;