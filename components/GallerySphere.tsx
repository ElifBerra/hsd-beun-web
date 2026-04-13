"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useMemo, useEffect } from "react";

const GallerySphere = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | any>(null);
  const [isMounted, setIsMounted] = useState(false); // Hydration hatası için
  const [dbPhotos, setDbPhotos] = useState<any[]>([]); // DB'den gelen veriler
  
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothX = useSpring(rotateX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 60, damping: 20 });

  const TOTAL_PHOTOS = 250; // İstediğin 250 kare
  const SPHERE_RADIUS = 600;

  // 1. Veritabanından Verileri Çek ve Hydration Korumasını Aç
  useEffect(() => {
    setIsMounted(true);
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setDbPhotos(data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };
    fetchEvents();
  }, []);

  // 2. Küre Hesaplama (Sadece istemci tarafında ve veriler gelince)
  const spherePhotos = useMemo(() => {
    if (!isMounted) return [];

    const photosArray = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const goldenAngle = (2 - goldenRatio) * 360; 

    // DB'den veri gelmediyse boş kalmasın diye fallback (yedek) renkler
    const colors = ["from-orange-500", "from-blue-500", "from-red-600", "from-green-500", "from-purple-600"];

    for (let i = 0; i < TOTAL_PHOTOS; i++) {
      const y = 1 - (i / (TOTAL_PHOTOS - 1)) * 2; 
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      const lon = theta % 360;
      const lat = Math.asin(y) * (180 / Math.PI);

      // Veritabanındaki verileri sırayla döngüye sok (250 kareye tamamla)
      const dbItem = dbPhotos.length > 0 ? dbPhotos[i % dbPhotos.length] : null;

      photosArray.push({
        uniqueId: `sphere-item-${i}`,
        Title: dbItem ? dbItem.Title : "Yükleniyor...",
        Description: dbItem ? dbItem.Description : "HSD BEUN Etkinlikleri",
        ImagePath: dbItem ? dbItem.ImagePath : "",
        color: colors[i % colors.length], // DB'de renk yoksa rastgele ver
        lat,
        lon,
      });
    }
    return photosArray;
  }, [isMounted, dbPhotos]);

  const onDrag = (e: any, info: any) => {
    rotateY.set(rotateY.get() + info.delta.x * 0.15); 
    rotateX.set(rotateX.get() - info.delta.y * 0.15); 
  };

  // Hydration hatasını önlemek için mount olana kadar hiçbir şey gösterme
  if (!isMounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <section className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
      
      <div className="absolute inset-0 bg-gradient-to-b from-orange-600/5 to-transparent blur-3xl opacity-30 pointer-events-none" />

      <div className="absolute top-8 z-50 text-center pointer-events-none">
        <h2 className="text-5xl font-black italic text-white tracking-tighter uppercase mb-2">
          Anılarımız
        </h2>
        <p className="text-orange-500 font-bold tracking-widest text-sm">{TOTAL_PHOTOS} KARELİK HSD GİRDABI</p>
      </div>

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
            <div
              key={photo.uniqueId}
              className="absolute top-1/2 left-1/2" 
              style={{
                transform: `translate(-50%, -50%) rotateY(${photo.lon}deg) rotateX(${photo.lat}deg) translateZ(${SPHERE_RADIUS}px)`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden", 
              }}
            >
              <motion.div
                className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full border border-white/10 overflow-hidden bg-zinc-900 shadow-xl cursor-pointer relative"
                onClick={() => setSelectedPhoto(photo)}
                whileHover={{ 
                    scale: 1.2,
                    borderColor: "rgba(249, 115, 22, 0.8)",
                    boxShadow: "0 0 30px rgba(249, 115, 22, 0.5)",
                }}
              >
                {/* DB'den gelen görsel varsa onu göster, yoksa gradyan */}
                {photo.ImagePath ? (
                  <img src={photo.ImagePath} alt={photo.Title} className="w-full h-full object-cover z-0" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${photo.color} to-black opacity-60 z-10`} />
                )}
                
                <div className="w-full h-full flex items-center justify-center text-4xl select-none relative z-0">
                  {photo.ImagePath ? "" : "📷"}
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </motion.div>

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
              
              <div className="text-9xl mb-6 z-0">
                {selectedPhoto.ImagePath ? <img src={selectedPhoto.ImagePath} className="w-48 h-48 rounded-2xl object-cover" /> : "📷"}
              </div>
              
              <div className="text-center z-10 max-w-2xl">
                <span className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2 block">HSD BEUN ANISI</span>
                <h3 className="text-white font-bold text-4xl mb-4 italic tracking-tight">{selectedPhoto.Title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{selectedPhoto.Description}</p>
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