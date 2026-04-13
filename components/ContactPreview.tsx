"use client";
import { useState } from 'react';

export default function ContactPreview() {
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Subject: '',
    MessageBody: ''
  });
  
  const [status, setStatus] = useState({ loading: false, message: '', isSuccess: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', isSuccess: false });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ loading: false, message: 'Mesajın başarıyla ulaştı! En kısa sürede dönüş yapacağız. 🚀', isSuccess: true });
        setFormData({ FullName: '', Email: '', Subject: '', MessageBody: '' }); // Formu temizle
        
        // 5 saniye sonra başarı mesajını gizle
        setTimeout(() => setStatus({ loading: false, message: '', isSuccess: false }), 5000);
      } else {
        const errorData = await res.json();
        setStatus({ loading: false, message: errorData.error || 'Bir hata oluştu, lütfen tekrar dene.', isSuccess: false });
      }
    } catch (error) {
      console.error("Gönderim hatası:", error);
      setStatus({ loading: false, message: 'Sunucuya ulaşılamadı.', isSuccess: false });
    }
  };

  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-zinc-950/50 border border-white/5 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
          
          {/* Arka Plan Süslemesi */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="text-center mb-12 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-none">
              BİZİMLE <br /> <span className="text-orange-600">İLETİŞİME GEÇ</span>
            </h2>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] mt-6">
              Fikirlerini ve sorularını bizimle paylaş
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Ad Soyad</label>
                <input 
                  type="text" 
                  name="FullName"
                  value={formData.FullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Elif Turuncu"
                />
              </div>
              <div>
                <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">E-Posta</label>
                <input 
                  type="email" 
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="elif@ornek.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Konu</label>
              <input 
                type="text" 
                name="Subject"
                value={formData.Subject}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Neyden bahsetmek istersin?"
              />
            </div>

            <div>
              <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Mesajın</label>
              <textarea 
                name="MessageBody"
                value={formData.MessageBody}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                placeholder="Mesajını buraya yazabilirsin..."
              ></textarea>
            </div>

            {status.message && (
              <div className={`p-4 rounded-2xl font-bold text-sm text-center italic ${status.isSuccess ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                {status.message}
              </div>
            )}

            <button 
              type="submit" 
              disabled={status.loading}
              className="w-full bg-orange-600 text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status.loading ? 'GÖNDERİLİYOR...' : 'MESAJI GÖNDER'}
            </button>
          </form>
          
        </div>
      </div>
    </section>
  );
}