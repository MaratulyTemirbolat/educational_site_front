import './globals.css'
import { Inter } from 'next/font/google';
import Header from "@/components/Header/Header";
import Navigation from '@/components/Navigation/Navigation';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body  className={inter.className} style={{background: "#f0f2f5"}}>
        <header>
          <Header />
        </header>
        <main>
          {children}
        </main>
      </body>
      {/* <body className={inter.className}>{children}</body> */}
    </html>
  )
}
