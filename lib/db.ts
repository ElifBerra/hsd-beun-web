import sql from 'mssql';

const config = {
  user: 'sa', 
  password: 'BeunHsd2026!', // Burayı güncelle!
  server: '127.0.0.1', // Çift ters slash önemli
  database: 'HSDBEUN_DB',
  options: {
    encrypt: false, 
    trustServerCertificate: true, 
    instanceName: 'MSSQLSERVER05'
  },
  port: 1433 // Standart port, TCP/IP ayarlarında aksi belirtilmedikçe budur
};

export async function connectDB() {
  try {
    // Eğer halihazırda bir bağlantı havuzu varsa onu kullan, yoksa yeni oluştur
    if (global.pool) return global.pool;
    
    const pool = await sql.connect(config);
    global.pool = pool;
    return pool;
  } catch (err) {
    console.error('MSSQL Bağlantı Hatası: ', err);
    throw err;
  }
}