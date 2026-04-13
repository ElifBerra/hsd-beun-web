"use client";
import { useEffect, useState } from 'react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    EventDate: '',
    Location: '',
    CoverImagePath: '',
    RegistrationLink: '' // Google Form linki için yeni alan
  });

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/admin/events', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) setEvents(data);
    } catch (error) {
      console.error("Yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // GÖRSELİ BASE64'E ÇEVİRME
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, CoverImagePath: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const body = editingId ? { ...formData, EventID: editingId } : formData;

    try {
      const res = await fetch('/api/admin/events', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert(editingId ? "Etkinlik güncellendi! ✅" : "Etkinlik başarıyla oluşturuldu! 🚀");
        setFormData({ Title: '', Description: '', EventDate: '', Location: '', CoverImagePath: '', RegistrationLink: '' });
        setEditingId(null);
        fetchEvents();
      } else {
        const errorData = await res.json();
        alert("Hata oluştu: " + errorData.error);
      }
    } catch (error) {
      alert("Sunucu bağlantı hatası!");
    }
  };

  const handleEdit = (ev: any) => {
    setEditingId(ev.EventID);
    setFormData({
      Title: ev.Title,
      Description: ev.Description,
      EventDate: new Date(ev.EventDate).toISOString().split('T')[0],
      Location: ev.Location,
      CoverImagePath: ev.CoverImagePath,
      RegistrationLink: ev.RegistrationLink || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bu etkinliği silmek istediğine emin misin?")) {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchEvents();
    }
  };

  return (
    <div className="space-y-12 p-8 min-h-screen bg-black text-white">
      <header>
        <h2 className="text-5xl font-black italic uppercase text-orange-500 tracking-tighter">
          ETKİNLİK YÖNETİMİ
        </h2>
        <p className="text-zinc-500 font-bold text-xs tracking-widest uppercase mt-2">Etkinlik Oluştur, Güncelle ve Kayıt Linklerini Yönet</p>
      </header>

      {/* FORM BÖLÜMÜ */}
      <div className="bg-zinc-950/50 border border-white/5 p-10 rounded-[3rem]">
        <h3 className="text-xl font-bold mb-8 text-orange-500 flex items-center gap-3 uppercase italic">
          {editingId ? '✎ Etkinliği Düzenle' : '+ Yeni Etkinlik Oluştur'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-zinc-500 text-[10px] font-black uppercase ml-2 tracking-widest">Etkinlik Başlığı</label>
              <input 
                type="text" 
                placeholder="Başlık girin..."
                value={formData.Title} 
                onChange={e => setFormData({...formData, Title: e.target.value})} 
                className="w-full bg-zinc-900/50 border border-white/10 p-5 rounded-2xl outline-none focus:border-orange-500 transition-all" 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-zinc-500 text-[10px] font-black uppercase ml-2 tracking-widest">Etkinlik Tarihi</label>
              <input 
                type="date" 
                value={formData.EventDate} 
                onChange={e => setFormData({...formData, EventDate: e.target.value})} 
                className="w-full bg-zinc-900/50 border border-white/10 p-5 rounded-2xl outline-none focus:border-orange-500 text-white" 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-zinc-500 text-[10px] font-black uppercase ml-2 tracking-widest">Konum / Platform</label>
              <input 
                type="text" 
                placeholder="Örn: Zoom, Discord veya Fakülte Konumu"
                value={formData.Location} 
                onChange={e => setFormData({...formData, Location: e.target.value})} 
                className="w-full bg-zinc-900/50 border border-white/10 p-5 rounded-2xl outline-none focus:border-orange-500" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-zinc-500 text-[10px] font-black uppercase ml-2 tracking-widest">Kayıt Linki (Google Form vb.)</label>
              <input 
                type="text" 
                placeholder="https://forms.gle/..."
                value={formData.RegistrationLink} 
                onChange={e => setFormData({...formData, RegistrationLink: e.target.value})} 
                className="w-full bg-zinc-900/50 border border-white/10 p-5 rounded-2xl outline-none focus:border-orange-500 text-orange-500 font-medium" 
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-zinc-500 text-[10px] font-black uppercase ml-2 tracking-widest">Etkinlik Afişi</label>
              <div className="flex items-center gap-6 bg-zinc-900/50 border border-white/10 p-4 rounded-2xl">
                <label className="bg-orange-600 hover:bg-orange-500 text-black font-black py-3 px-8 rounded-xl cursor-pointer transition-all text-xs uppercase tracking-widest">
                  Görsel Seç
                  <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                </label>
                {formData.CoverImagePath && (
                    <div className="h-16 w-16 rounded-xl overflow-hidden border border-white/20">
                        <img src={formData.CoverImagePath} className="h-full w-full object-cover" />
                    </div>
                )}
                <span className="text-zinc-500 text-[10px] uppercase font-bold italic">
                  {formData.CoverImagePath ? "Afiş Değiştirilebilir ✅" : "Afiş Yüklenmedi"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-zinc-500 text-[10px] font-black uppercase ml-2 tracking-widest">Etkinlik Detayları (Açıklama)</label>
            <textarea 
              placeholder="Etkinlik hakkında detaylı bilgi girin..."
              value={formData.Description} 
              onChange={e => setFormData({...formData, Description: e.target.value})} 
              className="w-full bg-zinc-900/50 border border-white/10 p-6 rounded-3xl h-40 outline-none focus:border-orange-500 resize-none italic"
            />
          </div>

          <div className="flex gap-4">
            <button 
                type="submit" 
                className="flex-1 bg-orange-600 hover:bg-orange-500 text-black font-black py-6 rounded-[2rem] uppercase tracking-[0.3em] transition-all shadow-xl shadow-orange-600/10 active:scale-95"
            >
                {editingId ? 'DEĞİŞİKLİKLERİ KAYDET' : 'YENİ ETKİNLİĞİ OLUŞTUR'}
            </button>
            {editingId && (
                <button 
                type="button"
                onClick={() => { setEditingId(null); setFormData({Title: '', Description: '', EventDate: '', Location: '', CoverImagePath: '', RegistrationLink: ''}) }}
                className="px-10 bg-zinc-800 hover:bg-zinc-700 text-white font-black py-6 rounded-[2rem] uppercase tracking-widest transition-all"
                >
                İptal
                </button>
            )}
          </div>
        </form>
      </div>

      {/* LİSTELEME */}
      <h3 className="text-2xl font-black italic uppercase text-zinc-500 tracking-tighter">Mevcut Etkinlikler</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-orange-500 animate-pulse font-black uppercase tracking-widest">Yükleniyor...</p>
        ) : (
          events.map(ev => (
            <div key={ev.EventID} className="group bg-zinc-950 border border-white/5 p-6 rounded-[2.5rem] relative overflow-hidden transition-all hover:border-orange-500/20">
              <div className="h-48 w-full overflow-hidden rounded-[1.5rem] mb-6">
                <img src={ev.CoverImagePath} className="h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="" />
              </div>
              <h3 className="font-black uppercase text-xl mb-2 italic leading-none">{ev.Title}</h3>
              <div className="flex justify-between items-center mb-6">
                <p className="text-orange-500 text-[10px] font-black tracking-widest uppercase">{new Date(ev.EventDate).toLocaleDateString('tr-TR')}</p>
                {ev.RegistrationLink && <span className="text-green-500 text-[8px] font-black uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded">Kayıt Açık</span>}
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => handleEdit(ev)} className="flex-1 bg-blue-500/10 text-blue-500 font-bold py-3 rounded-xl text-xs hover:bg-blue-500 hover:text-white transition-all uppercase tracking-widest">Düzenle</button>
                <button onClick={() => handleDelete(ev.EventID)} className="flex-1 bg-red-500/10 text-red-500 font-bold py-3 rounded-xl text-xs hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest">Sil</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}