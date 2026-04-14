import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const pool = await connectDB();
    const result = await pool.request().query("SELECT * FROM Publications ORDER BY PublishDate DESC");
    return NextResponse.json(result.recordset || []);
  } catch (error: any) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pool = await connectDB();
    await pool.request()
      .input('Title', body.Title || '')
      .input('Summary', body.Summary || '')
      .input('ContentUrl', body.ContentUrl || '')
      .input('CoverImage', body.CoverImage || '')
      .input('Category', body.Category || '')
      .input('IsFeatured', body.IsFeatured ? 1 : 0)
      .query(`INSERT INTO Publications (Title, Summary, ContentUrl, CoverImage, PublishDate, Category, IsFeatured) 
              VALUES (@Title, @Summary, @ContentUrl, @CoverImage, GETDATE(), @Category, @IsFeatured)`);
    return NextResponse.json({ message: "Başarılı" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- GÜNCELLEME KISMI ---
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const pool = await connectDB();
    await pool.request()
      .input('id', body.PubKey)
      .input('Title', body.Title || '')
      .input('Summary', body.Summary || '')
      .input('ContentUrl', body.ContentUrl || '')
      .input('CoverImage', body.CoverImage || '')
      .input('Category', body.Category || '')
      .input('IsFeatured', body.IsFeatured ? 1 : 0)
      .query(`UPDATE Publications SET Title=@Title, Summary=@Summary, ContentUrl=@ContentUrl, 
              CoverImage=@CoverImage, Category=@Category, IsFeatured=@IsFeatured WHERE PubKey=@id`);
    return NextResponse.json({ message: "Güncellendi" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const pool = await connectDB();
    await pool.request().input('id', id).query("DELETE FROM Publications WHERE PubKey = @id");
    return NextResponse.json({ message: "Silindi" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}