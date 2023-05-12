'use client'

import { ThemeProvider } from 'next-themes'

export default function ThemeLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return <ThemeProvider>{children}</ThemeProvider>
}