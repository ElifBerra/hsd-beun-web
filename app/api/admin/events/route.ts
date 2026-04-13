import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM Events ORDER BY EventDate DESC');
    return NextResponse.json(result.recordset);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // BURAYA RegistrationLink EKLEDİK:
    const { Title, Description, EventDate, Location, CoverImagePath, RegistrationLink } = body;
    
    const pool = await connectDB();
    await pool.request()
      .input('Title', Title)
      .input('Description', Description)
      .input('EventDate', EventDate)
      .input('Location', Location)
      .input('CoverImagePath', CoverImagePath)
      .input('RegistrationLink', RegistrationLink || null)
      .query(`
        INSERT INTO Events (Title, Description, EventDate, Location, CoverImagePath, RegistrationLink)
        VALUES (@Title, @Description, @EventDate, @Location, @CoverImagePath, @RegistrationLink)
      `);
    return NextResponse.json({ message: 'Etkinlik oluşturuldu!' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    // BURAYA DA RegistrationLink EKLEDİK:
    const { EventID, Title, Description, EventDate, Location, CoverImagePath, RegistrationLink } = body;
    
    const pool = await connectDB();
    await pool.request()
      .input('EventID', EventID)
      .input('Title', Title)
      .input('Description', Description)
      .input('EventDate', EventDate)
      .input('Location', Location)
      .input('CoverImagePath', CoverImagePath)
      .input('RegistrationLink', RegistrationLink || null)
      .query(`
        UPDATE Events 
        SET Title=@Title, Description=@Description, EventDate=@EventDate, 
            Location=@Location, CoverImagePath=@CoverImagePath, RegistrationLink=@RegistrationLink
        WHERE EventID=@EventID
      `);
    return NextResponse.json({ message: 'Güncellendi!' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const pool = await connectDB();
    await pool.request().input('id', id).query('DELETE FROM Events WHERE EventID = @id');
    return NextResponse.json({ message: 'Silindi' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}