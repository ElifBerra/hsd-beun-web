"use client";
import { useEffect, useState } from 'react';

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    SponsorName: '',
    LogoPath: '',
    WebsiteUrl: '',
    SponsorshipType: '',
    BrandColor: '#EA580C' // Varsayılan HSD Turuncusu
  });

  const fetchSponsors = async () => {
    try {
      const res = await fetch('/api/admin/sponsors', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) setSponsors(data);
    } catch (error) {
      console.error("Yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  // GÖRSELİ BASE64'E ÇEVİRME
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, LogoPath: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const body = editingId ? { ...formData, SponsorID: editingId } : formData;

    try {
      const res = await fetch('/api/admin/sponsors', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setFormData({ SponsorName: '', LogoPath: '', WebsiteUrl: '', SponsorshipType: '', BrandColor: '#EA580C' });
        setEditingId(null);
        fetchSponsors();
      } else {
        const errorData = await res.json();
        alert("Hata: " + errorData.error);
      }
    } catch (error) {
      alert("Bağlantı hatası!");
    }
  };

  const handleEdit = (s: any) => {
    setEditingId(s.SponsorID);
    setFormData({
      SponsorName: s.SponsorName,
      LogoPath: s.LogoPath,
      WebsiteUrl: s.WebsiteUrl || '',
      SponsorshipType: s.SponsorshipType || '',
      BrandColor: s.BrandColor || '#EA580C'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bu sponsoru silmek istediğine emin misin?")) {
      const res = await fetch(`/api/admin/sponsors?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchSponsors();
    }
  };

  return (
    <div className="space-y-12 p-4 md:p-8">
      <header>
        <h2 className="text-4xl font-black italic uppercase text-orange-500 tracking-tighter">Sponsor Yönetimi</h2>
        <p className="text-zinc-500 font-bold text-xs tracking-widest uppercase mt-2">Marka İş Birlikleri ve Renk Ayarları</p>
      </header>

      {/* FORM ALANI */}
      <div className="bg-zinc-950/50 border border-white/5 p-8 rounded-[2.5rem]">
        <h3 className="text-xl font-bold mb-8 text-orange-500 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-sm">
            {editingId ? '✎' : '+'}
          </span>
          {editingId ? 'Sponsor Bilgilerini Güncelle' : 'Yeni Sponsor Tanımla'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* İsim */}
            <div>
              <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Sponsor Adı</label>
              <input 
                type="text" 
                value={formData.SponsorName} 
                onChange={(e) => setFormData({...formData, SponsorName: e.target.value})} 
                required 
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-orange-500 transition-all" 
                placeholder="Örn: Huawei" 
              />
            </div>

            {/* Tür */}
            <div>
              <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Sponsorluk Türü</label>
              <input 
                type="text" 
                value={formData.SponsorshipType} 
                onChange={(e) => setFormData({...formData, SponsorshipType: e.target.value})} 
                required 
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-orange-500 transition-all" 
                placeholder="Örn: Ana Sponsor, Platin, Teknik vb." 
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Website URL</label>
              <input 
                type="text" 
                value={formData.WebsiteUrl} 
                onChange={(e) => setFormData({...formData, WebsiteUrl: e.target.value})} 
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-orange-500 transition-all" 
                placeholder="https://..." 
              />
            </div>

            {/* Renk Seçici */}
            <div>
              <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Marka Rengi (Neon Efekti)</label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  value={formData.BrandColor} 
                  onChange={(e) => setFormData({...formData, BrandColor: e.target.value})} 
                  className="h-[60px] w-20 bg-zinc-900 border border-white/10 rounded-2xl p-1 cursor-pointer" 
                />
                <input 
                  type="text" 
                  value={formData.BrandColor} 
                  onChange={(e) => setFormData({...formData, BrandColor: e.target.value})} 
                  className="flex-1 bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-sm uppercase" 
                />
              </div>
            </div>

            {/* Logo Yükleme */}
            <div className="lg:col-span-2">
              <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Logo Yükle (SVG/PNG)</label>
              <div className="flex gap-4 items-center">
                <label className="flex-1 bg-zinc-900 border-2 border-dashed border-white/10 hover:border-orange-500/50 rounded-2xl p-4 transition-all cursor-pointer text-center group">
                  <span className="text-zinc-500 font-bold text-sm group-hover:text-orange-500 transition-colors">
                    {formData.LogoPath ? 'Logo Değiştir' : 'Görsel Seç'}
                  </span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
                {formData.LogoPath && (
                  <div className="w-16 h-16 bg-white rounded-2xl p-2 flex items-center justify-center">
                    <img src={formData.LogoPath} className="max-h-full object-contain" alt="Önizleme" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex-1 bg-orange-600 text-black font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-orange-500 transition-all shadow-lg shadow-orange-600/20">
              {editingId ? 'Sponsoru Güncelle' : 'Sponsoru Sisteme İşle'}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={() => { setEditingId(null); setFormData({ SponsorName: '', LogoPath: '', WebsiteUrl: '', SponsorshipType: '', BrandColor: '#EA580C' }); }}
                className="px-10 bg-zinc-800 text-white font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-zinc-700 transition-all"
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* LİSTELEME ALANI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-orange-500 font-black animate-pulse italic">Veriler senkronize ediliyor...</p>
        ) : (
          sponsors.map((s) => (
            <div 
              key={s.SponsorID} 
              className="group bg-zinc-950 border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden transition-all hover:border-white/20"
            >
              <div 
                className="absolute top-0 right-0 w-16 h-16 blur-3xl rounded-full opacity-20"
                style={{ backgroundColor: s.BrandColor }}
              ></div>

              <div className="h-16 w-full flex items-center justify-center mb-6">
                <img src={s.LogoPath} className="max-h-full w-auto object-contain" alt={s.SponsorName} />
              </div>

              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-widest mb-1 block" style={{ color: s.BrandColor }}>
                  {s.SponsorshipType}
                </span>
                <a 
                  href={s.WebsiteUrl} 
                  target="_blank" 
                  className="text-white font-black italic uppercase tracking-tighter text-lg hover:text-orange-500 transition-colors block"
                >
                  {s.SponsorName}
                </a>
              </div>

              <div className="flex gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <button 
                  onClick={() => handleEdit(s)}
                  className="flex-1 bg-blue-500/10 text-blue-500 font-black text-[10px] uppercase py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all"
                >
                  Düzenle
                </button>
                <button 
                  onClick={() => handleDelete(s.SponsorID)}
                  className="flex-1 bg-red-500/10 text-red-500 font-black text-[10px] uppercase py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                >
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}