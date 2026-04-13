import Link from 'next/link';

const Sponsors = () => {
  const sponsors = [
    { 
      id: 1, 
      name: "Huawei", 
      logo: "HUAWEI", 
      type: "Global Support", 
      website: "https://www.huawei.com",
      color: "group-hover:text-red-600" // Marka rengi dokunuşu
    },
    { 
      id: 2, 
      name: "Zonguldak Teknopark", 
      logo: "TEKNOPARK", 
      type: "Partner", 
      website: "https://zonguldakteknopark.com",
      color: "group-hover:text-blue-500"
    },
    { 
      id: 3, 
      name: "Monster Notebook", 
      logo: "MONSTER", 
      type: "Hardware Partner", 
      website: "https://www.monsternotebook.com.tr",
      color: "group-hover:text-green-500"
    },
  ];

  return (
    <section className="max-w-6xl w-full px-4 py-24 border-t border-white/10 bg-gradient-to-b from-transparent to-white/[0.02]">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-2 italic tracking-tight">
          Destekçilerimiz
        </h2>
        <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-16 md:gap-28">
        {sponsors.map((sponsor) => (
          <a 
            key={sponsor.id} 
            href={sponsor.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Logo Alanı - Opaklık %50'den %80'e çıktı, hoverda %100 */}
            <div className={`text-4xl font-black text-white/80 tracking-tighter transition-all duration-300 ${sponsor.color} group-hover:scale-110`}>
              {sponsor.logo}
            </div>
            
            {/* Alt Bilgi - Daha beyaz ve belirgin */}
            <span className="mt-4 text-xs font-bold text-gray-400 group-hover:text-orange-500 uppercase tracking-widest transition-colors">
              {sponsor.type}
            </span>

            {/* Ziyaret Et İkonu - Artık hep orada ama hoverda parlıyor */}
            <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-orange-500/0 group-hover:text-orange-500 transition-all">
              SİTEYE GİT <span className="text-sm">↗</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Sponsors;