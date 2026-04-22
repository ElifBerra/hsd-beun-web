"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ŞİFREYİ BURADAN BELİRLE (Şimdilik basit bir şey yapalım)
    if (password === 'HSD_BEUN_2026') { 
      // 7 günlük bir giriş çerezi oluşturuyoruz
      document.cookie = "admin_token=authorized; path=/; max-age=" + 60 * 60 * 24 * 7;
      router.push('/admin/team');
      router.refresh();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900/50 border border-white/5 p-10 rounded-[3rem] text-center shadow-2xl">
        <div className="w-20 h-20 bg-orange-600 rounded-full mx-auto mb-8 flex items-center justify-center text-3xl">🔐</div>
        <h2 className="text-3xl font-black italic uppercase text-white mb-2">ADMİN GİRİŞİ</h2>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-10">Yetkisiz Erişim Yasaktır</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            placeholder="Erişim Şifresi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full bg-black border ${error ? 'border-red-600' : 'border-white/10'} rounded-2xl px-6 py-4 text-white text-center outline-none focus:border-orange-600 transition-all`}
          />
          {error && <p className="text-red-600 text-[10px] font-black uppercase italic">Hatalı Şifre!</p>}
          <button type="submit" className="w-full bg-orange-600 text-black font-black py-4 rounded-2xl uppercase tracking-widest hover:bg-orange-500 transition-all">
            SİSTEME GİRİŞ YAP
          </button>
        </form>
      </div>
    </div>
  );
}