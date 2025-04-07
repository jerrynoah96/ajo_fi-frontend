import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - AjoFi',
  description: 'AjoFi dashboard page',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 