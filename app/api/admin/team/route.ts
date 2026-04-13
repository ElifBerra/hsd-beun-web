import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

// ÖNEMLİ: Next.js'in önbelleğini (cache) kapatır. Silinen anında kaybolur!
export const dynamic = 'force-dynamic';

// GET: LİSTELEME
export async function GET() {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM TeamMembers ORDER BY DisplayOrder ASC, MemberID ASC');
    return NextResponse.json(result.recordset);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: YENİ EKLEME
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { FullName, Role, ProfileImagePath } = body;
    const pool = await connectDB();
    
    await pool.request()
      .input('FullName', FullName)
      .input('Role', Role)
      .input('ProfileImagePath', ProfileImagePath || '/team/default-avatar.png')
      .query(`
        INSERT INTO TeamMembers (FullName, Role, ProfileImagePath, IsActive, DisplayOrder)
        VALUES (@FullName, @Role, @ProfileImagePath, 1, 0)
      `);
    return NextResponse.json({ message: 'Başarılı!' }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT: GÜNCELLEME (YENİ EKLENDİ)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { MemberID, FullName, Role, ProfileImagePath } = body;
    const pool = await connectDB();
    
    await pool.request()
      .input('MemberID', Number(MemberID))
      .input('FullName', FullName)
      .input('Role', Role)
      .input('ProfileImagePath', ProfileImagePath || '/team/default-avatar.png')
      .query(`
        UPDATE TeamMembers 
        SET FullName = @FullName, Role = @Role, ProfileImagePath = @ProfileImagePath
        WHERE MemberID = @MemberID
      `);
    return NextResponse.json({ message: 'Güncellendi!' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE: SİLME
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const pool = await connectDB();
    await pool.request()
      .input('id', Number(id))
      .query('DELETE FROM TeamMembers WHERE MemberID = @id');
    return NextResponse.json({ message: 'Silindi' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}