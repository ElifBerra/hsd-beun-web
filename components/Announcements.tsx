import Link from 'next/link';

const Announcements = () => {
  return (
    <section className="max-w-6xl w-full px-4 py-20 border-t border-white/5">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold">Son Duyurular</h2>
        <Link href="/duyurular" className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">
          Tümünü Gör →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Duyuru Kartı 1 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row hover:bg-white/[0.07] transition-all cursor-pointer group">
          <div className="md:w-64 h-48 bg-gradient-to-br from-red-600/20 to-orange-500/20 flex items-center justify-center">
            <span className="text-4xl group-hover:scale-110 transition-transform duration-300">📢</span>
          </div>
          <div className="p-8 flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-red-600/20 text-red-500 text-xs font-bold rounded-full uppercase">Etkinlik</span>
              <span className="text-gray-500 text-xs">12 Nisan 2026</span>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors">Sui 102: Akıllı Kontrat Geliştirme</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Move diline derinlemesine dalış yapıyoruz. Kendi akıllı kontratını yazmaya hazır mısın?
            </p>
          </div>
        </div>

        {/* Duyuru Kartı 2 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row hover:bg-white/[0.07] transition-all cursor-pointer group">
          <div className="md:w-64 h-48 bg-gradient-to-br from-blue-600/20 to-purple-500/20 flex items-center justify-center">
            <span className="text-4xl group-hover:scale-110 transition-transform duration-300">🚀</span>
          </div>
          <div className="p-8 flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-600/20 text-blue-500 text-xs font-bold rounded-full uppercase">Duyuru</span>
              <span className="text-gray-500 text-xs">10 Nisan 2026</span>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Yeni Dönem Başvuruları</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ekibimize katılmak ve kampüs elçisi olma yolunda ilk adımı atmak ister misin?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcements;