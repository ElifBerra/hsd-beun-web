"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

const TeamPreview = () => {
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // Hayaletleri kovan sihirli komut: cache: 'no-store'
        const res = await fetch('/api/admin/team', { cache: 'no-store' });
        const data = await res.json();
        
        if (Array.isArray(data)) {
          // Sadece aktif olan üyeleri al ve vitrin için ilk 3 kişiyi kes (slice)
          const activeMembers = data.filter((m: any) => m.IsActive !== 0).slice(0, 3);
          setTeam(activeMembers);
        }
      } catch (error) {
        console.error("Ekip çekilirken hata oluştu:", error);
      }
    };

    fetchTeam();
  }, []);

  return (
    <section className="max-w-6xl w-full px-4 py-24 border-t border-white/5 mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent pr-4">
              EKİBİMİZLE <br /> TANIŞIN 
            </h2>
          <p className="text-zinc-400 text-lg font-medium">
            HSD BEUN çatısı altında teknolojiyi tutkuya dönüştüren, sınırları zorlayan dinamik ekibimiz.
          </p>
        </div>
        <Link href="/team" className="text-orange-500 hover:text-orange-400 text-sm font-black uppercase tracking-widest transition-colors flex items-center gap-2 group">
          TÜM EKİBİ GÖR 
          <span className="group-hover:translate-x-2 transition-transform">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.MemberID} className="relative aspect-square rounded-[2rem] overflow-hidden group bg-zinc-900 border border-white/5 hover:border-orange-500/30 transition-all">
            
            {/* Arka Plan Görseli (Veritabanından gelir) */}
            <img 
              src={member.ProfileImagePath || '/team/default-avatar.png'} 
              alt={member.FullName} 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
            />

            {/* Karartma Efekti (Yazıların net okunması için) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
            
            {/* Eğer fotoğraf yoksa o senin sevdiğin emojiyi hafifçe gösterelim */}
            {!member.ProfileImagePath && (
               <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-10 group-hover:scale-110 transition-transform">
                 👤
               </div>
            )}

            <div className="absolute bottom-0 left-0 p-8 z-10 w-full">
              <h3 className="text-2xl font-black text-white mb-1 uppercase tracking-tight truncate">{member.FullName}</h3>
              <p className="text-orange-500 font-bold text-xs uppercase tracking-widest truncate">{member.Role}</p>
            </div>
          </div>
        ))}

        {/* Veritabanı boşsa gösterilecek tatlı bir uyarı */}
        {team.length === 0 && (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center py-16 border-2 border-dashed border-white/5 rounded-[2rem]">
            <p className="text-zinc-600 font-bold italic uppercase tracking-widest">Kahramanlar aranıyor... (Henüz üye eklenmedi)</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamPreview;