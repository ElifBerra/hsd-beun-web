import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Yeni PostgreSQL bağlantımız

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { FullName, Email, Subject, MessageBody } = body;

    // Doğrulama kontrolü aynı kalıyor
    if (!FullName || !Email || !MessageBody) {
      return NextResponse.json({ error: 'Lütfen zorunlu alanları doldurun.' }, { status: 400 });
    }

    const query = `
      INSERT INTO "ContactMessages" ("FullName", "Email", "Subject", "MessageBody", "SentAt", "IsRead")
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5)
    `;

    const values = [
      FullName,
      Email,
      Subject || 'İletişim Formu',
      MessageBody,
      false // IsRead için boolean false
    ];

    await pool.query(query, values);

    return NextResponse.json({ message: 'Mesajın başarıyla ulaştı Turuncu! 🚀' }, { status: 201 });
  } catch (err: any) {
    console.error("PostgreSQL MESAJ KAYIT HATASI:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}