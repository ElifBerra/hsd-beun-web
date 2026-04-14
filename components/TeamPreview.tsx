"use client";
import React from 'react';
import Link from 'next/link';

export default function TeamPreview() {
  const team = [
    { id: 1, name: 'DDFG', role: 'Founder', img: '/team/1.jpg' }
    // Diğer üyeler buraya gelecek...
  ];

  return (
    <section id="team" className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* BAŞLIK BÖLÜMÜ */}
        <div className="flex flex-col items-center justify-center text-center mb-20">
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-4 bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent pr-4">
             EKİBİMİZ
            </h2>
            
            <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-8">
              GELECEĞİ İNŞA EDEN EKİBİMİZ
            </p>

            <Link href="/team" className="group flex items-center gap-3 text-orange-500  font-black tracking-[0.2em] uppercase hover:text-orange-700 transition-all mb-10">
              TÜM EKİBİ GÖR <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>

            <div className="h-[2px] w-24 bg-orange-600 opacity-50"></div>
        </div>

        {/* EKİP KARTLARI */}
        <div className="flex flex-wrap justify-center gap-10">
          {team.map((member) => (
            <div key={member.id} className="group relative w-full md:w-[320px] h-[400px] rounded-[3rem] overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-zinc-900 animate-pulse -z-10"></div>
              {/* Resim alanı */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <div className="absolute bottom-8 left-8 z-20">
                <p className="text-orange-500 font-black text-[10px] uppercase tracking-widest mb-1">{member.role}</p>
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">{member.name}</h3>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
}