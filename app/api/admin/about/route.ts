import { NextResponse } from "next/server";
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM "AboutContent"');
    // Veritabanındaki tüm satırları (about, mission, vision, values) liste olarak döner
    return NextResponse.json(result.rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json(); 
    const query = `
      UPDATE "AboutContent" 
      SET "Title" = $1, "BodyText" = $2, "LastUpdated" = CURRENT_TIMESTAMP 
      WHERE "SectionKey" = $3
    `;
    await pool.query(query, [body.Title, body.BodyText, body.SectionKey]);
    return NextResponse.json({ message: "Başarıyla güncellendi" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}