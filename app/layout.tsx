import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const jakarta = localFont({ src: '../public/fonts/PlusJakartaSans-Variable.ttf', variable: '--font-jakarta', display: 'swap' });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: 'Rina — Where connection comes alive',
  description: 'Meet Rina: live video, voice rooms, social discovery and a creator economy in one connected experience. Explore the product, development progress and investment opportunity.',
  icons: { icon: '/icon.svg' },
  openGraph: { title: 'Rina — Where connection comes alive', description: 'A social entertainment platform built around creators, community and shared experiences.', type: 'website', ...(siteUrl ? { images: [{ url: '/social-card.png', width: 1200, height: 630, alt: 'Rina — Where connection comes alive' }] } : {}) },
  twitter: { card: 'summary_large_image' },
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={jakarta.variable}>{children}</body></html>;
}
