"use client";

import Events from "@/components/Events";
import Announcements from "@/components/Announcements";
import TeamPreview from "@/components/TeamPreview";
import ContactPreview from "@/components/ContactPreview";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  const scrollToEvents = () => {
    const element = document.getElementById('etkinlikler-bolumu');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center pt-32 selection:bg-orange-500 selection:text-white">
      
      {/* Hero Section */}
      <section className="text-center px-4 max-w-4xl flex flex-col items-center mb-24">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent leading-tight italic">
          Geleceği Birlikte Kodlayalım
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
          Zonguldak Bülent Ecevit Üniversitesi Huawei Student Developers topluluğu olarak, yenilikçi projeler üretiyoruz.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105">
            Topluluğa Katıl
          </button>
          {/* BUTON */}
          <button 
            onClick={scrollToEvents}
            className="border border-white/20 hover:border-white text-white px-8 py-4 rounded-full font-bold text-lg transition-all bg-white/5 backdrop-blur-sm"
          >
            Etkinlikleri Gör
          </button>
        </div>
      </section>

      <AboutSection />
      <Events showAllButton={true}/>
      <Announcements />
      <TeamPreview />
      <ContactPreview />

    </main>
  );
}