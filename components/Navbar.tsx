import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Sol Kısım: Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              HSD BEUN
            </Link>
          </div>

          {/* Sağ Kısım: Menü Linkleri */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 text-sm font-medium">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Ana Sayfa</Link>
              <Link href="/events" className="text-gray-300 hover:text-white transition-colors">Etkinlikler</Link>
              <Link href="/team" className="text-gray-300 hover:text-white transition-colors">Ekibimiz</Link>
              <Link href="/contact" className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-all text-white">İletişim</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;