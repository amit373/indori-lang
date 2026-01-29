import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = 'https://indori-lang.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'IndoriLang — Bhiya-Style Programming Language',
    template: '%s | IndoriLang',
  },
  description:
    'Write JavaScript with authentic Indori slang. A fun, expressive toy programming language that compiles to JavaScript. Try it in the browser, CLI, or VS Code.',
  keywords: [
    'IndoriLang',
    'Indori Lang',
    'programming language',
    'Indori',
    'JavaScript',
    'compiler',
    'transpiler',
    'toy language',
    '.il',
  ],
  authors: [{ name: 'IndoriLang Team', url: siteUrl }],
  creator: 'IndoriLang Team',
  publisher: 'IndoriLang Team',
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f59e0b' },
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'IndoriLang',
    title: 'IndoriLang — Bhiya-Style Programming Language',
    description: 'Write JavaScript with authentic Indori slang. Compiles to JavaScript. Playground, CLI, VS Code.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'IndoriLang — Programming language in Indori slang',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IndoriLang — Bhiya-Style Programming Language',
    description: 'Write JavaScript with authentic Indori slang. Compiles to JavaScript. Playground, CLI, VS Code.',
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
