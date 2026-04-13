"use client";
import { useEffect, useState } from 'react';

export default function AdminTeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form datası ve düzenleme durumu
  const [formData, setFormData] = useState({ FullName: '', Role: '', ProfileImagePath: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchTeam = async () => {
    try {
      // cache: 'no-store' ekledik, böylece hayalet verileri tutmayacak
      const res = await fetch('/api/admin/team', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) setTeam(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTeam(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hem EKLEME hem GÜNCELLEME işini yapan fonksiyon
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // GÜNCELLEME (PUT) İSTEĞİ
        const res = await fetch('/api/admin/team', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, MemberID: editingId })
        });
        if (res.ok) {
          setEditingId(null);
          setFormData({ FullName: '', Role: '', ProfileImagePath: '' });
          fetchTeam();
        }
      } else {
        // YENİ EKLEME (POST) İSTEĞİ
        const res = await fetch('/api/admin/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          setFormData({ FullName: '', Role: '', ProfileImagePath: '' });
          fetchTeam();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Düzenle Butonuna Tıklanınca Formu Doldur
  const handleEdit = (member: any) => {
    setEditingId(member.MemberID);
    setFormData({
      FullName: member.FullName,
      Role: member.Role,
      ProfileImagePath: member.ProfileImagePath || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sayfayı en üste kaydır
  };

  // Düzenlemeyi İptal Et
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ FullName: '', Role: '', ProfileImagePath: '' });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Silmek istediğine emin misin?")) {
      try {
        const res = await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' });
        
        if (res.ok) {
          fetchTeam(); // Başarılıysa listeyi taze çek
        } else {
          // Başarısızsa hatayı ekrana yazdır
          const errorData = await res.json();
          alert(`Silinemedi! Hata: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Silme hatası:", error);
      }
    }
  };

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-4xl font-black italic uppercase text-orange-500">Ekip Yönetimi</h2>
      </header>

      {/* FORM ALANI */}
      <div className="bg-zinc-950/50 border border-white/5 p-8 rounded-[2rem]">
        <h3 className="text-xl font-bold mb-6 text-orange-500">
          {editingId ? 'Üyeyi Güncelle' : 'Yeni Üye Ekle'}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-zinc-500 text-xs font-bold uppercase mb-2">Ad Soyad</label>
            <input type="text" name="FullName" value={formData.FullName} onChange={handleChange} required className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none" />
          </div>
          <div>
            <label className="block text-zinc-500 text-xs font-bold uppercase mb-2">Görev</label>
            <input type="text" name="Role" value={formData.Role} onChange={handleChange} required className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none" />
          </div>
          <div>
            <label className="block text-zinc-500 text-xs font-bold uppercase mb-2">Görsel URL</label>
            <input type="text" name="ProfileImagePath" value={formData.ProfileImagePath} onChange={handleChange} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none" placeholder="/team/ornek.png" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-orange-600 text-black font-black uppercase py-3 rounded-xl hover:bg-orange-500 transition-colors">
              {editingId ? 'GÜNCELLE' : 'EKLE'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancelEdit} className="flex-1 bg-zinc-800 text-white font-black uppercase py-3 rounded-xl hover:bg-zinc-700 transition-colors">
                İPTAL
              </button>
            )}
          </div>
        </form>
      </div>

      {/* LİSTE ALANI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading && <p className="text-orange-500 font-bold">Yükleniyor...</p>}
        {team.map((member: any) => (
          <div key={member.MemberID} className={`bg-zinc-900/50 border ${editingId === member.MemberID ? 'border-orange-500' : 'border-white/5'} p-6 rounded-[2rem] flex items-center gap-6 group hover:border-orange-500/30 transition-all`}>
            <img src={member.ProfileImagePath || '/team/default-avatar.png'} className="w-16 h-16 rounded-full object-cover border-2 border-zinc-800" />
            <div className="flex-1">
              <h3 className="text-lg font-black uppercase">{member.FullName}</h3>
              <p className="text-orange-500 text-xs font-bold">{member.Role}</p>
            </div>
            
            {/* Buton Grubu */}
            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button onClick={() => handleEdit(member)} className="p-2 bg-blue-500/10 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-colors" title="Düzenle">
                ✏️
              </button>
              <button onClick={() => handleDelete(member.MemberID)} className="p-2 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors" title="Sil">
                🗑️
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}