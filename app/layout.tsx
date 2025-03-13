import './globals.css'
import type { Metadata } from 'next'
import type { Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import ClientLayout from './client-layout'
import GoatCounter from '@/components/GoatCounter'
import SearchParamsProvider from '@/components/SearchParamsProvider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://typni.org'),
  title: 'TYPNI - The Young Peoples\' Network International',
  description: 'A global network empowering young people to create positive change through collaboration, leadership, and community action.',
  keywords: ['youth empowerment', 'leadership', 'community action', 'education', 'social change'],
  authors: [{ name: 'TYPNI Team' }],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://typni.org',
    title: 'TYPNI - The Young Peoples\' Network International',
    description: 'A global network empowering young people to create positive change through collaboration, leadership, and community action.',
    siteName: 'TYPNI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TYPNI - The Young Peoples\' Network International',
    description: 'A global network empowering young people to create positive change through collaboration, leadership, and community action.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SearchParamsProvider>
            <ClientLayout>{children}</ClientLayout>
          </SearchParamsProvider>
          <GoatCounter />
        </ThemeProvider>
      </body>
    </html>
  )
}