'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Marca } from './Marca'
import { CARRINHO_ATUAL, SITE_IMERSOES } from '@/lib/contato'

const LINKS = [
  { href: '/categoria/kimonos', rotulo: 'Kimonos' },
  { href: '/categoria/vestuario', rotulo: 'Vestuário' },
  { href: '/categoria/acessorios', rotulo: 'Acessórios' },
]

const ELO =
  'font-rotulo text-[0.72rem] font-light uppercase tracking-[0.16em] text-tinta transition-colors duration-300 ease-marca hover:text-verde-rosa'

export default function Header() {
  const [aberto, setAberto] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b borda-sutil bg-papel/90 backdrop-blur-md">
      <div className="mx-auto flex h-[66px] max-w-conteudo items-center gap-6 px-5 md:px-10">
        <Link
          href="/"
          className="mr-auto flex items-center gap-2.5"
          onClick={() => setAberto(false)}
        >
          <Marca />
        </Link>

        <nav aria-label="Categorias" className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${ELO} border-b border-transparent pb-1 hover:border-ouro-dia`}
            >
              {l.rotulo}
            </Link>
          ))}
          <a
            href={SITE_IMERSOES}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ELO} border-b border-transparent pb-1 hover:border-ouro-dia`}
          >
            Imersões
          </a>
        </nav>

        <a
          href={CARRINHO_ATUAL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--solido btn--peq"
        >
          Carrinho
        </a>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          className="btn btn--linha btn--peq md:hidden"
        >
          {aberto ? 'Fechar' : 'Menu'}
        </button>
      </div>

      {aberto && (
        <nav
          id="menu-mobile"
          aria-label="Categorias"
          className="border-t borda-sutil bg-papel md:hidden"
        >
          <ul className="mx-auto max-w-conteudo px-5">
            {LINKS.map((l) => (
              <li key={l.href} className="border-b borda-sutil">
                <Link
                  href={l.href}
                  onClick={() => setAberto(false)}
                  className={`${ELO} block py-4`}
                >
                  {l.rotulo}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={SITE_IMERSOES}
                target="_blank"
                rel="noopener noreferrer"
                className={`${ELO} block py-4`}
              >
                Imersões ↗
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
