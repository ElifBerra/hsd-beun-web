import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    const pool = await connectDB();
    // Veritabanından tüm etkinlikleri çekiyoruz
    const result = await pool.request().query('SELECT * FROM Events');
    
    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error("API Hatası:", error);
    return NextResponse.json({ error: 'Veritabanı bağlantısı kurulamadı' }, { status: 500 });
  }
}