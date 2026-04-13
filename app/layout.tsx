import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HSD BEUN',
  description: 'Huawei Student Developers Zonguldak Bülent Ecevit Üniversitesi',
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