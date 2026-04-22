import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "HSD BEUN | Huawei Student Developers",
  description: "Zonguldak Bülent Ecevit Üniversitesi Huawei Student Developers Topluluğu resmi web sitesi. Geleceği birlikte kodluyoruz!",
  icons: {
    icon: "/favicon.ico", 
  },
  openGraph: {
    title: "HSD BEUN | Geleceği Kodluyoruz",
    description: "BEUN Huawei Student Developers topluluğuna katıl, etkinliklerden haberdar ol!",
    url: "https://hsd-beun.vercel.app", // Kendi domainini buraya yazarsın
    siteName: "HSD BEUN",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}