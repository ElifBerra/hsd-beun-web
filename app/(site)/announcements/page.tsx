import Announcements from "@/components/Announcements";

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen bg-black pt-32 flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent italic">
          Haber Arşivi
        </h1>
        <p className="text-gray-400 mt-4">HSD BEUN topluluğundan tüm gelişmeler ve duyurular.</p>
      </div>
      
      {/* Burada tümünü gör butonunu gizliyoruz ve limiti artırıyoruz */}
      <Announcements limit={20} showAllButton={false} />
    </main>
  );
}