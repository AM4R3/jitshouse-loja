import type { Metadata } from 'next'
import { Instrument_Serif, Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--fonte-display',
})

const corpo = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--fonte-corpo',
})

const URL_SITE = process.env.NEXT_PUBLIC_URL_SITE ?? 'https://jitshouse-loja.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITE),
  title: {
    default: 'JitsHouse Loja — Viva o Jiu Jitsu. Viva o Lifestyle.',
    template: '%s — JitsHouse Loja',
  },
  description:
    'A loja oficial da Jitshouse Lifestyle. Kimonos, faixas, vestuário e acessórios feitos na Praia do Rosa, Imbituba — SC.',
  keywords: [
    'jiu jitsu',
    'kimono',
    'faixa',
    'Praia do Rosa',
    'Jitshouse',
    'lifestyle',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: URL_SITE,
    siteName: 'JitsHouse Loja',
    title: 'JitsHouse Loja — Viva o Jiu Jitsu. Viva o Lifestyle.',
    description:
      'A loja oficial da Jitshouse Lifestyle. Kimonos, faixas, vestuário e acessórios da Praia do Rosa.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${corpo.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#conteudo"
          className="rotulo sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-tinta focus:px-5 focus:py-3 focus:text-papel"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
