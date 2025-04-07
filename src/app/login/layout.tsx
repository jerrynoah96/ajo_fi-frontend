import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - AjoFi',
  description: 'Login to your AjoFi account',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 