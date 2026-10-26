import './globals.css'
import type { Metadata } from 'next'
import { Inter, Cormorant, Geist } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'] })
const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Nimmal Gallery',
  description: 'A collection of visual stories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.className} ${cormorant.className}`}>
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  )
} 