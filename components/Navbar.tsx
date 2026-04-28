"use client";
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    // fixed ve w-full ile Navbar'ı en üste ve tam genişliğe yayıyoruz
    <nav className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-white/5">
      {/* max-w-7xl ve mx-auto ile içeriği merkeze alıyoruz ama arka plan tam genişlikte kalıyor */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-orange-600 font-black text-2xl italic tracking-tighter hover:text-white transition-colors">
          HSD BEUN
        </Link>

        {/* MENÜ LİNKLERİ - md:flex ile bilgisayarda yan yana, hidden ile mobilde gizli (Hala bozuyorsa flex-row'u garantile) */}
        <div className="hidden md:flex items-center space-x-10 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
          <Link href="/hakkimizda" className="hover:text-orange-500 transition-colors">Hakkımızda</Link>
          <Link href="/etkinlikler" className="hover:text-orange-500 transition-colors">Etkinlikler</Link>
          <Link href="/ekip" className="hover:text-orange-500 transition-colors">Ekibimiz</Link>
          <Link href="/iletisim" className="bg-orange-600 px-8 py-2.5 rounded-full text-black hover:bg-white transition-all">
            İletişim
          </Link>
        </div>

        {/* MOBİL İÇİN HAMBURGER (Opsiyonel - Eğer kodunda varsa kalsın) */}
        <div className="md:hidden text-orange-600">
          {/* Buraya mobil menü ikonun gelecek */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;