"use client";
import { useEffect, useState } from 'react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    EventDate: '',
    Location: '',
    CoverImagePath: '/gallery/default.jpg',
    CategoryID: 1,
    OrganizerID: 1
  });

  const fetchEvents = async () => {
    const res = await fetch('/api/events');
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setShowModal(false);
      setFormData({ Title: '', Description: '', EventDate: '', Location: '', CoverImagePath: '/gallery/default.jpg', CategoryID: 1, OrganizerID: 1 });
      fetchEvents();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bu etkinliği silmek istediğine emin misin Turuncu?")) {
      await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
      fetchEvents();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold italic tracking-tighter">ETKİNLİK YÖNETİMİ</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-bold transition-all shadow-lg shadow-orange-900/20"
        >
          + Yeni Etkinlik
        </button>
      </div>

      {/* Tablo Yapısı */}
      <div className="bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-zinc-500 text-[10px] uppercase tracking-widest font-black">
            <tr>
              <th className="p-5">Etkinlik</th>
              <th className="p-5">Tarih</th>
              <th className="p-5">Konum</th>
              <th className="p-5 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {events.map((event: any) => (
              <tr key={event.EventID} className="group hover:bg-white/[0.02] transition-colors">
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <img src={event.CoverImagePath} className="w-10 h-10 rounded-lg object-cover bg-zinc-800" />
                    <span className="font-bold">{event.Title}</span>
                  </div>
                </td>
                <td className="p-5 text-zinc-400 text-sm">{new Date(event.EventDate).toLocaleDateString('tr-TR')}</td>
                <td className="p-5 text-zinc-400 text-sm">{event.Location}</td>
                <td className="p-5 text-right space-x-2">
                  <button onClick={() => handleDelete(event.EventID)} className="text-red-500/50 hover:text-red-500 transition-colors p-2">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EKLEME MODAL (FORM) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl w-full max-w-lg shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-orange-500">Yeni Etkinlik Oluştur</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" placeholder="Etkinlik Adı" required
                className="w-full bg-zinc-800 border border-white/5 p-3 rounded-xl focus:border-orange-500 outline-none"
                onChange={(e) => setFormData({...formData, Title: e.target.value})}
              />
              <textarea 
                placeholder="Açıklama"
                className="w-full bg-zinc-800 border border-white/5 p-3 rounded-xl focus:border-orange-500 outline-none h-24"
                onChange={(e) => setFormData({...formData, Description: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="date" required
                  className="bg-zinc-800 border border-white/5 p-3 rounded-xl focus:border-orange-500 outline-none"
                  onChange={(e) => setFormData({...formData, EventDate: e.target.value})}
                />
                <input 
                  type="text" placeholder="Konum"
                  className="bg-zinc-800 border border-white/5 p-3 rounded-xl focus:border-orange-500 outline-none"
                  onChange={(e) => setFormData({...formData, Location: e.target.value})}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 p-3 rounded-xl hover:bg-white/5 transition-all">İptal</button>
                <button type="submit" className="flex-1 bg-orange-600 p-3 rounded-xl font-bold hover:bg-orange-500 shadow-lg shadow-orange-900/40">Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}