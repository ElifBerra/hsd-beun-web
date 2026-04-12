"use client";

import { useState } from "react";

const ContactPreview = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mesajınız iletildi! Turuncu ekibimiz size en kısa sürede dönecek. 🚀");
  };

  return (
    <section className="max-w-6xl w-full px-4 py-24 border-t border-white/5">
      {/* Başlık - Ana sayfaya uygun hale getirdik */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent italic">
          Bize Ulaşın
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          HSD BEUN dünyasına adım atmak veya sorularınızı iletmek için formu doldurabilirsiniz.
        </p>
      </div>

      {/* İletişim Kartı - İletişim sayfasındakinin aynısı */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_-12px_rgba(234,88,12,0.2)]">
        
        {/* Sol Panel - Turuncu Gradient */}
        <div className="md:w-1/3 bg-gradient-to-br from-orange-600 via-orange-800 to-black p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">İletişim Bilgileri</h2>
            <p className="text-orange-100/80 text-sm leading-relaxed mb-12">
              BEUN kampüsündeki teknoloji üssümüze bir mesaj uzağındasınız.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl group-hover:bg-white/20 transition-all text-orange-400">
                  📍
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Adres</p>
                  <p className="text-orange-100/60 text-xs">BEUN Mühendislik Fakültesi, Zonguldak</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl group-hover:bg-white/20 transition-all text-orange-400">
                  ✉️
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Email</p>
                  <p className="text-orange-100/60 text-xs">hsdbeun@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-12">
            <p className="text-white font-bold text-sm mb-4">Takip Et</p>
            <div className="flex gap-4">
              <div className="w-11 h-11 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center cursor-pointer transition-all border border-white/10">📸</div>
              <div className="w-11 h-11 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center cursor-pointer transition-all border border-white/10">🔗</div>
            </div>
          </div>
        </div>

        {/* Sağ Panel - Form (Tam Versiyon) */}
        <div className="md:w-2/3 p-12 bg-black/40 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium ml-1">Ad Soyad</label>
                <input 
                  type="text" 
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-gray-600"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium ml-1">E-posta</label>
                <input 
                  type="email" 
                  placeholder="ornek@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-gray-600"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium ml-1">Konu</label>
              <input 
                type="text" 
                placeholder="Mesajınızın konusu"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-gray-600"
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium ml-1">Mesajınız</label>
              <textarea 
                rows={4}
                placeholder="Bize iletmek istediklerinizi buraya yazın..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all resize-none placeholder:text-gray-600"
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-5 rounded-2xl transition-all transform active:scale-[0.98] shadow-[0_10px_20px_-10px_rgba(234,88,12,0.5)]"
            >
              Mesajı Gönder 🚀
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactPreview;