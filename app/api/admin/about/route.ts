import { NextResponse } from "next/server";
import pool from '@/lib/db';

export async function GET() {
  try {
    // Veritabanındaki tüm satırları çekiyoruz
    const result = await pool.query('SELECT * FROM "AboutContent"');
    
    // Frontend'in (anasayfanın) beklediği formatta bir obje oluşturuyoruz
    const data: any = {};
    
    result.rows.forEach((row: any) => {
      // Her bir SectionKey'i (mission, vision vb.) birer anahtar yapıyoruz
      data[row.SectionKey] = {
        Title: row.Title,
        BodyText: row.BodyText
      };
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Anasayfa About Hatası:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE: Yeni bir bölüm ekler
export async function POST(request: Request) {
  try {
    const { SectionKey, Title, BodyText } = await request.json();
    const result = await pool.query(
      'INSERT INTO "AboutContent" ("SectionKey", "Title", "BodyText") VALUES ($1, $2, $3) RETURNING *',
      [SectionKey, Title, BodyText]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE: Mevcut bölümü günceller
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await pool.query(
      'UPDATE "AboutContent" SET "Title"=$1, "BodyText"=$2, "LastUpdated"=CURRENT_TIMESTAMP WHERE "SectionKey"=$3',
      [body.Title, body.BodyText, body.SectionKey]
    );
    return NextResponse.json({ message: "Başarıyla güncellendi" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Bölümü siler
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sectionKey = searchParams.get('sectionKey');
    await pool.query('DELETE FROM "AboutContent" WHERE "SectionKey" = $1', [sectionKey]);
    return NextResponse.json({ message: "Bölüm silindi" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}