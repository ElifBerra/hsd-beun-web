"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TeamPreview() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('/api/admin/team', { cache: 'no-store' });
        const data = await res.json();
        if (Array.isArray(data)) {
          // Sadece showcase olanları al ve RoleType'a göre sırala
          const showcase = data
            .filter((m: any) => m.IsShowcase === true || m.IsShowcase === 1)
            .sort((a, b) => a.RoleType - b.RoleType);
          setTeam(showcase);
        }
      } catch (error) {
        console.error("Ekip verisi yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  // Hiyerarşik Gruplar
  const ambassador = team.find(m => m.RoleType === 1);
  const assistants = team.filter(m => m.RoleType === 2);
  const others = team.filter(m => m.RoleType > 2);

  // Ortak Kart Tasarımı (Senin yapın üzerine kurulu)
  const MemberCard = ({ member, size = "normal" }: { member: any, size?: "large" | "normal" }) => (
    <div className={`group relative rounded-[3rem] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl transition-all duration-500 hover:border-orange-600/40 
      ${size === 'large' ? 'w-full md:w-[350px] h-[450px]' : 'w-full md:w-[300px] h-[380px]'}`}>
      
      {/* Resim alanı */}
      <img 
        src={member.PhotoData || '/team/default-avatar.png'} 
        alt={member.FullName}
        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
      
      <div className="absolute bottom-8 left-8 z-20">
        <p className="text-orange-500 font-black text-[10px] uppercase tracking-[0.2em] mb-1">
          {member.Role}
        </p>
        <h3 className={`${size === 'large' ? 'text-3xl' : 'text-xl'} font-black text-white italic uppercase tracking-tighter`}>
          {member.FullName}
        </h3>
        
        {/* Sosyal Linkler (Hover'da beliren küçük tatlı detay) */}
        <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           {member.LinkedInUrl && <Link href={member.LinkedInUrl} target="_blank" className="text-[9px] text-zinc-400 hover:text-white font-bold">LINKEDIN</Link>}
           {member.GitHubUrl && <Link href={member.GitHubUrl} target="_blank" className="text-[9px] text-zinc-400 hover:text-white font-bold">GITHUB</Link>}
        </div>
      </div>
    </div>
  );

  if (loading && team.length === 0) return null;

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

            <Link href="/team" className="group flex items-center gap-3 text-orange-500 font-black tracking-[0.2em] uppercase hover:text-orange-700 transition-all mb-10">
              TÜM EKİBİ GÖR <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>

            <div className="h-[2px] w-24 bg-orange-600 opacity-50"></div>
        </div>

        {/* HİYERARŞİK EKİP DİZİLİMİ */}
        <div className="space-y-16">
          
          {/* 1. SEVİYE: AMBASSADOR (SEN) */}
          {ambassador && (
            <div className="flex justify-center">
              <MemberCard member={ambassador} size="large" />
            </div>
          )}

          {/* 2. SEVİYE: YARDIMCILAR */}
          {assistants.length > 0 && (
            <div className="flex flex-wrap justify-center gap-8">
              {assistants.map(m => <MemberCard key={m.MemberID} member={m} />)}
            </div>
          )}

          {/* 3. SEVİYE: DİĞER CORE TEAM (Komite Liderleri vb.) */}
          {others.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 opacity-90 scale-95">
              {others.map(m => <MemberCard key={m.MemberID} member={m} />)}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}