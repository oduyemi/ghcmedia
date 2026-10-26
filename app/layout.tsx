import './globals.css'
import type { Metadata } from 'next'
import { Inter, Cormorant, Geist } from 'next/font/google'
import { Header } from '@/components/Header'
import { cn } from "@/lib/utils";
import Footer from '@/components/Footer';

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
        <Header />
        <div className="flex-1">
          {children}
        </div>

        <div className="relative z-10">
        <Footer />
      </div>
      </body>
    </html>
  )
} 