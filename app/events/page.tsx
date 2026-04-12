import Events from "@/components/Events";

export default function EtkinliklerPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent italic">
          Tüm Etkinliklerimiz
        </h1>
        <p className="text-gray-400 mb-12 max-w-2xl text-lg">
          HSD BEUN olarak bugüne kadar gerçekleştirdiğimiz ve gelecekte planladığımız tüm teknoloji buluşmaları burada.
        </p>
        
        {/* Daha önce oluşturduğumuz Events komponentini burada da çağırıyoruz */}
        <Events showAllButton={false} />
        
        {/* İleride buraya "Geçmiş Etkinlikler" diye ayrı bir bölüm de ekleyebiliriz */}
      </div>
    </main>
  );
}