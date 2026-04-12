import ContactPreview from "@/components/ContactPreview";

export default function ContactPage() {
  return (
    
    <main className="min-h-screen bg-black pt-32 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto px-4">
        <ContactPreview />
      </div>
    </main>
  );
}