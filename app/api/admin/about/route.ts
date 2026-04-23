import { NextResponse } from "next/server";
import pool from '@/lib/db'; // Yeni PostgreSQL pool yapımız

export async function GET() {
  try {
    // result.recordset -> result.rows
    const result = await pool.query('SELECT * FROM "AboutContent"');
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error("PostgreSQL About GET Hatası:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json(); // { SectionKey, Title, BodyText }
    
    const query = `
      UPDATE "AboutContent" 
      SET "Title"=$1, "BodyText"=$2, "LastUpdated"=CURRENT_TIMESTAMP 
      WHERE "SectionKey"=$3
    `;

    // Parametreleri $1, $2, $3 olarak güvenli bir şekilde gönderiyoruz
    await pool.query(query, [body.Title, body.BodyText, body.SectionKey]);
    
    return NextResponse.json({ message: "Başarıyla güncellendi" });
  } catch (error: any) {
    console.error("PostgreSQL About PUT Hatası:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}