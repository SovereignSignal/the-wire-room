import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "The Wire Room",
  description:
    "Three beats. Real-time grants intelligence. Tracking grants, fellowships, and funding across Crypto, AI, and Open Source.",
  openGraph: {
    title: "The Wire Room",
    description:
      "Three beats. Real-time grants intelligence. Tracking grants, fellowships, and funding across Crypto, AI, and Open Source.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://the-wire-room-production.up.railway.app",
    siteName: "The Wire Room",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wire Room",
    description:
      "Three beats. Real-time grants intelligence. Tracking grants, fellowships, and funding across Crypto, AI, and Open Source.",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1a1a1a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
