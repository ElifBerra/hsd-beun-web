export default function JoinPage() {
  return (
    <main className="min-h-screen bg-black pt-40 flex flex-col items-center px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent italic">
          HSD BEUN'a Katıl
        </h1>
        <p className="text-gray-400 text-xl mb-12 leading-relaxed">
          Geleceği birlikte kodlamak için ilk adımı atın. Başvuru formumuz çok yakında burada olacak!
        </p>
        
        {/* Sen formu atınca buraya yerleştireceğiz */}
        <div className="w-full aspect-video bg-white/5 border border-white/10 rounded-[40px] flex items-center justify-center border-dashed">
          <p className="text-orange-500 font-mono animate-pulse text-lg">
            {">"} Başvuru formu yükleniyor...
          </p>
        </div>
      </div>
    </main>
  );
}