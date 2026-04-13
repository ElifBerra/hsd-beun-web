"use client";
import { useEffect, useState } from 'react';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/sponsors', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => { 
        if(Array.isArray(data)) setSponsors(data.filter((s: any) => s.IsActive !== 0)); 
        setLoading(false);
      });
  }, []);

  if (!loading && sponsors.length === 0) return null;

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Arka Plan Dekoratif Işıklar */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/5 blur-[120px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* GERİ GELEN BAŞLIK BÖLÜMÜ */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent pr-4">
             SPONSORLARIMIZ 
            </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-xs">
            GÜCÜMÜZE GÜÇ KATAN DESTEKÇİLERİMİZ
          </p>
          <div className="h-[2px] w-32 bg-orange-600 mx-auto mt-8"></div>
        </div>

        {/* SPONSOR KARTLARI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {loading ? (
             [1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-zinc-900/30 animate-pulse rounded-[3rem] border border-white/5"></div>
            ))
          ) : (
            sponsors.map((s) => (
              <a 
                key={s.SponsorID} 
                href={s.WebsiteUrl || '#'} 
                target="_blank" 
                className="group bg-zinc-950/50 border border-white/5 p-12 rounded-[3rem] flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-zinc-900/40 relative overflow-hidden"
                style={{ '--brand-color': s.BrandColor } as any}
              >
                {/* Kart içi neon parlama */}
                <div 
                  className="absolute -bottom-10 -right-10 w-32 h-32 blur-3xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                  style={{ backgroundColor: s.BrandColor }}
                ></div>

                {/* Logo */}
                <div className="relative mb-10 h-20 w-full flex items-center justify-center">
                  <img 
                    src={s.LogoPath} 
                    className="max-h-full w-auto object-contain transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_var(--brand-color)]" 
                    alt={s.SponsorName}
                  />
                </div>

                {/* Bilgiler */}
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span 
                    className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-60 group-hover:opacity-100"
                    style={{ color: s.BrandColor }}
                  >
                    {s.SponsorshipType}
                  </span>
                  <h3 className="text-white text-2xl font-black italic uppercase tracking-tighter">
                    {s.SponsorName}
                  </h3>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;