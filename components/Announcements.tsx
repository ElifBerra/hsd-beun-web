// components/Announcements.tsx
import Link from 'next/link';

const Announcements = ({ limit = 3, showAllButton = true }) => {
  const announcementsData = [
    {
      id: 1,
      title: "HSD BEUN Elçilik Görevi Devir Teslimi",
      date: "Şubat 2026",
      desc: "Burak Kaymak'tan devraldığımız bayrağı Elif Berra Çelik liderliğinde daha ileriye taşıyoruz.",
      tag: "Haber"
    },
    {
      id: 2,
      title: "Sui 102: Akıllı Kontrat Geliştirme",
      date: "Nisan 2026",
      desc: "Blockchain dünyasında derinleşiyoruz. Sui 102 eğitimlerimiz başlıyor.",
      tag: "Eğitim"
    },
    {
      id: 3,
      title: "Yeni Web Sitemiz Yayında!",
      date: "Nisan 2026",
      desc: "BEUN teknoloji ekosistemini dijitale taşıyan modern platformumuz açıldı.",
      tag: "Duyuru"
    }
    // Buraya daha fazla duyuru eklenebilir...
  ];

  return (
    <section className="max-w-6xl w-full px-4 py-24 border-t border-white/5">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-bold italic text-white">Duyurular</h2>
        {showAllButton && (
          <Link href="/announcements" className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">
            Tümünü Gör →
          </Link>
        )}
      </div>

      <div className="space-y-6">
        {announcementsData.slice(0, limit).map((news) => (
          <div key={news.id} className="group bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-white/[0.08] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mb-2 block">{news.tag}</span>
              <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors mb-2">{news.title}</h3>
              <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">{news.desc}</p>
            </div>
            <div className="text-gray-600 text-xs font-mono whitespace-nowrap bg-white/5 px-4 py-2 rounded-full border border-white/5">
              {news.date}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Announcements;