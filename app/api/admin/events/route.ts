import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // result.recordset yerine result.rows kullanıyoruz
    const result = await pool.query('SELECT * FROM "Events" ORDER BY "EventDate" DESC');
    return NextResponse.json(result.rows);
  } catch (err: any) {
    console.error("PostgreSQL GET Hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Title, Description, EventDate, Location, CoverImagePath, RegistrationLink } = body;
    
    const query = `
      INSERT INTO "Events" ("Title", "Description", "EventDate", "Location", "CoverImagePath", "RegistrationLink")
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    const values = [
      Title,
      Description,
      new Date(EventDate), // PostgreSQL tarih formatı için Date objesi
      Location,
      CoverImagePath,
      RegistrationLink || null
    ];

    await pool.query(query, values);
    return NextResponse.json({ message: 'Etkinlik oluşturuldu!' });
  } catch (err: any) {
    console.error("PostgreSQL POST Hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { EventID, Title, Description, EventDate, Location, CoverImagePath, RegistrationLink } = body;
    
    const query = `
      UPDATE "Events" 
      SET "Title"=$1, "Description"=$2, "EventDate"=$3, 
          "Location"=$4, "CoverImagePath"=$5, "RegistrationLink"=$6
      WHERE "EventID"=$7
    `;

    const values = [
      Title,
      Description,
      new Date(EventDate),
      Location,
      CoverImagePath,
      RegistrationLink || null,
      EventID
    ];

    await pool.query(query, values);
    return NextResponse.json({ message: 'Güncellendi!' });
  } catch (err: any) {
    console.error("PostgreSQL PUT Hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    await pool.query('DELETE FROM "Events" WHERE "EventID" = $1', [id]);
    return NextResponse.json({ message: 'Silindi' });
  } catch (err: any) {
    console.error("PostgreSQL DELETE Hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}