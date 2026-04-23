import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Yeni PostgreSQL pool yapımız

export async function GET() {
  try {
    // result.recordset -> result.rows
    const result = await pool.query('SELECT * FROM "GalleryImages" ORDER BY "CreatedAt" DESC');
    
    return NextResponse.json(result.rows || []);
  } catch (error) {
    console.error("PostgreSQL Gallery GET hatası:", error);
    return NextResponse.json({ error: "Veri çekilemedi" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, imagePath } = await request.json();

    const query = `
      INSERT INTO "GalleryImages" ("Title", "ImagePath", "CreatedAt") 
      VALUES ($1, $2, CURRENT_TIMESTAMP)
    `;

    // Parametreleri $1 ve $2 olarak güvenli bir şekilde gönderiyoruz
    await pool.query(query, [title, imagePath]);

    return NextResponse.json({ message: "Anı başarıyla eklendi" });
  } catch (error) {
    console.error("PostgreSQL Gallery POST hatası:", error);
    return NextResponse.json({ error: "Yükleme başarısız" }, { status: 500 });
  }
}