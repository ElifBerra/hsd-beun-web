import Link from 'next/link';

const TeamPreview = () => {
  // İlk 3 veya 4 kişiyi ana sayfada gösterelim
  const leadMembers = [
    { id: 1, name: "Elif Berra", role: "HSD Campus Ambassador" },
    { id: 2, name: "Core Team", role: "Web & Mobile" },
    { id: 3, name: "Core Team", role: "Game Development" },
  ];

  return (
    <section className="max-w-6xl w-full px-4 py-24 border-t border-white/5">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-4 italic">Ekibimizle Tanışın</h2>
          <p className="text-gray-400 text-lg">
            HSD BEUN çatısı altında teknolojiyi tutkuya dönüştüren, sınırları zorlayan dinamik ekibimiz.
          </p>
        </div>
        <Link href="/team" className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">
          Tüm Ekibi Gör →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {leadMembers.map((member) => (
          <div key={member.id} className="relative aspect-square rounded-3xl overflow-hidden group bg-white/5 border border-white/10">
            {/* Arka planda hafif bir parlama efekti */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            
            <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 group-hover:scale-110 transition-transform">
              👤
            </div>

            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-orange-500 font-medium text-sm uppercase tracking-wider">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamPreview;