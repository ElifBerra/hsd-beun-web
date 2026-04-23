import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM "TeamMembers" ORDER BY "RoleType" ASC, "OrderIndex" ASC'
    );
    return NextResponse.json(result.rows || []);
  } catch (error: any) {
    console.error("GET Hatası:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const b = await request.json();
    
    const query = `
      INSERT INTO "TeamMembers" 
      ("FullName", "Role", "RoleType", "Committee", "LinkedInUrl", "GitHubUrl", "MediumUrl", "PhotoData", "IsShowcase") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    const values = [
      b.FullName || '',
      b.Role || '',
      Number(b.RoleType) || 5,
      b.Committee || 'Genel',
      b.LinkedInUrl || '',
      b.GitHubUrl || '',
      b.MediumUrl || '',
      b.PhotoData || '',
      b.IsShowcase ? true : false 
    ];

    await pool.query(query, values);
      
    return NextResponse.json({ message: "Başarıyla eklendi! 🚀" });
  } catch (error: any) {
    console.error("PostgreSQL POST HATASI:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const b = await request.json();
    
    const query = `
      UPDATE "TeamMembers" 
      SET "FullName"=$1, "Role"=$2, "RoleType"=$3, "Committee"=$4, 
          "LinkedInUrl"=$5, "GitHubUrl"=$6, "MediumUrl"=$7, "PhotoData"=$8, "IsShowcase"=$9
      WHERE "MemberID"=$10
    `;

    const values = [
      b.FullName || '',
      b.Role || '',
      Number(b.RoleType) || 5,
      b.Committee || 'Genel',
      b.LinkedInUrl || '',
      b.GitHubUrl || '',
      b.MediumUrl || '',
      b.PhotoData || '',
      b.IsShowcase ? true : false,
      b.MemberID
    ];

    await pool.query(query, values);
      
    return NextResponse.json({ message: "Güncellendi! ✨" });
  } catch (error: any) {
    console.error("PostgreSQL PUT HATASI:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}