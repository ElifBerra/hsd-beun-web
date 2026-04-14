"use client";
import React from 'react';
import Link from 'next/link';

export default function Publications() {
  const posts = [
    { id: 1, category: 'SOFTWARE DESIGN', title: 'Yazılım Tasarım Desenleri: Singleton ve Loose Coupling', desc: 'Unity projelerinde neden Singleton’dan kaçmalıyız? Loose Coupling mimarisi üzerine bir inceleme.', date: '12 Mart 2026' },
    { id: 2, category: 'AI & NEURAL NETWORKS', title: 'Neural Networks 101: Sinir Ağlarına Giriş', desc: 'Yapay zekanın kalbi olan sinir ağları nasıl çalışır? Temel matematiksel modelleme.', date: '05 Nisan 2026' },
    { id: 3, category: 'GAME DEV', title: 'ScriptableObjects ile Event-Driven Architecture', desc: 'Unity’de modüler kod yazmanın en temiz yolu: ScriptableObjects ve Event sistemleri.', date: '20 Şubat 2026' }
  ];

  return (
    <section id="publications" className="py-24 md:py-32 bg-black overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* BAŞLIK BÖLÜMÜ - TAM ORTALI */}
        <div className="flex flex-col items-center justify-center text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-4 bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent pr-4">
            YAYINLARIMIZ
          </h2>

          <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px]">
            TEKNOLOJİK BİRİKİMİMİZİ PAYLAŞIYORUZ
          </p>

            <br/>
            <Link href="https://medium.com/@hsdzbeun" target="_blank" className="group flex items-center gap-3 text-orange-500  font-black tracking-[0.2em] uppercase hover:text-orange-700 transition-all mb-10">
                TÜM YAYINLARI GÖR 
                <span className="group-hover:translate-x-2 transition-transformgroup-hover:translate-x-2 transition-transform">→</span>
            </Link>
        
            <div className="h-[2px] w-24 bg-orange-600 opacity-50"></div>
    </div>

        

        {/* YAYIN KARTLARI */}
        <div className="flex flex-wrap justify-center gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-black/50 border border-white/5 p-10 rounded-[3rem] hover:border-orange-500/30 transition-all group w-full md:w-[calc(33.333%-2rem)] max-w-[400px]">
              <span className="text-orange-500 font-black text-[9px] tracking-[0.2em] uppercase mb-4 block">{post.category}</span>
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4 group-hover:text-orange-500 transition-colors leading-tight">{post.title}</h3>
              <p className="text-zinc-500 text-sm italic leading-relaxed mb-8 line-clamp-3">{post.desc}</p>
              <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-zinc-600 text-[10px] font-bold">{post.date}</span>
                <span className="text-white font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">OKU →</span>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}