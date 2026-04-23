import { NextResponse } from 'next/server';
import pool from '@/lib/db'; 

export async function GET() {
  try {
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM "Events")::int as "eventCount",
        (SELECT COUNT(*) FROM "EventParticipants")::int as "participantCount",
        (SELECT COUNT(*) FROM "ContactMessages")::int as "messageCount"
    `;

    const result = await pool.query(query);

    return NextResponse.json(result.rows[0] || {
      eventCount: 0,
      participantCount: 0,
      messageCount: 0
    });
  } catch (err: any) {
    console.error("PostgreSQL Stats Hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}