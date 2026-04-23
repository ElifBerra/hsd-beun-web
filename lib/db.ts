import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false // Bu satır 'self-signed' hatasını anında siler
  }
});

export default pool;