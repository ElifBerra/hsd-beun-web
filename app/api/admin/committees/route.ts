import { NextResponse } from "next/server";
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM "Committees" ORDER BY "OrderIndex" ASC');
    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { CommitteeName } = await request.json(); // Frontend'den gelen veri

    // Tablo ve sütun isimlerini ÇİFT TIRNAK içine alıyoruz
    const result = await pool.query(
      'INSERT INTO "Committees" ("CommitteeName") VALUES ($1) RETURNING *',
      [CommitteeName]
    );

    return NextResponse.json({ message: "Komite başarıyla eklendi", data: result.rows[0] });
  } catch (error: any) {
    console.error("Komite Ekleme Hatası:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    // WHERE şartında $1 ile ID gönderiyoruz
    await pool.query('DELETE FROM "Committees" WHERE "CommitteeID" = $1', [id]);
    return NextResponse.json({ message: "Komite silindi" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { CommitteeID, CommitteeName } = await request.json();
    // Birden fazla parametre için $1, $2 şeklinde sıralıyoruz
    await pool.query(
      'UPDATE "Committees" SET "CommitteeName" = $1 WHERE "CommitteeID" = $2', 
      [CommitteeName, CommitteeID]
    );
    return NextResponse.json({ message: "Komite güncellendi" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}