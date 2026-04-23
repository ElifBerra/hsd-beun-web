import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // result.recordset yerine result.rows kullanıyoruz
    const result = await pool.query('SELECT * FROM "Sponsors" ORDER BY "DisplayOrder" ASC');
    return NextResponse.json(result.rows);
  } catch (err: any) {
    console.error("PostgreSQL GET Hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { SponsorName, LogoPath, WebsiteUrl, SponsorshipType, BrandColor } = body;

    const query = `
      INSERT INTO "Sponsors" ("SponsorName", "LogoPath", "WebsiteUrl", "SponsorshipType", "BrandColor", "IsActive", "DisplayOrder", "CreatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
    `;

    const values = [
      SponsorName,
      LogoPath,
      WebsiteUrl || null,
      SponsorshipType,
      BrandColor || '#EA580C',
      true, // IsActive için boolean true
      0     // DisplayOrder varsayılan
    ];

    await pool.query(query, values);
    return NextResponse.json({ message: 'Eklendi!' }, { status: 201 });
  } catch (err: any) {
    console.error("PostgreSQL POST Hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { SponsorID, SponsorName, LogoPath, WebsiteUrl, SponsorshipType, BrandColor } = body;

    const query = `
      UPDATE "Sponsors" 
      SET "SponsorName" = $1, "LogoPath" = $2, "WebsiteUrl" = $3, 
          "SponsorshipType" = $4, "BrandColor" = $5
      WHERE "SponsorID" = $6
    `;

    const values = [
      SponsorName,
      LogoPath,
      WebsiteUrl || null,
      SponsorshipType,
      BrandColor,
      Number(SponsorID)
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

    await pool.query('DELETE FROM "Sponsors" WHERE "SponsorID" = $1', [Number(id)]);
    return NextResponse.json({ message: 'Silindi' });
  } catch (err: any) {
    console.error("PostgreSQL DELETE Hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}