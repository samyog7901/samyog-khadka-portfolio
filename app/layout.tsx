import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Samyog Khadka | Full Stack Developer',
  description: 'BCA student and full-stack developer building practical projects. Explore my portfolio, projects, and skills.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/my-profile.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/my-profile.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/my-profile.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/my-profile.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
