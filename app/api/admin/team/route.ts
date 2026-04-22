import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const pool = await connectDB();
    const result = await pool.request().query("SELECT * FROM TeamMembers ORDER BY RoleType ASC, OrderIndex ASC");
    return NextResponse.json(result.recordset || []);
  } catch (error: any) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const b = await request.json();
    const pool = await connectDB();
    
    await pool.request()
      .input('name', b.FullName || '')
      .input('role', b.Role || '') // Eğer SQL'de kolonun adı Role ise burayı @role yapıyoruz
      .input('type', Number(b.RoleType) || 5)
      .input('committee', b.Committee || 'Genel')
      .input('li', b.LinkedInUrl || '')
      .input('gh', b.GitHubUrl || '')
      .input('md', b.MediumUrl || '')
      .input('photo', b.PhotoData || '')
      .input('showcase', b.IsShowcase ? 1 : 0)
      .query(`
        INSERT INTO TeamMembers (FullName, Role, RoleType, Committee, LinkedInUrl, GitHubUrl, MediumUrl, PhotoData, IsShowcase) 
        VALUES (@name, @role, @type, @committee, @li, @gh, @md, @photo, @showcase)
      `);
      
    return NextResponse.json({ message: "Başarıyla eklendi! 🚀" });
  } catch (error: any) {
    console.error("SQL POST HATASI:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT (Güncelleme) fonksiyonunda da RoleName kullandığından emin ol
export async function PUT(request: Request) {
  try {
    const b = await request.json();
    const pool = await connectDB();
    
    await pool.request()
      .input('id', b.MemberID)
      .input('name', b.FullName || '')
      .input('role', b.Role || '')
      .input('type', Number(b.RoleType) || 5)
      .input('committee', b.Committee || 'Genel')
      .input('li', b.LinkedInUrl || '')
      .input('gh', b.GitHubUrl || '')
      .input('md', b.MediumUrl || '')
      .input('photo', b.PhotoData || '')
      .input('showcase', b.IsShowcase ? 1 : 0)
      .query(`
        UPDATE TeamMembers 
        SET FullName=@name, Role=@role, RoleType=@type, Committee=@committee, 
            LinkedInUrl=@li, GitHubUrl=@gh, MediumUrl=@md, PhotoData=@photo, IsShowcase=@showcase
        WHERE MemberID=@id
      `);
      
    return NextResponse.json({ message: "Güncellendi! ✨" });
  } catch (error: any) {
    console.error("SQL PUT HATASI:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}