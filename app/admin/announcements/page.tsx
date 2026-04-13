"use client";
import { useEffect, useState } from 'react';

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({ Title: '', Content: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/admin/announcements', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) setAnnouncements(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAnnouncements(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // GÜNCELLEME: Senin tablon AnnID bekliyor
        const res = await fetch('/api/admin/announcements', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, AnnID: editingId })
        });
        if (res.ok) {
          setEditingId(null);
          setFormData({ Title: '', Content: '' });
          fetchAnnouncements();
        }
      } else {
        // YENİ EKLEME
        const res = await fetch('/api/admin/announcements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          setFormData({ Title: '', Content: '' });
          fetchAnnouncements();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.AnnID); // Burayı AnnID yaptık
    setFormData({ Title: item.Title, Content: item.Content });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ Title: '', Content: '' });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bu duyuruyu silmek istediğine emin misin?")) {
      // API'ye AnnID gönderiyoruz
      const res = await fetch(`/api/admin/announcements?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchAnnouncements();
      else alert("Silme işlemi başarısız oldu.");
    }
  };

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-4xl font-black italic uppercase text-orange-500">Duyuru Yönetimi</h2>
      </header>

      <div className="bg-zinc-950/50 border border-white/5 p-8 rounded-[2rem]">
        <h3 className="text-xl font-bold mb-6 text-orange-500">
          {editingId ? 'Duyuruyu Güncelle' : 'Yeni Duyuru Yayınla'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="Title" value={formData.Title} onChange={handleChange} required className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none" placeholder="Başlık" />
          <textarea name="Content" value={formData.Content} onChange={handleChange} required rows={4} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none resize-none" placeholder="İçerik" />
          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-orange-600 text-black font-black py-4 rounded-xl hover:bg-orange-500 transition-all uppercase tracking-widest">
              {editingId ? 'GÜNCELLE' : 'YAYINLA'}
            </button>
            {editingId && <button onClick={handleCancelEdit} type="button" className="flex-1 bg-zinc-800 text-white font-black py-4 rounded-xl hover:bg-zinc-700 transition-all uppercase tracking-widest">İPTAL</button>}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading && <p className="text-orange-500 font-bold italic">Yükleniyor...</p>}
        {announcements.map((item: any) => (
          <div key={item.AnnID} className="bg-zinc-900/50 border border-white/5 p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-orange-500/30 transition-all">
            <div className="flex-1">
              <h3 className="text-xl font-black uppercase mb-2">{item.Title}</h3>
              <p className="text-zinc-400 text-sm line-clamp-2">{item.Content}</p>
              {/* Tarihi StartDate'den alıyoruz */}
              <p className="text-zinc-600 text-xs font-bold mt-3">
                {item.StartDate ? new Date(item.StartDate).toLocaleDateString('tr-TR') : 'Tarih Yok'}
              </p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button onClick={() => handleEdit(item)} className="px-6 py-2 bg-blue-500/10 text-blue-500 font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-colors">DÜZENLE</button>
              <button onClick={() => handleDelete(item.AnnID)} className="px-6 py-2 bg-red-500/10 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-colors">SİL</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}