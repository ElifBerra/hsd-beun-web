"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Events() {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        const today = new Date();
        const filtered = data
          .filter((event: any) => new Date(event.EventDate) >= today)
          .slice(0, 3);
        setUpcoming(filtered);
      });
  }, []);

  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase">
              YAKLAŞAN <br /> <span className="text-orange-600">ETKİNLİKLER</span>
            </h2>
          </div>
          <Link href="/events" className="group flex items-center gap-3 text-sm font-black tracking-[0.2em] uppercase hover:text-orange-500 transition-all">
            TÜMÜNÜ GÖR 
            <span className="bg-orange-600 p-2 rounded-full text-black group-hover:scale-110 transition-transform">→</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcoming.map((event: any) => (
            <div key={event.EventID} className="bg-zinc-950 border border-white/5 p-4 rounded-[2.5rem] hover:border-orange-500/30 transition-all group">
              <div className="relative overflow-hidden rounded-[1.8rem] mb-6 aspect-video">
                <img src={event.CoverImagePath} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
                   <span className="text-[10px] font-black tracking-widest text-orange-500 uppercase">
                     {new Date(event.EventDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })}
                   </span>
                </div>
              </div>
              <div className="px-2 pb-4">
                <h3 className="text-2xl font-black tracking-tight uppercase leading-tight group-hover:text-orange-500 transition-colors">
                  {event.Title}
                </h3>
                <p className="text-zinc-500 text-sm mt-4 font-medium line-clamp-2 leading-relaxed italic">
                  {event.Description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {upcoming.length === 0 && (
          <p className="text-zinc-700 font-black italic uppercase tracking-widest text-center py-20">Henüz yeni etkinlik planlanmadı.</p>
        )}
      </div>
    </section>
  );
}