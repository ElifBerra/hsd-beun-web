"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useMemo } from "react";

const GallerySphere = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Sürükleme eksenleri
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Pürüzsüz dönme (Spring) ayarları
  const smoothX = useSpring(rotateX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 60, damping: 20 });

  const basePhotos = [
    { id: 1, title: "Workshop 2026", color: "from-orange-500", desc: "Geleceğe yön veren teknolojileri tartıştığımız ilham verici bir atölye çalışması." },
    { id: 2, title: "Ekip Toplantısı", color: "from-red-600", desc: "HSD BEUN ekibinin yeni projeler ve etkinlikler için bir araya geldiği verimli bir toplantı." },
    { id: 3, title: "Huawei Cloud Day", color: "from-blue-500", desc: "Huawei Cloud teknolojilerini ve sunduğu çözümleri derinlemesine incelediğimiz bir eğitim günü." },
    { id: 4, title: "Teknopark Ziyareti", color: "from-green-500", desc: "Zonguldak Teknopark'taki yenilikçi girişimleri ve projeleri yerinde inceleme fırsatı bulduğumuz bir gezi." },
    { id: 5, title: "Sui 102 Eğitimi", color: "from-purple-600", desc: "Blockchain ve akıllı kontratlar konusunda bilgi edindiğimiz detaylı bir Sui 102 eğitimi." },
    { id: 6, title: "Dev Summit", color: "from-yellow-500", desc: "Yazılım geliştiricilerin bir araya gelerek son teknolojileri ve trendleri tartıştığı büyük bir etkinlik." },
    { id: 7, title: "HSD Turkey Summit", color: "from-pink-600", desc: "Türkiye genelindeki HSD ekiplerinin tecrübe paylaşımı ve ağ kurma fırsatı bulduğu ulusal bir zirve." },
    { id: 8, title: "ZBEÜ Lab", color: "from-cyan-600", desc: "Zonguldak Bülent Ecevit Üniversitesi'ndeki laboratuvarımızda gerçekleştirdiğimiz uygulama ve araştırma çalışmaları." },
  ];

  const TOTAL_PHOTOS = 200; 
  const SPHERE_RADIUS = 600; 

  // Fibonacci Küre Algoritması
  const spherePhotos = useMemo(() => {
    const photosArray = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const goldenAngle = 360 / (goldenRatio * goldenRatio); 

    for (let i = 0; i < TOTAL_PHOTOS; i++) {
      const y = 1 - (i / (TOTAL_PHOTOS - 1)) * 2; 
      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = goldenAngle * i;

      const randomBase = basePhotos[Math.floor(Math.random() * basePhotos.length)];

      photosArray.push({
        ...randomBase,
        uniqueId: `sphere-item-${i}`,
        lat,
        lon,
      });
    }
    return photosArray;
  }, []);

  const onDrag = (e: any, info: any) => {
    rotateY.set(rotateY.get() + info.delta.x * 0.15); 
    rotateX.set(rotateX.get() - info.delta.y * 0.15); 
  };

  return (
    <section className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
      
      {/* Arka Plan Parlaması */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-600/5 to-transparent blur-3xl opacity-30 pointer-events-none" />

      <div className="absolute top-8 z-50 text-center pointer-events-none">
        <h2 className="text-5xl font-black italic text-white tracking-tighter uppercase mb-2">
          Anılarımız
        </h2>
        <p className="text-orange-500 font-bold tracking-widest text-sm">250 KARELİK HSD GİRDABI</p>
      </div>

      {/* --- 3D KÜRE SAHNESİ --- */}
      <motion.div 
        ref={containerRef}
        drag
        onDrag={onDrag}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible perspective-[1500px]"
        style={{ touchAction: "none" }} 
      >
        <motion.div
          className="relative w-0 h-0"
          style={{
            rotateX: smoothX,
            rotateY: smoothY,
            transformStyle: "preserve-3d", 
          }}
        >
          {spherePhotos.map((photo) => (
            /* DIŞ KAPSAYICI (Yörüngeyi tutar, hareket etmez) */
            <div
              key={photo.uniqueId}
              className="absolute top-1/2 left-1/2" 
              style={{
                transform: `translate(-50%, -50%) rotateY(${photo.lon}deg) rotateX(${photo.lat}deg) translateZ(${SPHERE_RADIUS}px)`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden", 
              }}
            >
             
              {/* İÇ KART: Dairesel Tasarım (Yazısız) */}
              <motion.div
                className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full border border-white/10 overflow-hidden bg-zinc-900 shadow-xl cursor-pointer relative"
                onClick={() => setSelectedPhoto(photo)}
                whileHover={{ 
                    scale: 1.2, // Daire olduğu için biraz daha fazla büyüyebilir
                    borderColor: "rgba(249, 115, 22, 0.8)",
                    boxShadow: "0 0 30px rgba(249, 115, 22, 0.5)",
                }}
              >
                {/* Estetik Gradyan */}
                <div className={`absolute inset-0 bg-gradient-to-br ${photo.color} to-black opacity-60 group-hover:opacity-40 z-10 transition-opacity duration-300`} />
                
                {/* İkon / Görsel Placeholder */}
                <div className="w-full h-full flex items-center justify-center text-4xl select-none relative z-0">
                  📷
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* --- FOTOĞRAFA TIKLAYINCA BÜYÜYEN MODAL --- */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedPhoto(null)} 
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="relative max-w-5xl w-full aspect-[16/9] bg-zinc-900 border border-white/10 p-6 rounded-[32px] shadow-2xl cursor-default flex flex-col items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()} 
            >
              <button onClick={() => setSelectedPhoto(null)} className="absolute top-4 right-6 text-white/50 hover:text-white text-5xl transition-colors z-20">&times;</button>
              
              <div className="text-9xl mb-6 z-0">📷</div>
              
              <div className="text-center z-10 max-w-2xl">
                <span className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2 block">HSD BEUN GALERİ</span>
                <h3 className="text-white font-bold text-4xl mb-4 italic tracking-tight">{selectedPhoto.title}</h3>
                {/* Açıklama metni eklendi */}
                <p className="text-gray-400 text-lg leading-relaxed">{selectedPhoto.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default GallerySphere;