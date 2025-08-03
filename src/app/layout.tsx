// src/app/layout.tsx


import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ProviderWrapper from '@/lib/redux/ProviderWrapper';
import { Toaster } from 'react-hot-toast'; // ✅ Import Toaster

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your Site Title',
  description: 'Your site description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderWrapper>
          <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Add this line */}
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
