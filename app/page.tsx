export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center pt-32 selection:bg-orange-500 selection:text-white">
      
      {/* 1. HERO SECTION - Sadece 1 tane olmalı */}
      <section className="text-center px-4 max-w-4xl flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent leading-tight">
          Geleceği Birlikte Kodlayalım
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
          Zonguldak Bülent Ecevit Üniversitesi Huawei Student Developers topluluğu olarak, 
          teknolojiyi tutkuyla takip ediyor ve yenilikçi projeler üretiyoruz.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20">
            Topluluğa Katıl
          </button>
          <button className="border border-white/20 hover:border-white text-white px-8 py-4 rounded-full font-bold text-lg transition-all bg-white/5 backdrop-blur-sm">
            Etkinlikleri Gör
          </button>
        </div>
      </section>

      {/* 2. ÖZELLİKLER KARTLARI - Sadece 1 tane olmalı */}
      <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-6xl w-full pb-20">
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-red-600/50 transition-all group">
          <div className="w-12 h-12 bg-red-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
            <span className="text-2xl">🎓</span>
          </div>
          <h3 className="text-xl font-bold mb-4">Teknik Eğitimler</h3>
          <p className="text-gray-400">Web, Mobil ve Yapay Zeka alanlarında güncel teknolojileri uygulamalı workshoplarla öğreniyoruz.</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-orange-500/50 transition-all group">
          <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
            <span className="text-2xl">🎮</span>
          </div>
          <h3 className="text-xl font-bold mb-4">Oyun Geliştirme</h3>
          <p className="text-gray-400">Unity ve C# kullanarak kendi oyunlarımızı tasarlıyor ve Sheriff Simulator gibi projeler geliştiriyoruz.</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-red-600/50 transition-all group">
          <div className="w-12 h-12 bg-red-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
            <span className="text-2xl">🤝</span>
          </div>
          <h3 className="text-xl font-bold mb-4">Network & Kariyer</h3>
          <p className="text-gray-400">Huawei uzmanlarıyla tanışma fırsatı yakalıyor ve sektördeki profesyonellerle bir araya geliyoruz.</p>
        </div>
      </section>

    </main>
  );
}