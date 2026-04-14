"use client";
import { useState, useEffect } from 'react';

export default function AdminPublications() {
  const [pubs, setPubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null); // Düzenlenen yayının ID'si

  const [form, setForm] = useState({ 
    Title: '', Summary: '', ContentUrl: '', CoverImage: '', Category: '', IsFeatured: false 
  });

  useEffect(() => { fetchPubs(); }, []);

  const fetchPubs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/publications', { cache: 'no-store' });
      const data = await res.json();
      setPubs(Array.isArray(data) ? data : []);
    } catch (error) { setPubs([]); } 
    finally { setLoading(false); }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, CoverImage: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const payload = editingId ? { ...form, PubKey: editingId } : form;

    const res = await fetch('/api/admin/publications', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setForm({ Title: '', Summary: '', ContentUrl: '', CoverImage: '', Category: '', IsFeatured: false });
      setEditingId(null);
      fetchPubs();
      alert(editingId ? "Yayın güncellendi! ✨" : "Yayın eklendi! 🚀");
    } else {
      const err = await res.json();
      alert("Hata: " + err.error);
    }
  };

  const handleEdit = (p: any) => {
    setEditingId(p.PubKey);
    setForm({
      Title: p.Title || '',
      Summary: p.Summary || '',
      ContentUrl: p.ContentUrl || '',
      CoverImage: p.CoverImage || '',
      Category: p.Category || '',
      IsFeatured: p.IsFeatured === true || p.IsFeatured === 1
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Formu doldurunca yukarı kaydır
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Silmek istiyor musun?")) return;
    await fetch(`/api/admin/publications?id=${id}`, { method: 'DELETE' });
    fetchPubs();
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-black italic mb-10 text-orange-600 uppercase tracking-tighter">
        {editingId ? "Yayını Düzenle 📝" : "Yayınları Yönet 🚀"}
      </h1>
      
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-[2.5rem] border border-white/5 mb-12 space-y-4 shadow-2xl">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Başlık" className="bg-black border border-white/10 p-4 rounded-2xl" value={form.Title} onChange={e => setForm({...form, Title: e.target.value})} required />
          <input type="text" placeholder="Kategori" className="bg-black border border-white/10 p-4 rounded-2xl" value={form.Category} onChange={e => setForm({...form, Category: e.target.value})} />
        </div>
        <textarea placeholder="Özet" className="w-full bg-black border border-white/10 p-4 rounded-2xl h-24" value={form.Summary} onChange={e => setForm({...form, Summary: e.target.value})} />
        <input type="text" placeholder="Link (ContentUrl)" className="w-full bg-black border border-white/10 p-4 rounded-2xl" value={form.ContentUrl} onChange={e => setForm({...form, ContentUrl: e.target.value})} />
        
        <div className="bg-black border border-white/10 p-6 rounded-2xl">
          <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest italic">Kapak Görseli</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs file:bg-orange-600 file:border-0 file:px-4 file:py-2 file:rounded-full file:font-black cursor-pointer" />
          {form.CoverImage && <img src={form.CoverImage} className="w-24 h-24 mt-4 rounded-xl object-cover border border-white/10" />}
        </div>

        <div className="flex items-center gap-3 px-4">
          <input type="checkbox" id="featured" className="w-5 h-5 accent-orange-600" checked={form.IsFeatured} onChange={e => setForm({...form, IsFeatured: e.target.checked})} />
          <label htmlFor="featured" className="text-zinc-400 font-bold text-sm uppercase italic">Öne Çıkan Yayın</label>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ Title: '', Summary: '', ContentUrl: '', CoverImage: '', Category: '', IsFeatured: false }); }} className="ml-auto text-zinc-500 underline text-xs">Vazgeç</button>
          )}
        </div>

        <button type="submit" className="w-full bg-orange-600 text-black font-black py-5 rounded-full uppercase hover:bg-orange-500 transition-all shadow-lg shadow-orange-600/20">
          {editingId ? "DEĞİŞİKLİKLERİ KAYDET" : "YAYINI SİSTEME EKLE"}
        </button>
      </form>

      <div className="grid gap-4">
        {loading ? <p className="text-zinc-600 italic">Yükleniyor...</p> : (
          pubs.map((p) => (
            <div key={p.PubKey} className="bg-zinc-950/40 border border-white/5 p-6 rounded-[2rem] flex justify-between items-center group">
              <div className="flex items-center gap-4">
                {p.CoverImage && <img src={p.CoverImage} className="w-12 h-12 rounded-lg object-cover border border-white/5" />}
                <div>
                  <span className="text-orange-500 text-[9px] font-black uppercase tracking-widest">{p.Category}</span>
                  <h3 className="text-lg font-bold text-white italic">{p.Title}</h3>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="p-3 bg-zinc-900 hover:bg-orange-600 rounded-xl transition-all">📝</button>
                <button onClick={() => handleDelete(p.PubKey)} className="p-3 bg-zinc-900 hover:bg-red-600 rounded-xl transition-all">🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}