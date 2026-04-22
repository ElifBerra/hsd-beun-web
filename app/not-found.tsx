import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
      
      <h1 className="text-[20vw] font-black text-orange-600 leading-none opacity-10 absolute select-none italic">404</h1>
      
      <div className="relative z-10">
        <div className="w-24 h-1 bg-orange-600 mx-auto mb-8"></div>
        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter mb-4">
          ROTA DIŞINA <span className="text-orange-600">ÇIKILDI!</span> 🛰️
        </h2>
        <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.4em] mb-12">
          ARADIĞIN SAYFA BEUN KAMPÜSÜNDE BULUNAMADI.
        </p>
        
        <Link href="/" className="group relative px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-widest transition-all hover:bg-orange-600 hover:text-black">
          ANA SAYFAYA DÖN
          <span className="absolute -bottom-2 -right-2 w-full h-full border border-orange-600 -z-10 group-hover:bottom-0 group-hover:right-0 transition-all"></span>
        </Link>
      </div>
    </div>
  );
}