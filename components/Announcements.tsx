"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Sayfa yolunu kontrol etmek için ekledik

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // Mevcut sayfayı alıyoruz

  // Eğer /announcements sayfasındaysak "isArchivePage" true olacak
  const isArchivePage = pathname === '/announcements';

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch('/api/admin/announcements', { cache: 'no-store' });
        const data = await res.json();
        if (Array.isArray(data)) {
          // Arşiv sayfasındaysak hepsini, ana sayfadaysak sadece ilk 3'ü göster
          setAnnouncements(isArchivePage ? data : data.slice(0, 3));
        }
      } catch (error) {
        console.error("Duyurular yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, [isArchivePage]);

  const formatDate = (ann: any) => {
    const dateValue = ann.CreatedAt || ann.CreatedDate || ann.EventDate;
    const date = new Date(dateValue);
    if (!dateValue || isNaN(date.getTime())) return "GÜNCEL";
    return date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <section id="announcements" className={`py-24 bg-black relative overflow-hidden ${!isArchivePage ? 'border-t border-white/5' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* BAŞLIK GRUBU: SADECE ANA SAYFADAYSA GÖSTERİLİR */}
        {!isArchivePage && (
          <div className="flex flex-col items-center justify-center text-center mb-20">
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-4 bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent pr-4">
             DUYURULAR
            </h2>
            
            <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-8">
              HSD BEUN DÜNYASINDAN EN SICAK GELİŞMELER
            </p>

            <Link href="/announcements" className="group flex items-center gap-3 text-orange-500  font-black tracking-[0.2em] uppercase hover:text-orange-700 transition-all mb-10">
              TÜM ARŞİVİ GÖR <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>

            <div className="h-[2px] w-24 bg-orange-600 opacity-50"></div>
          </div>
        )}

        {/* KARTLAR LİSTESİ */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {loading ? (
             [1, 2, 3].map((i) => (
              <div key={i} className="w-full md:w-[400px] h-72 bg-zinc-950/30 animate-pulse rounded-[3rem] border border-white/5"></div>
            ))
          ) : (
            announcements.map((ann) => (
              <div 
                key={ann.AnnouncementID} 
                className="bg-zinc-950/40 border border-white/5 p-10 rounded-[3rem] hover:border-orange-500/30 transition-all duration-500 group w-full md:w-[420px] relative overflow-hidden flex flex-col min-h-[350px]"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse shadow-[0_0_10px_rgba(234,88,12,0.8)]"></div>
                  <span className="text-zinc-500 font-black text-[10px] tracking-[0.2em] uppercase">
                    {formatDate(ann)}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                  {ann.Title}
                </h3>
                
                <p className="text-zinc-500 text-sm italic leading-relaxed mb-8 line-clamp-3 flex-1">
                  {ann.Content}
                </p>
                
                <div className="pt-6 border-t border-white/5">
                  <Link href={`/announcements/${ann.AnnouncementID}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-hover:text-white transition-colors flex items-center justify-between">
                    DETAYLARI İNCELE <span className="text-xl">→</span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}