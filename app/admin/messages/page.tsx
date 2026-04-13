"use client";
import { useEffect, useState } from 'react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages');
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setMessages([]); 
      }
    } catch (error) {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Bu mesajı silmek istediğine emin misin Turuncu?")) {
      await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
      fetchMessages();
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-4xl font-black italic tracking-tighter uppercase text-orange-500">Gelen Kutusu</h2>
        <p className="text-zinc-500 font-bold text-xs tracking-widest uppercase mt-2">İletişim Formu Başvuruları</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {messages.map((msg: any) => (
          <div key={msg.MessageID} className="bg-zinc-900/50 border border-white/5 p-6 rounded-[2rem] hover:border-orange-500/30 transition-all group relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-black tracking-tight uppercase">{msg.FullName}</h3>
                <p className="text-orange-500 text-xs font-bold italic">{msg.Email}</p>
                {/* Veritabanındaki Subject alanını da buraya ekledik! */}
                {msg.Subject && (
                  <p className="text-zinc-300 text-sm font-semibold mt-2 border-l-2 border-orange-500 pl-2">Konu: {msg.Subject}</p>
                )}
              </div>
              <button 
                onClick={() => handleDelete(msg.MessageID)}
                className="opacity-0 group-hover:opacity-100 p-2 bg-red-500/10 text-red-500 rounded-xl transition-all hover:bg-red-500 hover:text-white font-bold text-sm"
              >
                🗑️ Sil
              </button>
            </div>
            {/* Message yerine MessageBody, SentDate yerine SentAt kullandık */}
            <p className="text-zinc-400 text-sm leading-relaxed italic bg-black/30 p-4 rounded-2xl border border-white/[0.02]">
              "{msg.MessageBody}"
            </p>
            <div className="mt-4 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
              GÖNDERİM: {new Date(msg.SentAt).toLocaleString('tr-TR')}
            </div>
          </div>
        ))}
        
        {loading && <p className="text-orange-500 animate-pulse font-bold italic">Mesajlar yükleniyor...</p>}
        
        {messages.length === 0 && !loading && (
          <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
            <p className="text-zinc-700 font-black italic uppercase">Gelen kutun şu an bomboş.</p>
          </div>
        )}
      </div>
    </div>
  );
}