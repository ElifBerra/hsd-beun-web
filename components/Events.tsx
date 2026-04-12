"use client"; 
import Link from 'next/link';

const Events = ({ showAllButton = true }) => {
  // İleride bu 'eventsData' bir veritabanından veya admin panelinden gelecek
  const eventsData = [
    {
      id: 1,
      tag: "Yakında",
      day: "25",
      month: "Nisan",
      title: "Buildermare x HSD Workshop",
      desc: "Zonguldak Teknopark'ta ekosistemi büyütecek projeleri konuşuyoruz.",
      color: "orange"
    },
    {
      id: 2,
      tag: "Hazırlanıyor",
      day: "05",
      month: "Mayıs",
      title: "AI & Cloud Day",
      desc: "Huawei Cloud servisleri ile yapay zeka modelleri eğitme üzerine bir gün.",
      color: "blue"
    }
  ];

  return (
    <section id="etkinlikler-bolumu" className="max-w-6xl w-full px-4 py-20 border-t border-white/5 scroll-mt-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 italic">Yaklaşan Etkinlikler</h2>
        <p className="text-gray-400">Takvimini şimdiden ayarla, teknoloji dolu buluşmaları kaçırma!</p>
        {showAllButton && (
          <>
            <br /><br />
            <Link href="/events" className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">
              Tümünü Gör →
            </Link>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {eventsData.map((event) => (
          <div key={event.id} className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className={`
                px-4 py-1 rounded-full text-xs font-bold uppercase
                ${event.color === 'orange' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'}
              `}>
                {event.tag}
              </div>
              <div className="text-right">
                <span className="block text-2xl font-bold text-white">{event.day}</span>
                <span className="text-xs text-gray-400 uppercase">{event.month}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">{event.title}</h3>
            <p className="text-gray-400 text-sm mb-6">{event.desc}</p>
            <button className="w-full py-3 rounded-xl border border-white/10 group-hover:bg-white group-hover:text-black transition-all font-medium text-sm italic">
              Detayları İncele
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;