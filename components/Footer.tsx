import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Logo ve Motto */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              HSD BEUN
            </Link>
            <p className="mt-4 text-gray-400 max-w-sm">
              Geleceği kodlayan, inovasyonla büyüyen ve teknolojiyi tutkuyla takip eden üniversite topluluğu.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h4 className="text-white font-bold mb-6">Keşfet</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-red-500 transition-colors">Ana Sayfa</Link></li>
              <li><Link href="/etkinlikler" className="hover:text-red-500 transition-colors">Etkinlikler</Link></li>
              <li><Link href="/ekip" className="hover:text-red-500 transition-colors">Ekibimiz</Link></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-white font-bold mb-6">Sosyal Medya</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="https://instagram.com" target="_blank" className="hover:text-pink-500 transition-colors text-orange-400">Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" className="hover:text-blue-500 transition-colors">LinkedIn</a></li>
              <li><a href="https://medium.com" target="_blank" className="hover:text-white transition-colors">Medium</a></li>
            </ul>
          </div>

        </div>

        {/* Alt Çizgi ve Telif */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>© 2026 HSD Zonguldak Bülent Ecevit Üniversitesi. Tüm hakları saklıdır.</p>
          <p className="mt-4 md:mt-0">Design & Code by <span className="text-orange-500 font-medium">Elif Berra Çelik</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;