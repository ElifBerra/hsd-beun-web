import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pool = await connectDB();
    // Senin tablonda CreatedAt yok, o yüzden StartDate'e göre sıralıyoruz
    const result = await pool.request().query('SELECT * FROM Announcements ORDER BY StartDate DESC, AnnID DESC');
    return NextResponse.json(result.recordset);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Title, Content } = body;
    const pool = await connectDB();
    
    // Senin sütun isimlerini (AnnID, StartDate vb.) kullandık
    await pool.request()
      .input('Title', Title)
      .input('Content', Content)
      .query(`
        INSERT INTO Announcements (Title, Content, StartDate, IsActive, Priority)
        VALUES (@Title, @Content, GETDATE(), 1, 1)
      `);
    return NextResponse.json({ message: 'Duyuru Eklendi!' }, { status: 201 });
  } catch (err: any) {
    console.error("SQL HATASI:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { AnnID, Title, Content } = body; // AnnouncementID -> AnnID oldu
    const pool = await connectDB();
    
    await pool.request()
      .input('AnnID', Number(AnnID))
      .input('Title', Title)
      .input('Content', Content)
      .query(`
        UPDATE Announcements 
        SET Title = @Title, Content = @Content
        WHERE AnnID = @AnnID
      `);
    return NextResponse.json({ message: 'Duyuru Güncellendi!' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const pool = await connectDB();
    await pool.request()
      .input('id', Number(id))
      .query('DELETE FROM Announcements WHERE AnnID = @id'); // AnnID kullanıldı
    return NextResponse.json({ message: 'Silindi' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}