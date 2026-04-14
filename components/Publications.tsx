"use client";
import React, { useState, useEffect } from 'react'; // useState ve useEffect eklendi
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PublicationsProps {
  limit?: number;
  showReadMore?: boolean;
}

export default function Publications({ limit, showReadMore = true }: PublicationsProps) {
  const pathname = usePathname();
  const isArchivePage = pathname === '/publications';

  // --- DINAMIK VERI YÖNETIMI ---
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/admin/publications', { cache: 'no-store' });
        const data = await res.json();
        
        if (Array.isArray(data)) {
          // Eğer limit varsa (örn: anasayfada 3 tane), veriyi kesiyoruz
          const finalData = limit ? data.slice(0, limit) : data;
          setPosts(finalData);
        }
      } catch (error) {
        console.error("Yayınlar çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);
  // -----------------------------

  if (loading && !posts.length) return null; // Yüklenirken tasarımı bozmamak için boş dönüyoruz

  return (
    <section id="publications" className="py-24 md:py-32 bg-black overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* BAŞLIK BÖLÜMÜ - Orijinal haliyle korundu */}
        {!isArchivePage && showReadMore && (
          <div className="flex flex-col items-center justify-center text-center mb-20">
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-4 bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent pr-4">
              YAYINLARIMIZ
            </h2>

            <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px]">
              TEKNOLOJİK BİRİKİMİMİZİ PAYLAŞIYORUZ
            </p>

            <br/>
            <Link href="/publications" className="group flex items-center gap-3 text-orange-500 font-black tracking-[0.2em] uppercase hover:text-orange-700 transition-all mb-10">
                TÜM YAYINLARI GÖR 
                <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          
            <div className="h-[2px] w-24 bg-orange-600 opacity-50"></div>
          </div>
        )}

        {/* YAYIN KARTLARI - Senin orijinal CSS sınıfların ve yapın */}
        <div className="flex flex-wrap justify-center gap-8">
          {posts.map((post) => (
            // post.PubKey: Senin SQL kolon ismin, post.ContentUrl: Senin Medium linkin
            <Link 
              key={post.PubKey} 
              href={post.ContentUrl || "#"} 
              target="_blank" 
              className="bg-black/50 border border-white/5 p-10 rounded-[3rem] hover:border-orange-500/30 transition-all group w-full md:w-[calc(33.333%-2rem)] max-w-[400px] text-left"
            >
              <span className="text-orange-500 font-black text-[9px] tracking-[0.2em] uppercase mb-4 block">
                {post.Category}
              </span>
              
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                {post.Title}
              </h3>
              
              <p className="text-zinc-500 text-sm italic leading-relaxed mb-8 line-clamp-3">
                {post.Summary}
              </p>
              
              <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                {/* PublishDate'i okunabilir hale getiriyoruz */}
                <span className="text-zinc-600 text-[10px] font-bold">
                  {post.PublishDate ? new Date(post.PublishDate).toLocaleDateString('tr-TR') : ""}
                </span>
                <span className="text-white font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">OKU →</span>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && !loading && (
          <div className="text-center text-zinc-800 font-black uppercase tracking-widest pt-20">
            Henüz paylaşılmış bir yayın bulunamadı.
          </div>
        )}
      </div>
    </section>
  );
}