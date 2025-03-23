import './globals.css'
import type { Metadata } from 'next'
import { Outfit, Quicksand } from 'next/font/google'
import '../styles/globals.css'
import { ClientLayout } from '@/components/ClientLayout'

// Load Outfit for headings - a modern, friendly geometric font
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
})

// Load Quicksand for body text - rounded, friendly font
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'AjoFi',
  description: 'Blockchain-powered thrift and credit system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout outfit={outfit} quicksand={quicksand}>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
} 