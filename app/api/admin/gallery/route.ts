import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // connectDB fonksiyonunu çağırıyoruz

export async function GET() {
  try {
    const pool = await connectDB(); // Önce bağlantıyı kuruyoruz
    const result = await pool.request().query("SELECT * FROM GalleryImages ORDER BY CreatedAt DESC");
    
    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error("Gallery GET hatası:", error);
    return NextResponse.json({ error: "Veri çekilemedi" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, imagePath } = await request.json();
    const pool = await connectDB(); // Bağlantıyı kuruyoruz

    // MSSQL'de parametreli sorgu (SQL Injection koruması için en güvenlisi)
    await pool.request()
      .input('title', title)
      .input('imagePath', imagePath)
      .query("INSERT INTO GalleryImages (Title, ImagePath, CreatedAt) VALUES (@title, @imagePath, GETDATE())");

    return NextResponse.json({ message: "Anı başarıyla eklendi" });
  } catch (error) {
    console.error("Gallery POST hatası:", error);
    return NextResponse.json({ error: "Yükleme başarısız" }, { status: 500 });
  }
}