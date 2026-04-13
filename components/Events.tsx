"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Calendar, MapPin, ExternalLink } from 'lucide-react'; // İkonlar için

export default function Events() {
  const [upcoming, setUpcoming] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // Modal için seçili etkinlik
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        const today = new Date();
        const filtered = data
          .filter((event: any) => new Date(event.EventDate) >= today)
          .slice(0, 3);
        setUpcoming(filtered);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* BAŞLIK */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent pr-4">
              ETKİNLİKLERİMİZ 
            </h2>
          <div className="h-[2px] w-24 bg-orange-600 mx-auto mt-6"></div>
        </div>
        
        {/* KARTLAR */}
        <div className="flex flex-wrap justify-center gap-8">
          {loading ? (
             [1, 2, 3].map((i) => (
              <div key={i} className="w-full md:w-[400px] h-[550px] bg-zinc-900/50 animate-pulse rounded-[2.5rem]"></div>
            ))
          ) : (
            upcoming.map((event: any) => (
              <div 
                key={event.EventID} 
                onClick={() => setSelectedEvent(event)} // Tıklayınca modalı aç
                className="group relative w-full md:w-[400px] h-[550px] rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all duration-700 cursor-pointer shadow-2xl"
              >
                <img src={event.CoverImagePath} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

                <div className="absolute top-6 left-6">
                  <div className="bg-orange-600 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                    GELECEK ETKİNLİK
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 pt-20">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-white leading-none uppercase tracking-tighter italic">
                      {event.Title}
                    </h3>
                    <div className="flex items-center gap-4 text-zinc-400 font-bold text-xs uppercase tracking-widest">
                      <div className="flex items-center gap-1.5">
                        <span className="text-orange-500 text-sm">📅</span>
                        {new Date(event.EventDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long' })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* DETAY MODALI (POPUP) - ÖRNEĞE GÖRE GÜNCELLENDİ */}
{selectedEvent && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedEvent(null)}></div>
    
    <div className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-[3rem] shadow-2xl animate-in fade-in zoom-in duration-300">
      
      {/* ÜST GÖRSEL VE KAPATMA */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={selectedEvent.CoverImagePath} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent"></div>
        <button onClick={() => setSelectedEvent(null)} className="absolute top-6 right-6 bg-black/40 backdrop-blur-md p-2 rounded-full hover:bg-orange-600 transition-colors border border-white/10">
          <X size={20} className="text-white" />
        </button>
        
        {/* ÖRNEKTEKİ GİBİ SOL ÜST ETİKET */}
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-orange-600/20 backdrop-blur-md border border-orange-600/30 px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></div>
            <span className="text-orange-500 font-black text-[10px] uppercase tracking-widest">Gelecek Etkinlik</span>
        </div>
      </div>

      {/* İÇERİK BÖLÜMÜ */}
      <div className="px-8 pb-10 -mt-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-8 text-center md:text-left leading-tight">
          {selectedEvent.Title}
        </h2>

        {/* ÖRNEKTEKİ GİBİ KARTLI BİLGİ ALANI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                    <Calendar className="text-orange-500" size={24} />
                    <div>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Tarih</p>
                        <p className="text-white font-bold text-sm">{new Date(selectedEvent.EventDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                    <MapPin className="text-orange-500" size={24} />
                    <div>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Konum</p>
                        <p className="text-white font-bold text-sm truncate max-w-[150px]">{selectedEvent.Location || 'Online'}</p>
                    </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            </div>
        </div>

        {/* AÇIKLAMA */}
        <div className="mb-10 px-4 border-l-2 border-orange-600">
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed italic">
                {selectedEvent.Description}
            </p>
        </div>

        {/* KAYIT BUTONU */}
        <div className="px-4">
            {selectedEvent.RegistrationLink ? (
                <a 
                href={selectedEvent.RegistrationLink} 
                target="_blank" 
                className="w-full bg-orange-600 hover:bg-orange-500 text-black font-black py-5 rounded-2xl uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-600/20"
                >
                    ŞİMDİ KATIL <ExternalLink size={18} />
                </a>
            ) : (
                <button disabled className="w-full bg-zinc-900 text-zinc-600 font-black py-5 rounded-2xl uppercase tracking-widest cursor-not-allowed">
                    Kayıtlar Yakında
                </button>
            )}
        </div>
      </div>
    </div>
  </div>
)}
    </section>
  );
}