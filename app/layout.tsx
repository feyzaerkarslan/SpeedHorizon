import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SpeedHorizon - Premium Motosiklet Satış',
  description: 'Premium motosiklet satış ve servis platformu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Navbar />
        <Toaster position="top-center" />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
