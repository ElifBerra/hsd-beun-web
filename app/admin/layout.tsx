import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // h-screen ve overflow-hidden ile dış taşmaları engelliyoruz
    <div className="flex h-screen w-full bg-zinc-950 text-white font-sans overflow-hidden">
      
      {/* SIDEBAR: fixed yerine flex yapısı içinde sabit genişlik (w-64) kullanıyoruz */}
      <aside className="w-64 bg-zinc-900 border-r border-white/5 p-6 flex flex-col flex-shrink-0 h-full">
        <div className="mb-10">
          <h1 className="text-2xl font-black text-orange-500 italic tracking-tighter">HSD ADMIN</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">BEUN Dashboard</p>
        </div>

        <nav className="flex-1 space-y-1 text-zinc-400 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-500/10 hover:text-orange-500 transition-all">
            <span>🏠</span> <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/about" className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-500/10 hover:text-orange-500 transition-all">
            <span>🧡</span> <span className="text-sm font-medium">Hakkımızda</span>
          </Link>
          <Link href="/admin/events" className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-500/10 hover:text-orange-500 transition-all">
            <span>🎡</span> <span className="text-sm font-medium">Etkinlikler</span>
          </Link>
          <Link href="/admin/team" className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-500/10 hover:text-orange-500 transition-all">
            <span>👥</span> <span className="text-sm font-medium">Ekip</span>
          </Link>
          <Link href="/admin/sponsors" className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-500/10 hover:text-orange-500 transition-all">
            <span>🤝</span> <span className="text-sm font-medium">Sponsorlar</span>
          </Link>
          <Link href="/admin/announcements" className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-500/10 hover:text-orange-500 transition-all">
            <span>📢</span> <span className="text-sm font-medium">Duyurular</span>
          </Link>
          <Link href="/admin/publications" className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-500/10 hover:text-orange-500 transition-all">
            <span>📝</span> <span className="text-sm font-medium">Yayınlar</span>
          </Link>
          <Link href="/admin/gallery" className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-500/10 hover:text-orange-500 transition-all">
            <span>📷</span> <span className="text-sm font-medium">Anılar</span>
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-500/10 hover:text-orange-500 transition-all">
            <span>✉️</span> <span className="text-sm font-medium">Mesajlar</span>
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/5 mt-auto">
          <Link href="/" className="text-xs text-zinc-500 hover:text-white transition-colors">
            ← Siteye Dön
          </Link>
        </div>
      </aside>

      {/* ANA İÇERİK ALANI: ml-64'e gerek kalmadı çünkü flex yapısı Sidebar'ı tanıyor */}
      <main className="flex-1 h-full overflow-y-auto p-8 lg:p-12">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
      </main>
    </div>
  );
}