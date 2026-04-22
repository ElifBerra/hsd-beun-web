"use client";
import { useEffect, useState } from 'react';

export default function AdminTeamPage() {
  // --- STATELER ---
  const [team, setTeam] = useState<any[]>([]);
  const [committees, setCommittees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Üye Formu State
  const [formData, setFormData] = useState({ 
    FullName: '', Role: '', RoleType: 5, Committee: '',
    LinkedInUrl: '', GitHubUrl: '', MediumUrl: '', PhotoData: '',
    IsShowcase: false 
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Komite Yönetim State
  const [newCommitteeName, setNewCommitteeName] = useState('');
  const [editingCommittee, setEditingCommittee] = useState<{id: number, name: string} | null>(null);

  // --- VERİ ÇEKME ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const [teamRes, commRes] = await Promise.all([
        fetch('/api/admin/team', { cache: 'no-store' }),
        fetch('/api/admin/committees', { cache: 'no-store' })
      ]);

      const teamData = await teamRes.json();
      const commData = await commRes.json();

      if (Array.isArray(teamData)) setTeam(teamData);
      if (Array.isArray(commData)) {
        setCommittees(commData);
        // Yeni üye eklerken ilk komiteyi varsayılan seç
        if (!editingId && commData.length > 0 && !formData.Committee) {
          setFormData(prev => ({ ...prev, Committee: commData[0].CommitteeName }));
        }
      }
    } catch (error) {
      console.error("Veri yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- KOMİTE YÖNETİM FONKSİYONLARI ---
  const handleAddCommittee = async () => {
    if (!newCommitteeName) return;
    const res = await fetch('/api/admin/committees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ CommitteeName: newCommitteeName })
    });
    if (res.ok) { setNewCommitteeName(''); fetchData(); }
  };

  const handleDeleteCommittee = async (id: number) => {
    if (!confirm("Bu komiteyi silmek istediğine emin misin?")) return;
    const res = await fetch(`/api/admin/committees?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchData();
  };

  const handleUpdateCommittee = async () => {
    if (!editingCommittee) return;
    const res = await fetch('/api/admin/committees', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ CommitteeID: editingCommittee.id, CommitteeName: editingCommittee.name })
    });
    if (res.ok) { setEditingCommittee(null); fetchData(); }
  };

  // --- ÜYE YÖNETİM FONKSİYONLARI ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, PhotoData: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const body = editingId ? { ...formData, MemberID: editingId } : formData;

    const res = await fetch('/api/admin/team', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      setEditingId(null);
      setFormData({ 
        FullName: '', Role: '', RoleType: 5, Committee: committees[0]?.CommitteeName || '', 
        LinkedInUrl: '', GitHubUrl: '', MediumUrl: '', PhotoData: '', IsShowcase: false 
      });
      fetchData();
      alert("Başarıyla kaydedildi! 🚀");
    }
  };

  const handleEdit = (member: any) => {
    setEditingId(member.MemberID);
    setFormData({
      FullName: member.FullName || '',
      Role: member.Role || '', 
      RoleType: member.RoleType || 5,
      Committee: member.Committee || '',
      LinkedInUrl: member.LinkedInUrl || '',
      GitHubUrl: member.GitHubUrl || '',
      MediumUrl: member.MediumUrl || '',
      PhotoData: member.PhotoData || '',
      IsShowcase: member.IsShowcase === true || member.IsShowcase === 1
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto p-4 pb-20">
      <header className="flex justify-between items-center">
        <h2 className="text-4xl font-black italic uppercase text-orange-500 tracking-tighter">EKİP MERKEZİ 👥</h2>
        {loading && <span className="text-orange-500 animate-pulse font-bold text-xs">YÜKLENİYOR...</span>}
      </header>

      {/* 1. BÖLÜM: KOMİTE YÖNETİMİ */}
      <div className="bg-zinc-950/80 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
        <h4 className="text-orange-500 font-black uppercase text-sm mb-6 italic tracking-widest">Komite / Departman Yönetimi</h4>
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <input 
            type="text" 
            placeholder="Komite İsmi..." 
            value={editingCommittee ? editingCommittee.name : newCommitteeName}
            onChange={(e) => editingCommittee 
              ? setEditingCommittee({...editingCommittee, name: e.target.value}) 
              : setNewCommitteeName(e.target.value)
            }
            className="bg-black border border-white/10 rounded-2xl px-6 py-3 text-sm text-white flex-1 outline-none focus:border-orange-600 transition-all"
          />
          <button 
            onClick={editingCommittee ? handleUpdateCommittee : handleAddCommittee}
            className="bg-orange-600 text-black font-black px-8 py-3 rounded-2xl text-xs uppercase hover:bg-orange-500 transition-all"
          >
            {editingCommittee ? 'GÜNCELLE' : 'EKLE'}
          </button>
          {editingCommittee && (
            <button onClick={() => setEditingCommittee(null)} className="bg-zinc-800 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase">İPTAL</button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {committees?.map((c) => (
            <div key={c.CommitteeID} className="group flex items-center gap-3 bg-zinc-900 border border-white/5 px-4 py-2 rounded-xl hover:border-orange-600/30 transition-all">
              <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">{c.CommitteeName}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditingCommittee({id: c.CommitteeID, name: c.CommitteeName})} className="text-[10px] hover:text-orange-500">✏️</button>
                <button onClick={() => handleDeleteCommittee(c.CommitteeID)} className="text-[10px] hover:text-red-500">✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. BÖLÜM: ÜYE EKLEME FORMU */}
      <div className="bg-zinc-900/80 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
        <h3 className="text-lg font-bold mb-6 text-zinc-400 uppercase italic">
          {editingId ? 'Üye Bilgilerini Düzenle 📝' : 'Yeni Üye Kaydı ➕'}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
             <label className="text-[10px] font-black text-zinc-500 uppercase ml-2">Ad Soyad</label>
             <input type="text" name="FullName" value={formData.FullName} onChange={handleChange} required className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-sm" />
          </div>
          <div>
             <label className="text-[10px] font-black text-zinc-500 uppercase ml-2">Görev Tanımı</label>
             <input type="text" name="Role" value={formData.Role} onChange={handleChange} required className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-sm" placeholder="Frontend Developer" />
          </div>
          <div>
             <label className="text-[10px] font-black text-zinc-500 uppercase ml-2">Hiyerarşi</label>
             <select name="RoleType" value={formData.RoleType} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-sm text-zinc-400 outline-none">
                <option value={1}>Elçi</option>
                <option value={2}>Elçi Yardımcısı</option>
                <option value={3}>Komite Lideri</option>
                <option value={4}>Co-Lead</option>
                <option value={5}>Üye</option>
             </select>
          </div>
          <div>
             <label className="text-[10px] font-black text-zinc-500 uppercase ml-2">Komite Seçin</label>
             <select name="Committee" value={formData.Committee} onChange={handleChange} required className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-sm text-zinc-400 outline-none">
                <option value="">Seçiniz...</option>
                {committees?.map(c => (
                  <option key={c.CommitteeID} value={c.CommitteeName}>{c.CommitteeName}</option>
                ))}
             </select>
          </div>
          <div>
             <label className="text-[10px] font-black text-zinc-500 uppercase ml-2">LinkedIn</label>
             <input type="text" name="LinkedInUrl" value={formData.LinkedInUrl} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-sm" />
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="text-[10px] font-black text-zinc-500 uppercase ml-2">GitHub</label>
              <input type="text" name="GitHubUrl" value={formData.GitHubUrl} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-sm" />
            </div>
            <div className="w-1/2">
              <label className="text-[10px] font-black text-zinc-500 uppercase ml-2">Medium</label>
              <input type="text" name="MediumUrl" value={formData.MediumUrl} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-sm" />
            </div>
          </div>

          <div className="md:col-span-2 flex items-center gap-6 bg-black/40 p-4 rounded-2xl border border-white/5">
             <div className="flex-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase ml-2 block mb-2">Profil Fotoğrafı</label>
                <input type="file" onChange={handlePhoto} className="text-[10px] file:bg-orange-600 file:border-0 file:px-4 file:py-2 file:rounded-full file:font-black cursor-pointer text-zinc-500" />
             </div>
             <div className="flex items-center gap-2">
                <input type="checkbox" name="IsShowcase" id="IsShowcase" checked={formData.IsShowcase} onChange={handleChange} className="w-5 h-5 accent-orange-600" />
                <label htmlFor="IsShowcase" className="text-[10px] font-black text-white uppercase cursor-pointer">Vitrinde Göster</label>
             </div>
          </div>

          <div className="md:col-span-1 flex gap-2 pt-6">
            <button type="submit" className="flex-1 bg-orange-600 text-black font-black uppercase py-4 rounded-2xl hover:bg-orange-500 transition-all shadow-lg shadow-orange-600/20">
              {editingId ? 'GÜNCELLE' : 'ÜYEYİ EKLE'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ FullName: '', Role: '', RoleType: 5, Committee: committees[0]?.CommitteeName || '', LinkedInUrl: '', GitHubUrl: '', MediumUrl: '', PhotoData: '', IsShowcase: false }); }} className="bg-zinc-800 text-white px-6 rounded-2xl hover:bg-zinc-700 transition-all">✕</button>
            )}
          </div>
        </form>
      </div>

      {/* 3. BÖLÜM: MEVCUT EKİP LİSTESİ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((m: any) => (
          <div key={m.MemberID} className={`bg-zinc-900/40 border ${m.IsShowcase ? 'border-orange-500/40' : 'border-white/5'} p-5 rounded-[2rem] flex items-center gap-4 group relative overflow-hidden transition-all hover:bg-zinc-900/60`}>
            {m.IsShowcase && <div className="absolute top-0 right-0 bg-orange-600 text-black font-black text-[7px] px-3 py-1 rounded-bl-xl uppercase tracking-widest">VİTRİN</div>}
            <img src={m.PhotoData || '/default-avatar.png'} className="w-14 h-14 rounded-full object-cover border-2 border-zinc-800 shadow-xl" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-black uppercase truncate text-white">{m.FullName}</h3>
              <p className="text-orange-500 text-[9px] font-bold truncate tracking-tighter uppercase">{m.Role} | {m.Committee}</p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
              <button onClick={() => handleEdit(m)} className="p-2 bg-white/5 hover:bg-orange-600 rounded-lg transition-colors text-xs">✏️</button>
              <button onClick={async () => { if(confirm("Silmek istediğine emin misin?")) { await fetch(`/api/admin/team?id=${m.MemberID}`, {method:'DELETE'}); fetchData(); } }} className="p-2 bg-white/5 hover:bg-red-600 rounded-lg transition-colors text-xs">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}