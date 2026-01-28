import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://indori-lang.netlify.app'),
  title: {
    default: 'IndoriLang — Bhiya-Style Programming Language',
    template: '%s | IndoriLang',
  },
  description: 'Write JavaScript with authentic Indori slang. A fun, expressive programming language that compiles to JavaScript.',
  keywords: ['IndoriLang', 'programming language', 'Indori', 'JavaScript', 'compiler', 'transpiler'],
  authors: [{ name: 'IndoriLang Team' }],
  creator: 'IndoriLang Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://indori-lang.netlify.app',
    siteName: 'IndoriLang',
    title: 'IndoriLang — Bhiya-Style Programming Language',
    description: 'Write JavaScript with authentic Indori slang.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'IndoriLang',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IndoriLang — Bhiya-Style Programming Language',
    description: 'Write JavaScript with authentic Indori slang.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'IndoriLang',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Any',
              description: 'A programming language in authentic Indori slang that compiles to JavaScript',
              url: 'https://indori-lang.netlify.app',
              author: {
                '@type': 'Organization',
                name: 'IndoriLang Team',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
