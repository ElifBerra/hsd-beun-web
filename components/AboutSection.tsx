"use client";
import React, { useState, useEffect } from 'react';

const AboutSection = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // İkon eşleştirme tablosu (Opsiyonel: Key'e göre ikon atar, yoksa varsayılan verir)
  const iconMap: { [key: string]: string } = {
    about: "</>",
    mission: "🎯",
    vision: "👁️",
    values: "💎",
    default: "✨"
  };

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        // Cache'i devre dışı bırakıyoruz ki admin panelindeki değişim anında yansısın
        const res = await fetch('/api/admin/about', { cache: 'no-store' });
        const data = await res.json();
        
        // Gelen verinin array olduğundan emin oluyoruz
        setSections(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Hakkımızda verisi çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return null; // Yüklenirken hiçbir şey gösterme veya bir Skeleton ekle
  if (sections.length === 0) return null; // Veri yoksa bölümü gizle

  return (
    <section className="max-w-6xl w-full px-4 py-24 border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-4 bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent pr-4">
          HAKKIMIZDA 
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Geleceği kodlayan, inovasyonla büyüyen bir topluluğuz.
        </p>
      </div>

      {/* Dinamik Grid: Admin panelindeki satır sayısına göre kart üretir */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <div 
            key={section.SectionKey || index} 
            className="bg-[#0a0a0a] border border-white/5 rounded-[40px] p-10 hover:bg-white/[0.08] transition-all group relative overflow-hidden shadow-lg"
          >
            {/* İkon: SectionKey'e göre ikon seçer, bulamazsa default ikon koyar */}
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all">
              {iconMap[section.SectionKey?.toLowerCase()] || iconMap.default}
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors">
              {section.Title}
            </h3>
            
            <p className="text-gray-400 leading-relaxed text-sm">
              {section.BodyText}
            </p>

            {/* Tasarım detayı: Kartın arkasına hafif bir turuncu parlama */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-600/5 blur-[50px] group-hover:bg-orange-600/10 transition-all rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;