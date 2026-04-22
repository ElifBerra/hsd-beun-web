import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const pool = await connectDB();
    const result = await pool.request().query("SELECT * FROM Committees ORDER BY OrderIndex ASC");
    return NextResponse.json(result.recordset || []);
  } catch (error: any) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { CommitteeName } = await request.json();
    const pool = await connectDB();
    await pool.request()
      .input('name', CommitteeName)
      .query("INSERT INTO Committees (CommitteeName) VALUES (@name)");
    return NextResponse.json({ message: "Komite eklendi" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE Metodu: URL'den gelen ID ile siler
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const pool = await connectDB();
    await pool.request().input('id', id).query("DELETE FROM Committees WHERE CommitteeID = @id");
    return NextResponse.json({ message: "Komite silindi" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT Metodu: İsmi günceller
export async function PUT(request: Request) {
  try {
    const { CommitteeID, CommitteeName } = await request.json();
    const pool = await connectDB();
    await pool.request()
      .input('id', CommitteeID)
      .input('name', CommitteeName)
      .query("UPDATE Committees SET CommitteeName = @name WHERE CommitteeID = @id");
    return NextResponse.json({ message: "Komite güncellendi" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}