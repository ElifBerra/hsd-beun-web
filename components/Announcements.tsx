"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Props yapısını tanımlıyoruz
type AnnouncementsProps = {
  limit?: number;
  showAllButton?: boolean;
};

export default function Announcements({ limit, showAllButton = true }: AnnouncementsProps) {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch('/api/admin/announcements', { cache: 'no-store' });
        const data = await res.json();
        if (Array.isArray(data)) {
          // Eğer limit varsa o kadarını, yoksa hepsini al
          setAnnouncements(limit ? data.slice(0, limit) : data);
        }
      } catch (error) {
        console.error("Duyurular çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, [limit]);

  const formatDate = (ann: any) => {
    const dateValue = ann.CreatedAt || ann.CreatedDate || ann.EventDate;
    if (!dateValue) return "GÜNCEL";
    const date = new Date(dateValue);
    return isNaN(date.getTime()) ? "GÜNCEL" : date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <section id="announcements" className={`py-24 bg-black relative overflow-hidden ${showAllButton ? 'border-t border-white/5' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Başlık Grubu: showAllButton true ise (Ana Sayfa) görünür */}
        {showAllButton && (
          <div className="flex flex-col items-center justify-center text-center mb-20">
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent pr-4">
              DUYURULAR
            </h2>
            <Link href="/announcements" className="group flex items-center gap-3 text-orange-500 font-black text-sm tracking-[0.2em] uppercase mb-10">
              TÜM ARŞİVİ GÖR <span className="w-8 h-8 rounded-full border border-orange-500/20 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-black transition-all">→</span>
            </Link>
            <div className="h-[2px] w-24 bg-orange-600 opacity-50"></div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {loading ? (
             [1, 2, 3].map((i) => (
              <div key={i} className="w-full md:w-[400px] h-72 bg-zinc-950/30 animate-pulse rounded-[3rem] border border-white/5"></div>
            ))
          ) : (
            announcements.map((ann) => (
              <div key={ann.AnnouncementID} className="bg-zinc-950/40 border border-white/5 p-10 rounded-[3rem] hover:border-orange-500/30 transition-all duration-500 group w-full md:w-[420px] min-h-[350px] flex flex-col relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></div>
                  <span className="text-zinc-500 font-black text-[10px] tracking-widest uppercase">{formatDate(ann)}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter mb-4 group-hover:text-orange-500 transition-colors">{ann.Title}</h3>
                <p className="text-zinc-500 text-sm italic leading-relaxed mb-8 line-clamp-3 flex-1">{ann.Content}</p>
                <div className="pt-6 border-t border-white/5">
                  <Link href={`/announcements/${ann.AnnouncementID}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-hover:text-white transition-all flex items-center justify-between">
                    DETAYLARI İNCELE <span className="text-xl transform group-hover:translate-x-2 transition-transform">→</span>
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