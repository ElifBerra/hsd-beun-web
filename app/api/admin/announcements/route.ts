import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Yeni PostgreSQL pool yapımız

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // result.recordset -> result.rows
    const result = await pool.query('SELECT * FROM "Announcements" ORDER BY "StartDate" DESC, "AnnID" DESC');
    return NextResponse.json(result.rows);
  } catch (err: any) {
    console.error("PostgreSQL GET Hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Title, Content } = body;

    const query = `
      INSERT INTO "Announcements" ("Title", "Content", "StartDate", "IsActive", "Priority")
      VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4)
    `;

    const values = [
      Title,
      Content,
      true,      // IsActive için boolean true
      'Normal'   // Priority için string (iskelette nvarchar olan yer)
    ];

    await pool.query(query, values);
    return NextResponse.json({ message: 'Duyuru Eklendi!' }, { status: 201 });
  } catch (err: any) {
    console.error("PostgreSQL POST HATASI:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { AnnID, Title, Content } = body;
    
    const query = `
      UPDATE "Announcements" 
      SET "Title" = $1, "Content" = $2
      WHERE "AnnID" = $3
    `;

    await pool.query(query, [Title, Content, Number(AnnID)]);
    
    return NextResponse.json({ message: 'Duyuru Güncellendi!' });
  } catch (err: any) {
    console.error("PostgreSQL PUT Hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    await pool.query('DELETE FROM "Announcements" WHERE "AnnID" = $1', [Number(id)]);
    
    return NextResponse.json({ message: 'Silindi' });
  } catch (err: any) {
    console.error("PostgreSQL DELETE Hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}