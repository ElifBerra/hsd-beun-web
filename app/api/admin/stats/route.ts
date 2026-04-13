// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    const pool = await connectDB();
    
    // Tablo adını [ContactMessages] olarak güncelledik
    const stats = await pool.request().query(`
      SELECT 
        (SELECT COUNT(*) FROM [Events]) as eventCount,
        (SELECT COUNT(*) FROM [EventParticipants]) as participantCount,
        (SELECT COUNT(*) FROM [ContactMessages]) as messageCount
    `);

    return NextResponse.json(stats.recordset[0]);
  } catch (err: any) {
    console.error("SQL HATASI:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}