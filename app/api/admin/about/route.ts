import { NextResponse } from "next/server";
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM "AboutContent" LIMIT 1');
    
    // Eğer veritabanı boşsa frontend patlamasın diye boş bir obje döneriz
    if (result.rows.length === 0) {
      return NextResponse.json({ 
        SectionKey: "about", 
        Title: "Hakkımızda", 
        BodyText: "" 
      });
    }

    // result.rows[0] diyerek listenin İLK elemanını (objeyi) gönderiyoruz
    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error("PostgreSQL About GET Hatası:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json(); 
    
    // PostgreSQL tırnak işaretlerine ve $1, $2 sırasına çok dikkat eder
    const query = `
      UPDATE "AboutContent" 
      SET "Title" = $1, "BodyText" = $2, "LastUpdated" = CURRENT_TIMESTAMP 
      WHERE "SectionKey" = $3
      RETURNING *
    `;

    const values = [body.Title, body.BodyText, body.SectionKey || 'about'];
    const result = await pool.query(query, values);
    
    if (result.rowCount === 0) {
        return NextResponse.json({ error: "Güncellenecek kayıt bulunamadı." }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Başarıyla güncellendi", data: result.rows[0] });
  } catch (error: any) {
    console.error("PostgreSQL About PUT Hatası:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}