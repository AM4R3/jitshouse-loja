'use client'

import Link from 'next/link'
import { useState } from 'react'
import Logo from './Logo'
import { CARRINHO_ATUAL, SITE_IMERSOES } from '@/lib/contato'

const LINKS = [
  { href: '/categoria/kimonos', rotulo: 'Kimonos' },
  { href: '/categoria/vestuario', rotulo: 'Vestuário' },
  { href: '/categoria/acessorios', rotulo: 'Acessórios' },
]

export default function Header() {
  const [aberto, setAberto] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b borda-sutil bg-papel/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-conteudo items-center gap-6 px-5 py-4 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setAberto(false)}
        >
          <Logo priority className="h-5 w-auto md:h-6" />
          <span className="display hidden text-lg text-tinta sm:inline">
            Loja
          </span>
          <span className="sr-only">JitsHouse Loja — início</span>
        </Link>

        <nav
          aria-label="Categorias"
          className="ml-auto hidden items-center gap-8 md:flex"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rotulo text-cinza transition-colors hover:text-tinta"
            >
              {l.rotulo}
            </Link>
          ))}
          <a
            href={SITE_IMERSOES}
            target="_blank"
            rel="noopener noreferrer"
            className="rotulo text-cinza transition-colors hover:text-tinta"
          >
            Imersões
          </a>
        </nav>

        <a
          href={CARRINHO_ATUAL}
          target="_blank"
          rel="noopener noreferrer"
          className="rotulo ml-auto border border-tinta px-4 py-2.5 text-tinta transition-colors hover:bg-tinta hover:text-papel md:ml-0"
        >
          Carrinho
        </a>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          className="rotulo border border-tinta px-4 py-2.5 text-tinta transition-colors hover:bg-tinta hover:text-papel md:hidden"
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
          <ul className="mx-auto max-w-conteudo px-5 py-2">
            {LINKS.map((l) => (
              <li key={l.href} className="border-b borda-sutil last:border-0">
                <Link
                  href={l.href}
                  onClick={() => setAberto(false)}
                  className="rotulo block py-4 text-tinta"
                >
                  {l.rotulo}
                </Link>
              </li>
            ))}
            <li className="border-t borda-sutil">
              <a
                href={SITE_IMERSOES}
                target="_blank"
                rel="noopener noreferrer"
                className="rotulo block py-4 text-cinza"
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
