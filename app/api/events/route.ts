import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// 1. TÜM ETKİNLİKLERİ GETİR
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM "Events" ORDER BY "EventDate" DESC');
    return NextResponse.json(result.rows);
  } catch (err: any) {
    console.error("PostgreSQL GET Hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 2. YENİ ETKİNLİK EKLE
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Title, Description, EventDate, Location, CoverImagePath, CategoryID, OrganizerID } = body;
    
    const query = `
      INSERT INTO "Events" ("Title", "Description", "EventDate", "Location", "CoverImagePath", "CategoryID", "OrganizerID") 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const values = [
      Title,
      Description,
      new Date(EventDate), // PostgreSQL Date nesnesini tanır
      Location,
      CoverImagePath || '/gallery/default.jpg',
      CategoryID || 1,
      OrganizerID || 1
    ];

    await pool.query(query, values);

    return NextResponse.json({ message: 'Etkinlik başarıyla eklendi! 🚀' }, { status: 201 });
  } catch (err: any) {
    console.error("PostgreSQL POST HATASI:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 3. ETKİNLİK SİL
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await pool.query('DELETE FROM "Events" WHERE "EventID" = $1', [id]);
    
    return NextResponse.json({ message: 'Etkinlik silindi' });
  } catch (err: any) {
    console.error("PostgreSQL DELETE Hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}