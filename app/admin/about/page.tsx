"use client";
import { useState, useEffect } from 'react';

export default function AdminAbout() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSections = async () => {
    try {
      const res = await fetch('/api/admin/about');
      const data = await res.json();
      
      // API'den ne gelirse gelsin diziye çevir
      if (Array.isArray(data)) {
        setSections(data);
      } else if (data && typeof data === 'object' && !data.error) {
        setSections([data]);
      } else {
        setSections([]);
      }
    } catch (err) {
      console.error("Yükleme hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleUpdate = async (section: any) => {
    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(section),
      });
      if (res.ok) alert("Başarıyla güncellendi! ✨");
      else alert("Güncelleme başarısız.");
    } catch (err) {
      alert("Bağlantı hatası!");
    }
  };

  if (loading) return <div className="p-8 text-orange-600 font-black italic">Yükleniyor...</div>;

  return (
    <div className="p-8 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-black italic mb-8 text-orange-600 uppercase tracking-tighter">
        İçerik Editörü 📝
      </h1>
      
      <div className="grid gap-6">
        {sections.length > 0 ? sections.map((section: any, index: number) => (
          <div key={index} className="bg-zinc-900/80 p-6 rounded-[2rem] border border-white/5 shadow-xl transition-all">
            
            <div className="flex justify-between items-center mb-4 px-2">
              <span className="bg-orange-600 text-black text-[9px] font-black px-3 py-0.5 rounded-full uppercase">
                {section?.SectionKey || 'Bölüm'}
              </span>
              <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
                {section?.LastUpdated ? new Date(section.LastUpdated).toLocaleDateString('tr-TR') : 'YENİ'}
              </span>
            </div>

            <div className="space-y-3">
              <input 
                type="text" 
                className="w-full bg-black/50 border border-white/5 p-3 rounded-xl text-sm font-bold text-white outline-none focus:border-orange-600"
                value={section?.Title || ''} 
                onChange={(e) => {
                  const newSecs = [...sections];
                  newSecs[index].Title = e.target.value;
                  setSections(newSecs);
                }}
              />

              <textarea 
                className="w-full bg-black/50 border border-white/5 p-3 rounded-xl h-48 text-xs text-zinc-400 leading-relaxed outline-none focus:border-orange-600 resize-none"
                value={section?.BodyText || ''} 
                onChange={(e) => {
                  const newSecs = [...sections];
                  newSecs[index].BodyText = e.target.value;
                  setSections(newSecs);
                }}
              />
            </div>

            <button 
              onClick={() => handleUpdate(section)}
              className="w-full mt-4 bg-zinc-800 hover:bg-orange-600 text-zinc-400 hover:text-black text-[10px] font-black py-3 rounded-xl transition-all"
            >
              DEĞİŞİKLİKLERİ UYGULA
            </button>
          </div>
        )) : (
          <div className="text-zinc-500 italic">Düzenlenecek veri bulunamadı.</div>
        )}
      </div>
    </div>
  );
}