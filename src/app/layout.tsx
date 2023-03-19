import { Analytics } from '@vercel/analytics/react';
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import './globals.css'

export const metadata = {
  title: 'Top Free Books: Trending Public Domain Books',
  description: 'Explore the data trends of the top 100 free public domain books based on download data from the Project Gutenberg website.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="m-auto p-2 md:p-4">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
