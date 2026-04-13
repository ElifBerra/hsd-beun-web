import Publications from "@/components/Publications";


export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-black pt-32 flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent italic">
          Blog & Yayınlar
        </h1>
      </div>
      <Publications limit={10} showReadMore={false} />
    </main>
  );
}