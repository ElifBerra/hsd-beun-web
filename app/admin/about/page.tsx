"use client";
import { useState, useEffect } from 'react';

// Tip tanımlaması (TypeScript hatalarını önlemek için)
interface Section {
  SectionKey: string;
  Title: string;
  BodyText: string;
  LastUpdated?: string;
}

export default function AdminAbout() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSection, setNewSection] = useState<Section>({ SectionKey: '', Title: '', BodyText: '' });

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await fetch('/api/admin/about');
      const data = await res.json();
      setSections(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Veri çekme hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newSection.SectionKey || !newSection.Title) {
      alert("Lütfen Key ve Başlık alanlarını doldurun!");
      return;
    }
    try {
      const res = await fetch('/api/admin/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSection),
      });
      if (res.ok) {
        alert("Yeni bölüm eklendi! ✨");
        setNewSection({ SectionKey: '', Title: '', BodyText: '' });
        fetchSections();
      }
    } catch (err) {
      alert("Ekleme hatası!");
    }
  };

  const handleDelete = async (key: string) => {
    if (!confirm("Bu bölümü silmek istediğine emin misin?")) return;
    try {
      const res = await fetch(`/api/admin/about?sectionKey=${key}`, { method: 'DELETE' });
      if (res.ok) fetchSections();
    } catch (err) {
      alert("Silme hatası!");
    }
  };

  const handleUpdate = async (section: Section) => {
    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(section),
      });
      if (res.ok) alert("Güncellendi! ✅");
    } catch (err) {
      alert("Güncelleme hatası!");
    }
  };

  if (loading) return <div className="p-8 text-orange-600 font-black italic">Yükleniyor...</div>;

  return (
    <div className="p-8 text-white max-w-4xl mx-auto space-y-12">
      <h1 className="text-3xl font-black italic text-orange-600 uppercase tracking-tighter">İçerik Editörü 📝</h1>

      {/* YENİ EKLEME FORMU */}
      <div className="bg-zinc-900/50 p-6 rounded-[2rem] border border-orange-600/30">
        <h2 className="text-sm font-black mb-4 text-orange-500 uppercase">Yeni Bölüm Ekle ➕</h2>
        <div className="grid gap-3">
          <input 
            placeholder="Bölüm Anahtarı (örn: mission)" 
            className="bg-black p-3 rounded-xl border border-white/10 text-sm outline-none focus:border-orange-500"
            value={newSection.SectionKey}
            onChange={e => setNewSection({...newSection, SectionKey: e.target.value})}
          />
          <input 
            placeholder="Başlık" 
            className="bg-black p-3 rounded-xl border border-white/10 text-sm outline-none focus:border-orange-500"
            value={newSection.Title}
            onChange={e => setNewSection({...newSection, Title: e.target.value})}
          />
          <textarea 
            placeholder="İçerik" 
            className="bg-black p-3 rounded-xl border border-white/10 h-24 text-sm outline-none focus:border-orange-500 resize-none"
            value={newSection.BodyText}
            onChange={e => setNewSection({...newSection, BodyText: e.target.value})}
          />
          <button onClick={handleCreate} className="bg-orange-600 text-black font-black py-3 rounded-xl hover:bg-white transition-all text-xs">BÖLÜMÜ KAYDET</button>
        </div>
      </div>

      {/* LİSTELEME VE GÜNCELLEME */}
      <div className="grid gap-6">
        {sections.map((section, index) => (
          <div key={section.SectionKey || index} className="bg-zinc-900 p-6 rounded-[2rem] border border-white/5 relative">
            <button 
              onClick={() => handleDelete(section.SectionKey)}
              className="absolute top-6 right-6 text-[10px] text-zinc-600 hover:text-red-500 font-black uppercase transition-all"
            >
              SİL 🗑️
            </button>
            <span className="text-[10px] bg-orange-600/20 px-3 py-1 rounded-full text-orange-500 font-bold uppercase tracking-tighter">
              {section.SectionKey}
            </span>
            
            <div className="mt-4 space-y-3">
              <input 
                className="w-full bg-black/50 p-3 rounded-xl border border-white/5 focus:border-orange-500 outline-none font-bold text-sm"
                value={section.Title} 
                onChange={e => {
                  const updated = [...sections];
                  updated[index].Title = e.target.value;
                  setSections(updated);
                }}
              />
              <textarea 
                className="w-full bg-black/50 p-3 rounded-xl border border-white/5 h-40 focus:border-orange-500 outline-none text-xs text-zinc-400 leading-relaxed"
                value={section.BodyText}
                onChange={e => {
                  const updated = [...sections];
                  updated[index].BodyText = e.target.value;
                  setSections(updated);
                }}
              />
              <button 
                onClick={() => handleUpdate(section)} 
                className="w-full bg-zinc-800 py-3 rounded-xl font-black text-[10px] hover:bg-orange-600 hover:text-black transition-all border border-white/5"
              >
                DEĞİŞİKLİKLERİ KAYDET
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}