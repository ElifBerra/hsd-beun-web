import Publications from "@/components/Publications";

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      {/* Başlık Alanı */}
      <div className="text-center mb-16 px-4">
        <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-4 bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent pr-4">
          Blog & Yayınlar
        </h1>
        <div className="h-1 w-24 bg-orange-600 mx-auto mt-6 opacity-50"></div>
      </div>

      {/* Yayınlar Bileşeni */}
      {/* Buradaki 'w-full' kartların dışarıya doğru yayılmasını sağlar */}
      <div className="w-full">
        <Publications limit={20} showReadMore={false} />
      </div>
    </main>
  );
}