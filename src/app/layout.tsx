import './globals.css'
import { Metadata } from 'next'
import { ClientLayout } from '@/components/ClientLayout'

export const metadata: Metadata = {
  title: 'AjoFi - Decentralized Savings Groups',
  description: 'Join trusted savings groups or create your own. Secure, transparent, and community-driven.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
} 