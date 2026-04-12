"use client";

import Link from 'next/link';

const Events = ({ showAllButton = true }) => {
  // ÖNEMLİ: Tarihleri YYYY-MM-DD formatında yazıyoruz ki JS kolayca kıyaslasın
  const eventsData = [
    {
      id: 1,
      date: "2026-04-25", // Gelecek bir tarih
      title: "Buildermare x HSD Workshop",
      desc: "Zonguldak Teknopark'ta ekosistemi büyütecek projeleri konuşuyoruz.",
      color: "orange"
    },
    {
      id: 2,
      date: "2026-05-05", // Gelecek bir tarih
      title: "AI & Cloud Day",
      desc: "Huawei Cloud servisleri ile yapay zeka modelleri eğitme üzerine bir gün.",
      color: "blue"
    },
    {
      id: 3,
      date: "2024-12-10", // Geçmiş bir tarih
      title: "Sui 101 Giriş",
      desc: "Blockchain dünyasına ilk adımı attığımız temel eğitim.",
      color: "gray"
    }
  ];

  const today = new Date();

  // Etkinlikleri Tarihe Göre Ayırıyoruz
  const upcomingEvents = eventsData.filter(event => new Date(event.date) >= today);
  const pastEvents = eventsData.filter(event => new Date(event.date) < today);

  // Tarih Formatlama Yardımcısı (Örn: 25 Nisan)
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    const day = d.getDate();
    const month = d.toLocaleString('tr-TR', { month: 'long' });
    return { day, month };
  };

  return (
    <section id="etkinlikler-bolumu" className="max-w-6xl w-full px-4 py-20 border-t border-white/5 scroll-mt-24">
      
      {/* GELECEK ETKİNLİKLER */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 italic text-white">Yaklaşan Etkinlikler</h2>
        {showAllButton && (
          <Link href="/events" className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">
            Tümünü Gör →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {upcomingEvents.map((event) => {
          const { day, month } = formatDate(event.date);
          return (
            <div key={event.id} className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-orange-500/20 text-orange-500 px-4 py-1 rounded-full text-xs font-bold uppercase">Yakında</div>
                <div className="text-right">
                  <span className="block text-2xl font-bold text-white">{day}</span>
                  <span className="text-xs text-gray-400 uppercase">{month}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">{event.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{event.desc}</p>
              <button className="w-full py-3 rounded-xl border border-white/10 group-hover:bg-white group-hover:text-black transition-all font-medium text-sm">Detaylar</button>
            </div>
          );
        })}
      </div>

      {/* GEÇMİŞ ETKİNLİKLER (Sadece Events sayfasında veya isteğe bağlı gösterilebilir) */}
      {!showAllButton && pastEvents.length > 0 && (
        <div className="mt-32">
          <h2 className="text-3xl font-bold mb-12 italic text-gray-500">Geçmiş Etkinlikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
            {pastEvents.map((event) => {
              const { day, month } = formatDate(event.date);
              return (
                <div key={event.id} className="bg-white/5 border border-white/5 rounded-2xl p-6 grayscale hover:grayscale-0 transition-all">
                   <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 text-xs font-bold uppercase">Tamamlandı</span>
                    <span className="text-sm text-gray-500">{day} {month}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-300">{event.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;