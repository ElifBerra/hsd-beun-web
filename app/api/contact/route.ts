import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { FullName, Email, Subject, MessageBody } = body;

    // Basit bir doğrulama: Boş alan varsa uyarı ver
    if (!FullName || !Email || !MessageBody) {
      return NextResponse.json({ error: 'Lütfen zorunlu alanları doldurun.' }, { status: 400 });
    }

    const pool = await connectDB();
    
    // Tipleri (sql.NVarChar vs) kaldırdık, veriyi doğrudan veriyoruz
    await pool.request()
      .input('FullName', FullName)
      .input('Email', Email)
      .input('Subject', Subject || 'İletişim Formu') 
      .input('MessageBody', MessageBody)
      .query(`
        INSERT INTO ContactMessages (FullName, Email, Subject, MessageBody, SentAt, IsRead)
        VALUES (@FullName, @Email, @Subject, @MessageBody, GETDATE(), 0)
      `);

    return NextResponse.json({ message: 'Mesajın başarıyla ulaştı Turuncu! 🚀' }, { status: 201 });
  } catch (err: any) {
    console.error("MESAJ KAYIT HATASI:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}