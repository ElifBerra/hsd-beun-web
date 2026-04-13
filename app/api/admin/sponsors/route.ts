import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM Sponsors ORDER BY DisplayOrder ASC');
    return NextResponse.json(result.recordset);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { SponsorName, LogoPath, WebsiteUrl, SponsorshipType, BrandColor } = body;
    const pool = await connectDB();
    await pool.request()
      .input('SponsorName', SponsorName)
      .input('LogoPath', LogoPath)
      .input('WebsiteUrl', WebsiteUrl || null)
      .input('SponsorshipType', SponsorshipType)
      .input('BrandColor', BrandColor || '#EA580C')
      .query(`
        INSERT INTO Sponsors (SponsorName, LogoPath, WebsiteUrl, SponsorshipType, BrandColor, IsActive, DisplayOrder, CreatedAt)
        VALUES (@SponsorName, @LogoPath, @WebsiteUrl, @SponsorshipType, @BrandColor, 1, 0, GETDATE())
      `);
    return NextResponse.json({ message: 'Eklendi!' }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { SponsorID, SponsorName, LogoPath, WebsiteUrl, SponsorshipType, BrandColor } = body;
    const pool = await connectDB();
    await pool.request()
      .input('SponsorID', Number(SponsorID))
      .input('SponsorName', SponsorName)
      .input('LogoPath', LogoPath)
      .input('WebsiteUrl', WebsiteUrl || null)
      .input('SponsorshipType', SponsorshipType)
      .input('BrandColor', BrandColor)
      .query(`
        UPDATE Sponsors 
        SET SponsorName = @SponsorName, LogoPath = @LogoPath, WebsiteUrl = @WebsiteUrl, 
            SponsorshipType = @SponsorshipType, BrandColor = @BrandColor
        WHERE SponsorID = @SponsorID
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
    await pool.request().input('id', Number(id)).query('DELETE FROM Sponsors WHERE SponsorID = @id');
    return NextResponse.json({ message: 'Silindi' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}