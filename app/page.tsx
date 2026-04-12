export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center pt-32 selection:bg-orange-500 selection:text-white">
      {/* Hero Section */}
      <section className="text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
          Geleceği Birlikte Kodlayalım
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
          Zonguldak Bülent Ecevit Üniversitesi Huawei Student Developers topluluğu olarak, 
          teknolojiyi tutkuyla takip ediyor ve yenilikçi projeler üretiyoruz.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105">
            Topluluğa Katıl
          </button>
          <button className="border border-white/20 hover:border-white text-white px-8 py-4 rounded-full font-bold text-lg transition-all bg-white/5">
            Etkinlikleri Gör
          </button>
        </div>
      </section>

      {/* İleride buraya "Neler Yapıyoruz?" kartlarını ekleyeceğiz */}
    </main>
  );
}