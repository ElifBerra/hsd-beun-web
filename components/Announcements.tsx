"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';


interface AnnouncementsProps {
  limit?: number;
  showAllButton?: boolean;
}


const Announcements = ({ limit, showAllButton = true }: AnnouncementsProps) => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch('/api/admin/announcements', { cache: 'no-store' });
        const data = await res.json();
        if (Array.isArray(data)) {
          let filtered = data.filter((a: any) => a.IsActive !== 0);
          // EĞER LİMİT VARSA ONU UYGULA
          if (limit) {
            filtered = filtered.slice(0, limit);
          }
          setAnnouncements(filtered);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, [limit]);

  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent pr-4">
              SON <br /> DUYURULAR 
            </h2>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs mt-6">
              HSD BEUN dünyasından en sıcak gelişmeler
            </p>
          </div>
          <Link href="/announcements" className="group text-orange-500 font-black uppercase tracking-widest text-sm flex items-center gap-2">
            TÜM ARŞİVİ GÖR <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            // Yüklenme Durumu
            [1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-zinc-900/50 animate-pulse rounded-[2.5rem] border border-white/5"></div>
            ))
          ) : announcements.length > 0 ? (
            announcements.map((item) => (
              <div key={item.AnnID} className="bg-zinc-900/20 border border-white/5 p-10 rounded-[2.5rem] hover:border-orange-500/30 transition-all group flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.5)]"></div>
                  <span className="text-zinc-600 text-xs font-black uppercase tracking-widest italic">
                    {item.StartDate ? new Date(item.StartDate).toLocaleDateString('tr-TR') : 'YENİ'}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                  {item.Title}
                </h3>
                
                <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                  {item.Content}
                </p>
                
                <Link href={`/announcements`} className="mt-auto inline-flex text-white font-black text-xs uppercase tracking-[0.2em] border-b-2 border-orange-600 pb-1 w-fit hover:border-white transition-colors">
                  DETAYLARI GÖR
                </Link>
              </div>
            ))
          ) : (
            // Duyuru Yoksa
            <div className="col-span-1 md:col-span-3 py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
              <p className="text-zinc-600 font-bold uppercase tracking-widest italic">Yakında yeni duyurular eklenecek...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Announcements;