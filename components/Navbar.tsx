import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-white/10 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* SOL TARAF: Logo */}
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
          HSD BEUN
        </Link>

        {/* SAĞ TARAF: Menü Linkleri */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Ana Sayfa
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            Hakkımızda
          </Link>
          <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
            Etkinlikler
          </Link>
          <Link href="/team" className="text-gray-300 hover:text-white transition-colors">
            Ekibimiz
          </Link>
          <Link href="/contact" className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-all text-white font-bold">
            İletişim
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;