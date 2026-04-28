"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // lucide-react kütüphanesini kurmanı öneririm

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-orange-600 font-black text-2xl tracking-tighter italic">HSD BEUN</Link>

        {/* Desktop Menu: Sadece büyük ekranlarda görünür */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase">
          <Link href="/hakkimizda" className="hover:text-orange-500 transition">Hakkımızda</Link>
          <Link href="/ekip" className="hover:text-orange-500 transition">Ekibimiz</Link>
          <Link href="/iletisim" className="bg-orange-600 px-6 py-2 rounded-full text-black hover:bg-white transition">İletişim</Link>
        </div>

        {/* Mobile Toggle: Sadece mobilde görünür */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu: isOpen true olduğunda aşağı doğru açılır */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-white/10 p-6 flex flex-col space-y-6 text-center animate-in slide-in-from-top duration-300">
          <Link href="/hakkimizda" onClick={() => setIsOpen(false)}>Hakkımızda</Link>
          <Link href="/ekip" onClick={() => setIsOpen(false)}>Ekibimiz</Link>
          <Link href="/iletisim" className="bg-orange-600 py-3 rounded-xl text-black font-black uppercase">İletişim</Link>
        </div>
      )}
    </nav>
  );
}