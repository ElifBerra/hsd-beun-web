"use client";
import React, { useState, useEffect } from 'react';

const AboutSection = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // İkon kütüphanemiz: SectionKey'e göre eşleşir. 
  // Admin panelinde "Key" kısmına bunlardan birini yazarsan ikonu otomatik gelir.
  const icons: { [key: string]: string } = {
    about: "</>",
    mission: "🎯",
    vision: "👁️",
    values: "💎",
    tech: "💻",
    goal: "🚀",
    team: "🤝",
    default: "✨" // Eşleşme olmazsa bu görünecek
  };

  useEffect(() => {
    fetch('/api/admin/about', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSections(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || sections.length === 0) return null;

  return (
    <section className="max-w-6xl w-full px-4 py-24 border-t border-white/5">
      <div className="text-center mb-20">
        <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
          HAKKIMIZDA
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {sections.map((section) => (
          <div 
            key={section.SectionKey} 
            className="bg-zinc-950 border border-white/5 rounded-[45px] p-12 hover:border-orange-500/30 transition-all group relative"
          >
            {/* Dinamik İkon */}
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-orange-600 transition-all">
              {icons[section.SectionKey?.toLowerCase()] || icons.default}
            </div>

            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-orange-500 transition-colors uppercase italic tracking-tight">
              {section.Title}
            </h3>
            
            <p className="text-zinc-400 leading-relaxed text-sm font-medium">
              {section.BodyText}
            </p>

            {/* Süsleme: Arka plan parlaması */}
            <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-orange-600/5 blur-3xl rounded-full group-hover:bg-orange-600/10" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;