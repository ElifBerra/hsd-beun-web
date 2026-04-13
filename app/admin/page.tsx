"use client";
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ eventCount: 0, participantCount: 0, messageCount: 0 });

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-3xl font-bold">Hoş Geldin, Elif! 🧡</h2>
        <p className="text-zinc-400 font-medium italic">HSD BEUN Kontrol Merkezi</p>
      </header>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:border-orange-500/30 transition-all">
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Toplam Etkinlik</p>
          <h3 className="text-5xl font-black mt-3 text-white">{stats.eventCount}</h3>
        </div>
        
        <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:border-orange-500/30 transition-all">
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Yeni Mesajlar</p>
          <h3 className="text-5xl font-black mt-3 text-orange-500">{stats.messageCount}</h3>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:border-orange-500/30 transition-all">
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Kayıtlı Katılımcı</p>
          <h3 className="text-5xl font-black mt-3 text-white">{stats.participantCount}</h3>
        </div>
      </div>

      <div className="mt-10 p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
         <p className="text-sm text-orange-200">
           <strong>Sistem Notu:</strong> Veriler doğrudan <code>HSDBEUN_DB</code> üzerinden anlık çekilmektedir.
         </p>
      </div>
    </div>
  );
}