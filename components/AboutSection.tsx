const AboutSection = () => {
  const aboutCards = [
    {
      title: "Biz Kimiz?",
      icon: "</>",
      desc: "HSD BEUN Topluluğu, Huawei tarafından desteklenen küresel bir üniversite topluluğu programının Zonguldak Bülent Ecevit Üniversitesi'ndeki yerel koludur."
    },
    {
      title: "Misyonumuz",
      icon: "🎯",
      desc: "Öğrencilere güncel teknolojiler konusunda uygulamalı deneyim kazandırmak ve geleceğin teknoloji liderlerini yetiştirmek."
    },
    {
      title: "Vizyonumuz",
      icon: "👁️",
      desc: "Huawei ekosistemi ve global teknoloji trendleriyle iç içe geçerek dünya genelinde rekabet edebilen yetkin bireyler yetiştirmek."
    },
    {
      title: "Değerlerimiz",
      icon: "💎",
      desc: "Sürekli öğrenme, topluluk odaklılık ve inovasyon. Her üyemize kariyer fırsatları ve teknik derinlik katıyoruz."
    }
  ];

  return (
    <section className="max-w-6xl w-full px-4 py-24 border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent pr-4">
              HAKKIMIZDA 
            </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Geleceği kodlayan, inovasyonla büyüyen bir topluluğuz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {aboutCards.map((card, index) => (
          <div key={index} className="bg-[#0a0a0a] border border-white/5 rounded-[40px] p-10 hover:bg-white/[0.08] transition-all group relative overflow-hidden shadow-lg">
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all">
              {card.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors">
              {card.title}
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;