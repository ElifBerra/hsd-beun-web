"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FullTeamPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [committees, setCommittees] = useState<any[]>([]);

  useEffect(() => {
    // Hem üyeleri hem komite listesini çekiyoruz
    Promise.all([
      fetch('/api/admin/team').then(res => res.json()),
      fetch('/api/admin/committees').then(res => res.json()) // Bu API'yi yapman gerekecek
    ]).then(([teamData, commData]) => {
      setMembers(teamData);
      setCommittees(commData);
    });
  }, []);

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-32">
        <h1 className="text-7xl md:text-9xl font-black italic uppercase text-white tracking-tighter opacity-20">FAMILY</h1>
        <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white relative -mt-10">TÜM <span className="text-orange-600">EKİBİMİZ</span></h2>
      </div>

      <div className="max-w-7xl mx-auto space-y-32">
        {committees.map((comm) => {
          const commMembers = members.filter(m => m.Committee === comm.CommitteeName);
          if (commMembers.length === 0) return null;

          return (
            <section key={comm.CommitteeID}>
              <div className="flex items-center gap-6 mb-12">
                <h3 className="text-2xl md:text-3xl font-black italic uppercase text-white tracking-widest">
                  {comm.CommitteeName} <span className="text-orange-600">KOMİTESİ</span>
                </h3>
                <div className="h-[1px] flex-1 bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {commMembers.sort((a,b) => a.RoleType - b.RoleType).map((m) => (
                  <div key={m.MemberID} className="group text-center">
                    <div className="aspect-square rounded-[2rem] overflow-hidden border border-white/5 bg-zinc-900 group-hover:border-orange-600/40 transition-all mb-4">
                      <img src={m.PhotoData} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase truncate">{m.FullName}</h4>
                    <p className="text-[9px] text-zinc-500 font-black uppercase tracking-tighter">{m.Role}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}