export default function JoinPage() {
  // Senin başvuru formu linkin
  const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSd4C_-puaaabnz41eXbVvKPFUkskYdkkoPQ6Z8mnRRItcLHRg/viewform?embedded=true";
  
  return (
    <main className="min-h-screen bg-black pt-40 flex flex-col items-center px-4 pb-32 relative overflow-hidden">
      {/* Arka plan dekoratif parlamalar */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full opacity-50"></div>

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* BAŞLIK: Sert, geçişli ve HSD ruhu taşıyan stil */}
        <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent italic uppercase tracking-tighter leading-none pr-4">
          HSD BEUN'a Katıl
        </h1>
        
        <p className="text-zinc-500 text-lg md:text-xl mb-16 leading-relaxed font-bold uppercase tracking-widest italic max-w-2xl mx-auto">
          Geleceği birlikte kodlamak için ilk adımı atın. <br className="hidden md:block" /> Ekibimize katılma fırsatını kaçırmayın!
        </p>
        
        {/* 2. YOL: PREMİUM KART TASARIMI */}
        <div className="relative w-full p-2 md:p-6 bg-zinc-900/40 border border-white/10 rounded-[50px] shadow-[0_0_80px_-15px_rgba(234,88,12,0.15)] backdrop-blur-sm">
          
          {/* SEVDİĞİN YANIP SÖNEN YAZI (Formun tam arkasında) */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <p className="text-orange-500 font-mono animate-pulse text-lg tracking-[0.2em] uppercase italic">
              {">"} Başvuru formu yükleniyor...
            </p>
          </div>

          {/* BEYAZ FORMU SARMALAYAN İÇ KUTU */}
          <div className="w-full bg-white rounded-[32px] md:rounded-[40px] overflow-hidden shadow-inner">
            <iframe 
              src={googleFormLink}
              className="w-full h-[850px] md:h-[1000px] border-none"
              title="HSD BEUN Başvuru Formu"
              loading="lazy"
            >
              Yükleniyor…
            </iframe>
          </div>

          {/* Kart üzerindeki estetik detaylar */}
          <div className="absolute -top-3 -right-3 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-black font-black text-xl shadow-lg">
            !
          </div>
        </div>

        {/* ALT ETİKET */}
        <div className="mt-16 opacity-40">
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-zinc-500 to-transparent mx-auto mb-6"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-500 italic">
                Huawei Student Developers ● Zonguldak Bulent Ecevit University
            </p>
        </div>
      </div>
    </main>
  );
}