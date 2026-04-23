import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    // result.recordset -> result.rows
    const result = await pool.query('SELECT * FROM "Publications" ORDER BY "PublishDate" DESC');
    return NextResponse.json(result.rows || []);
  } catch (error: any) {
    console.error("PostgreSQL GET Hatası:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const query = `
      INSERT INTO "Publications" ("Title", "Summary", "ContentUrl", "CoverImage", "PublishDate", "Category", "IsFeatured") 
      VALUES ($1, $2, $3, $4, CURRENT_DATE, $5, $6)
    `;

    const values = [
      body.Title || '',
      body.Summary || '',
      body.ContentUrl || '',
      body.CoverImage || '',
      body.Category || '',
      body.IsFeatured ? true : false // Boolean dönüşümü
    ];

    await pool.query(query, values);
    return NextResponse.json({ message: "Başarılı" });
  } catch (error: any) {
    console.error("PostgreSQL POST Hatası:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    const query = `
      UPDATE "Publications" 
      SET "Title"=$1, "Summary"=$2, "ContentUrl"=$3, "CoverImage"=$4, "Category"=$5, "IsFeatured"=$6 
      WHERE "PubKey"=$7
    `;

    const values = [
      body.Title || '',
      body.Summary || '',
      body.ContentUrl || '',
      body.CoverImage || '',
      body.Category || '',
      body.IsFeatured ? true : false,
      body.PubKey
    ];

    await pool.query(query, values);
    return NextResponse.json({ message: "Güncellendi" });
  } catch (error: any) {
    console.error("PostgreSQL PUT Hatası:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await pool.query('DELETE FROM "Publications" WHERE "PubKey" = $1', [id]);
    return NextResponse.json({ message: "Silindi" });
  } catch (error: any) {
    console.error("PostgreSQL DELETE Hatası:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}