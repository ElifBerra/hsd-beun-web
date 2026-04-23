import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Yeni PostgreSQL bağlantımız

export async function GET() {
  try {
    // result.recordset yerine result.rows kullanıyoruz
    // Tablo ve sütun isimlerini çift tırnak içinde belirttik
    const result = await pool.query('SELECT * FROM "ContactMessages" ORDER BY "SentAt" DESC');
    return NextResponse.json(result.rows);
  } catch (err: any) {
    console.error("PostgreSQL MESAJ ÇEKME HATASI:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });

    // pool.request().input() yerine pool.query(sorgu, [parametreler]) yapısı
    await pool.query('DELETE FROM "ContactMessages" WHERE "MessageID" = $1', [Number(id)]);

    return NextResponse.json({ message: 'Mesaj silindi' });
  } catch (err: any) {
    console.error("PostgreSQL SİLME HATASI:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}