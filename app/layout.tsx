import type { Metadata } from 'next'
import { DM_Serif_Display, Inter, Oswald } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

/* Mesmas três fontes do site principal (jitshouse.site). */
const display = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--fonte-display',
})

const rotulo = Oswald({
  subsets: ['latin'],
  weight: ['300', '500'],
  display: 'swap',
  variable: '--fonte-rotulo',
})

const corpo = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--fonte-corpo',
})

const URL_SITE =
  process.env.NEXT_PUBLIC_URL_SITE ?? 'https://jitshouse-loja.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITE),
  title: {
    default: 'Jitshouse Loja — Viva o Jiu Jitsu. Viva o Lifestyle.',
    template: '%s — Jitshouse Loja',
  },
  description:
    'A loja oficial da Jitshouse. Kimonos, faixas, vestuário e acessórios feitos na Praia do Rosa, Imbituba — SC.',
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
    siteName: 'Jitshouse Loja',
    title: 'Jitshouse Loja — Viva o Jiu Jitsu. Viva o Lifestyle.',
    description:
      'A loja oficial da Jitshouse. Kimonos, faixas, vestuário e acessórios da Praia do Rosa.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${rotulo.variable} ${corpo.variable}`}
    >
      <body>
        <a
          href="#conteudo"
          className="rotulo sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-floresta focus:px-5 focus:py-3 focus:text-papel"
        >
          Pular para o conteúdo
        </a>
        <div className="envelope flex min-h-screen flex-col">
          <Header />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
