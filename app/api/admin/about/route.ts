import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const pool = await connectDB();
    const result = await pool.request().query("SELECT * FROM AboutContent");
    return NextResponse.json(result.recordset);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json(); // { SectionKey, Title, BodyText }
    const pool = await connectDB();
    
    await pool.request()
      .input('key', body.SectionKey)
      .input('title', body.Title)
      .input('text', body.BodyText)
      .query(`
        UPDATE AboutContent 
        SET Title=@title, BodyText=@text, LastUpdated=GETDATE() 
        WHERE SectionKey=@key
      `);
    
    return NextResponse.json({ message: "Başarıyla güncellendi" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}