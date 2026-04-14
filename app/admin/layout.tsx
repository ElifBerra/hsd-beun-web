import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white font-sans overflow-x-hidden">
      {/* Sidebar - Sol Menü */}
      <aside className="w-64 bg-zinc-900 border-r border-white/5 p-6 flex flex-col fixed h-full z-50">
        <div className="mb-10">
          <h1 className="text-2xl font-black text-orange-500 italic tracking-tighter">HSD ADMIN</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">BEUN Dashboard</p>
        </div>

        <nav className="flex-1 space-y-1 text-zinc-400">
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
            <span >🤝</span> <span className="text-sm font-medium">Sponsorlar</span>
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

      {/* Main Content Area - Sidebar genişliği kadar soldan boşluk bırakır (ml-64) */}
      <main className="flex-1 ml-64 p-8 lg:p-12 min-h-screen">
        {children}
      </main>
    </div>
  );
}