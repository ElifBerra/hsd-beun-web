"use client";
import React, { useState, useEffect } from 'react';

const AboutSection = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch('/api/admin/about', { cache: 'no-store' });
        const data = await res.json();
        setSections(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Hakkımızda verisi çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Yardımcı fonksiyon: Veritabanındaki SectionKey'e göre doğru metni bulur
  const getSectionData = (key: string, defaultTitle: string, defaultDesc: string) => {
    const section = sections.find(s => s.SectionKey === key);
    return {
      title: section?.Title || defaultTitle,
      desc: section?.BodyText || defaultDesc
    };
  };

  // Kart yapılarını koruyoruz, sadece içerikleri fonksiyondan çekiyoruz
  const aboutCards = [
    {
      ...getSectionData("About", "Biz Kimiz?", "HSD BEUN Topluluğu içeriği yükleniyor..."),
      icon: "</>",
    },
    {
      ...getSectionData("Mission", "Misyonumuz", "Misyon içeriği yükleniyor..."),
      icon: "🎯",
    },
    {
      ...getSectionData("Vision", "Vizyonumuz", "Vizyon içeriği yükleniyor..."),
      icon: "👁️",
    },
    {
      ...getSectionData("Values", "Değerlerimiz", "Değerlerimiz içeriği yükleniyor..."),
      icon: "💎",
    }
  ];

  if (loading && sections.length === 0) return null;

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {aboutCards.map((card, index) => (
          <div key={index} className="bg-[#0a0a0a] border border-white/5 rounded-[40px] p-10 hover:bg-white/[0.08] transition-all group relative overflow-hidden shadow-lg">
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all">
              {card.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors">
              {card.title}
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;