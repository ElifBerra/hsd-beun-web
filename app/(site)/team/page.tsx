"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // Yine o sihirli önbellek kırıcıyı kullanıyoruz
        const res = await fetch('/api/admin/team', { cache: 'no-store' });
        const data = await res.json();
        
        if (Array.isArray(data)) {
          // Sadece aktif olan üyeleri al
          setTeam(data.filter((m: any) => m.IsActive !== 0));
        }
      } catch (error) {
        console.error("Ekip çekilirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-40 pb-20 px-6 font-sans">
      <div className="container mx-auto max-w-6xl">
        
        {/* BAŞLIK ALANI */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase text-orange-600 mb-6">
            EKİBİMİZ
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            HSD BEUN'u büyüten, etkinlikleri organize eden ve teknoloji üreten o harika ekip.
          </p>
        </div>

        {/* EKİP LİSTESİ */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-orange-500 font-black animate-pulse text-xl uppercase tracking-widest">Ekip Yükleniyor...</p>
          </div>
        ) : team.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-[3rem]">
            <p className="text-zinc-600 font-bold italic uppercase tracking-widest">Henüz ekip üyesi eklenmedi. Admin panelinden ilk kahramanı ekle!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.MemberID} className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center text-center hover:bg-zinc-900/80 hover:border-orange-500/30 transition-all duration-300 group">
                
                {/* AVATAR */}
                <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-zinc-800 group-hover:border-orange-500 transition-colors relative bg-zinc-800 flex items-center justify-center">
                  <img 
                    src={member.ProfileImagePath || '/team/default-avatar.png'} 
                    alt={member.FullName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* BİLGİLER */}
                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {member.FullName}
                </h3>
                <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-6 h-10">
                  {member.Role}
                </p>

                {/* LINKEDIN (Eğer veritabanında LinkedInUrl doluysa link çıkar, yoksa sadece HSD BEUN yazar) */}
                {member.LinkedInUrl ? (
                  <Link href={member.LinkedInUrl} target="_blank" className="text-blue-500 hover:text-blue-400 text-sm font-bold uppercase tracking-wider mt-auto transition-colors">
                    LinkedIn Profile
                  </Link>
                ) : (
                  <span className="text-orange-500/50 text-xs font-black uppercase tracking-widest mt-auto">HSD BEUN</span>
                )}

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}