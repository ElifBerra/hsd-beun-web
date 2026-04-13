import Link from 'next/link';

const Publications = ({ limit = 3 , showReadMore = true}) => {
  const posts = [
    {
      id: 1,
      title: "Yazılım Tasarım Desenleri: Singleton ve Loose Coupling",
      excerpt: "Unity projelerinde neden Singleton'dan kaçınmalıyız? Loose Coupling mimarisi üzerine bir inceleme.",
      date: "12 Mart 2026",
      link: "https://medium.com/@senin-kullanici-adin/yazi-linki",
      category: "Software Design"
    },
    {
      id: 2,
      title: "Neural Networks 101: Sinir Ağlarına Giriş",
      excerpt: "Yapay zekanın kalbi olan sinir ağları nasıl çalışır? Temel matematiksel modelleme.",
      date: "05 Nisan 2026",
      link: "https://medium.com/@senin-kullanici-adin/yazi-linki",
      category: "AI & Neural Networks"
    },
    {
      id: 3,
      title: "ScriptableObjects ile Event-Driven Architecture",
      excerpt: "Unity'de modüler kod yazmanın en temiz yolu: ScriptableObjects ve Event sistemleri.",
      date: "20 Şubat 2026",
      link: "https://medium.com/@senin-kullanici-adin/yazi-linki",
      category: "Game Dev"
    }
  ];

  return (
    <section className="max-w-6xl w-full px-4 py-24 border-t border-white/5">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent pr-4">
              YAYINLARIMIZ
         </h2>
          <p className="text-gray-400">Teknik ekibimizden güncel makaleler ve rehberler.</p>
        </div>
        {showReadMore && (
          <Link href="/publications" className="hidden md:block text-orange-500 hover:underline">
            Tümünü Oku →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.slice(0, limit).map((post) => (
          <a 
            key={post.id} 
            href={post.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white/5 border border-white/10 p-8 rounded-[32px] hover:border-orange-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">{post.category}</span>
              <h3 className="text-xl font-bold text-white mt-4 mb-3 group-hover:text-orange-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
            </div>
            <div className="text-gray-500 text-xs font-medium">
              {post.date} • Medium üzerinden oku
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Publications;