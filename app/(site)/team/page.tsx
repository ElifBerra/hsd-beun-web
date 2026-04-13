import TeamCard from "@/components/TeamCard";

const teamMembers = [
  { id: 1, name: "Elif Berra", role: "HSD Campus Ambassador", linkedin: "#" },
  { id: 2, name: "Ekip Üyesi 1", role: "Core Team / Web Dev", linkedin: "#" },
  { id: 3, name: "Ekip Üyesi 2", role: "Core Team / Design", linkedin: "#" },
  { id: 4, name: "Ekip Üyesi 3", role: "Core Team / Game Dev", linkedin: "#" },
];

export default function EkipPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent italic">
            Ekibimiz
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            HSD BEUN'u büyüten, etkinlikleri organize eden ve teknoloji üreten o harika ekip.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} {...member} />
          ))}
        </div>
      </div>
    </main>
  );
}