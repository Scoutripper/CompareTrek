import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Script from 'next/script'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Scoutripper - Your Ultimate Trekking Adventure Partner',
  description: 'Discover breathtaking treks, expert guides, and unforgettable adventures with Scoutripper. Book your next trek today!',
  keywords: 'trekking, hiking, adventure, outdoor activities, mountain climbing, nature exploration',
  authors: [{ name: 'Scoutripper Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Scoutripper - Your Ultimate Trekking Adventure Partner',
    description: 'Discover breathtaking treks, expert guides, and unforgettable adventures with Scoutripper.',
    url: 'https://scoutripper.com',
    siteName: 'Scoutripper',
    images: [
      {
        url: '/images/banners/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Scoutripper - Trekking Adventures',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scoutripper - Your Ultimate Trekking Adventure Partner',
    description: 'Discover breathtaking treks, expert guides, and unforgettable adventures with Scoutripper.',
    images: ['/images/banners/twitter-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
