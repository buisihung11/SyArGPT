import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const title = "SyArGPT"
const description =
  "An AI Application that generates diagram from user system requirements"

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@hunghcc"
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [dark]
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
