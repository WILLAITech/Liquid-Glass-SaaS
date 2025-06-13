import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LiquidAI - AI-Powered Liquid Glass UI Generator & Transformation Tool',
  description: 'Generate or transform any UI design into stunning liquid glass aesthetics using advanced AI technology. Export high-quality code instantly.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: { url: '/apple-touch-icon.png' },
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'LiquidAI - AI-Powered Liquid Glass UI Generator',
    description: 'Generate or transform any UI design into stunning liquid glass aesthetics using advanced AI technology.',
    url: 'https://www.liquidglassstyle.com',
    siteName: 'LiquidAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LiquidAI - Liquid Glass UI Generator',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LiquidAI - AI-Powered Liquid Glass UI Generator',
    description: 'Generate or transform any UI design into stunning liquid glass aesthetics using advanced AI technology.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        {children}
      </body>
    </html>
  );
}