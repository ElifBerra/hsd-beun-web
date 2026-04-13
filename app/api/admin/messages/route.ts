import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';


export async function GET() {
  try {
    const pool = await connectDB();
    // Sıralamayı SentAt sütununa göre yapıyoruz
    const result = await pool.request().query('SELECT * FROM ContactMessages ORDER BY SentAt DESC');
    return NextResponse.json(result.recordset);
  } catch (err: any) {
    console.error("MESAJ ÇEKME HATASI:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });

    const pool = await connectDB();
    
    // id'yi sayıya çeviriyoruz (Number) ve doğrudan gönderiyoruz
    await pool.request()
      .input('id', Number(id)) 
      .query('DELETE FROM ContactMessages WHERE MessageID = @id');

    return NextResponse.json({ message: 'Mesaj silindi' });
  } catch (err: any) {
    console.error("SİLME HATASI:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
