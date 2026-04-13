// app/api/events/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

// 1. TÜM ETKİNLİKLERİ GETİR
export async function GET() {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM Events ORDER BY EventDate DESC');
    return NextResponse.json(result.recordset);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 2. YENİ ETKİNLİK EKLE
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Title, Description, EventDate, Location, CoverImagePath, CategoryID, OrganizerID } = body;
    
    const pool = await connectDB();
    
    // Tip tanımlamalarını kaldırıp doğrudan değerleri eşliyoruz
    await pool.request()
      .input('Title', Title)
      .input('Description', Description)
      .input('EventDate', new Date(EventDate))
      .input('Location', Location)
      .input('CoverImagePath', CoverImagePath || '/gallery/default.jpg')
      .input('CategoryID', CategoryID || 1)
      .input('OrganizerID', OrganizerID || 1)
      .query(`
        INSERT INTO Events (Title, Description, EventDate, Location, CoverImagePath, CategoryID, OrganizerID) 
        VALUES (@Title, @Description, @EventDate, @Location, @CoverImagePath, @CategoryID, @OrganizerID)
      `);

    return NextResponse.json({ message: 'Etkinlik başarıyla eklendi! 🚀' }, { status: 201 });
  } catch (err: any) {
    console.error("POST HATASI:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 3. ETKİNLİK SİL
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const pool = await connectDB();
    await pool.request().input('id', id).query('DELETE FROM Events WHERE EventID = @id');
    return NextResponse.json({ message: 'Etkinlik silindi' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}