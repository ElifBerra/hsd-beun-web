"use client";
import { useEffect, useState } from 'react';

export default function AllEventsPage() {
  const [events, setEvents] = useState([]);
  const today = new Date();

  useEffect(() => {
    fetch('/api/events').then(res => res.json()).then(data => setEvents(data));
  }, []);

  const upcoming = events.filter((e: any) => new Date(e.EventDate) >= today);
  const past = events.filter((e: any) => new Date(e.EventDate) < today);

  return (
    <div className="min-h-screen bg-black text-white pt-40 pb-20 px-6 font-sans">
      <div className="container mx-auto">
        
        {/* YAKLAŞANLAR */}
        <section className="mb-40">
          <div className="mb-16">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter italic uppercase leading-[0.8]">
              YAKLAŞAN <br /> <span className="text-orange-600">ETKİNLİKLER</span>
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] mt-8 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-orange-600"></span> Geleceği Birlikte Kodluyoruz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcoming.map((event: any) => <EventStyledCard key={event.EventID} event={event} />)}
          </div>
        </section>

        {/* GEÇMİŞTEKİLER */}
        <section>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase text-zinc-800 mb-12 flex items-center gap-6">
            ARŞİV <span className="h-[1px] flex-1 bg-zinc-900"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
            {past.map((event: any) => <EventStyledCard key={event.EventID} event={event} isPast />)}
          </div>
        </section>
        
      </div>
    </div>
  );
}

function EventStyledCard({ event, isPast }: { event: any, isPast?: boolean }) {
  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-[2.5rem] mb-6 border border-white/5 group-hover:border-orange-500/20 transition-all">
        <img src={event.CoverImagePath} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>
      <h3 className={`text-2xl font-black tracking-tighter uppercase leading-tight ${!isPast && 'group-hover:text-orange-500'} transition-colors`}>
        {event.Title}
      </h3>
      <div className="flex items-center gap-3 mt-4 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-600">
        <span className={!isPast ? "text-orange-500" : ""}>{new Date(event.EventDate).toLocaleDateString('tr-TR')}</span>
        <span>•</span>
        <span>{event.Location}</span>
      </div>
    </div>
  );
}