"use client";
import { useState, useEffect } from 'react';

export default function AdminAbout() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchSections(); }, []);

  const fetchSections = async () => {
    try {
      const res = await fetch('/api/admin/about');
      const data = await res.json();
      setSections(Array.isArray(data) ? data : []);
    } finally { setLoading(false); }
  };

  const handleUpdate = async (section: any) => {
    const res = await fetch('/api/admin/about', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(section),
    });
    if (res.ok) alert(`${section.SectionKey} Güncellendi! ✨`);
  };

  if (loading) return <div className="p-8 text-orange-600 font-black italic">Yükleniyor...</div>;

  return (
    <div className="p-8 text-white max-w-4xl mx-auto"> {/* Sayfayı ortalayıp daralttık */}
      <h1 className="text-3xl font-black italic mb-8 text-orange-600 uppercase tracking-tighter">
        İçerik Editörü 📝
      </h1>
      
      <div className="grid gap-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-zinc-900/80 p-6 rounded-[2rem] border border-white/5 shadow-xl hover:border-orange-500/20 transition-all">
            
            {/* Üst Bilgi Satırı */}
            <div className="flex justify-between items-center mb-4 px-2">
              <span className="bg-orange-600 text-black text-[9px] font-black px-3 py-0.5 rounded-full uppercase">
                {section.SectionKey}
              </span>
              <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
                {new Date(section.LastUpdated).toLocaleDateString('tr-TR')}
              </span>
            </div>

            {/* Giriş Alanları */}
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Bölüm Başlığı"
                className="w-full bg-black/50 border border-white/5 p-3 rounded-xl text-sm font-bold text-white focus:border-orange-600 outline-none transition-all"
                value={section.Title} 
                onChange={(e) => {
                  const newSecs = [...sections];
                  newSecs[index].Title = e.target.value;
                  setSections(newSecs);
                }}
              />

              <textarea 
                placeholder="İçerik metni..."
                className="w-full bg-black/50 border border-white/5 p-3 rounded-xl h-28 text-xs text-zinc-400 leading-relaxed focus:border-orange-600 outline-none transition-all resize-none"
                value={section.BodyText} 
                onChange={(e) => {
                  const newSecs = [...sections];
                  newSecs[index].BodyText = e.target.value;
                  setSections(newSecs);
                }}
              />
            </div>

            {/* Güncelle Butonu - Daha zarif */}
            <button 
              onClick={() => handleUpdate(section)}
              className="w-full mt-4 bg-zinc-800 hover:bg-orange-600 text-zinc-400 hover:text-black text-[10px] font-black py-3 rounded-xl uppercase transition-all border border-white/5"
            >
              DEĞİŞİKLİKLERİ UYGULA
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}