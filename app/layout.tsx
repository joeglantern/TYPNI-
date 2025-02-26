import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import ClientLayout from './client-layout'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'YPNI - Young Peoples\' Network International',
  description: 'A global network empowering young people to create positive change through collaboration, leadership, and community action.',
  keywords: ['youth empowerment', 'leadership', 'community action', 'education', 'social change'],
  authors: [{ name: 'YPNI Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ypni.org',
    title: 'YPNI - Young Peoples\' Network International',
    description: 'A global network empowering young people to create positive change through collaboration, leadership, and community action.',
    siteName: 'YPNI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YPNI - Young Peoples\' Network International',
    description: 'A global network empowering young people to create positive change through collaboration, leadership, and community action.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
            <div className="container flex items-center justify-between h-16">
              <div className="flex-1" />
              <ThemeToggle />
            </div>
          </header>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}