"use client";
import { useState, useEffect } from 'react';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<string>("");

  useEffect(() => { fetchImages(); }, []);

  const fetchImages = async () => {
    const res = await fetch('/api/admin/gallery', { cache: 'no-store' });
    const data = await res.json();
    setImages(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFile(reader.result as string);
      reader.readAsDataURL(file); // Fotoğrafı Base64'e çeviriyoruz
    }
  };

  const uploadImage = async () => {
    if (!file || !title) return alert("Başlık ve resim seçmelisin!");
    await fetch('/api/admin/gallery', {
      method: 'POST',
      body: JSON.stringify({ title, imagePath: file }),
    });
    setFile(""); setTitle(""); fetchImages();
    alert("Anı küreye gönderildi!");
  };

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-black italic mb-8 uppercase">Anı Yönetimi</h1>
      
      <div className="bg-zinc-900 p-8 rounded-[2rem] border border-white/5 mb-12 max-w-2xl">
        <input 
          type="text" placeholder="Anı Başlığı (Örn: Huawei Ar-Ge Gezisi)" 
          className="w-full bg-black border border-white/10 p-4 rounded-xl mb-4 text-white"
          value={title} onChange={(e) => setTitle(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-6 block text-zinc-400" />
        <button onClick={uploadImage} className="w-full bg-orange-600 text-black font-black py-4 rounded-full uppercase hover:bg-orange-500 transition-all">
          Küreye Fırlat 🚀
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {images.map((img) => (
          <div key={img.ImageID} className="aspect-square rounded-2xl overflow-hidden border border-white/10">
            <img src={img.ImagePath} className="w-full h-full object-cover" alt={img.Title} />
          </div>
        ))}
      </div>
    </div>
  );
}