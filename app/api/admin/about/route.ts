import { NextResponse } from "next/server";
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM "AboutContent" LIMIT 1');
    
    if (result.rows.length === 0) {
      return NextResponse.json({ Title: "", BodyText: "" });
    }

    const row = result.rows[0];

    // Frontend büyük/küçük harf duyarlı olabilir. 
    // Eğer admin sayfan boş geliyorsa, iki ihtimali de kapsayacak şekilde gönderelim:
    return NextResponse.json({
      ...row,
      Title: row.Title, // Eğer frontend Title bekliyorsa
      BodyText: row.BodyText, // Eğer frontend BodyText bekliyorsa
      title: row.Title, // Eğer frontend title bekliyorsa
      bodyText: row.BodyText // Eğer frontend bodyText bekliyorsa
    });

  } catch (error: any) {
    console.error("GET Hatası:", error.message);
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