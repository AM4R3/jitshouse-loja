import Link from 'next/link'
import Logo from './Logo'
import {
  EMAIL,
  INSTAGRAM,
  INSTAGRAM_URL,
  LOJA_ATUAL,
  SITE_IMERSOES,
  WHATSAPP_EXIBICAO,
  linkWhatsApp,
} from '@/lib/contato'

export default function Footer() {
  return (
    <footer className="bg-tinta text-papel">
      <div className="mx-auto grid max-w-conteudo gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 md:py-24">
        <div>
          <Logo mascara className="h-6 w-auto max-w-[220px] text-ouro-claro" />
          <p className="display mt-6 max-w-xs text-2xl leading-snug text-papel">
            Viva o Jiu Jitsu.
            <br />
            <em className="text-ouro-claro">Viva o Lifestyle.</em>
          </p>
        </div>

        <nav aria-labelledby="rodape-loja">
          <h2 id="rodape-loja" className="rotulo text-ouro-claro">
            A loja
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-papel/70">
            <li>
              <Link href="/categoria/kimonos" className="hover:text-papel">
                Kimonos &amp; faixas
              </Link>
            </li>
            <li>
              <Link href="/categoria/vestuario" className="hover:text-papel">
                Vestuário lifestyle
              </Link>
            </li>
            <li>
              <Link href="/categoria/acessorios" className="hover:text-papel">
                Acessórios
              </Link>
            </li>
            <li>
              <a
                href={LOJA_ATUAL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-papel"
              >
                Meus pedidos ↗
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="rodape-jitshouse">
          <h2 id="rodape-jitshouse" className="rotulo text-ouro-claro">
            Jitshouse
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-papel/70">
            <li>
              <a
                href={SITE_IMERSOES}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-papel"
              >
                Imersões e hospedagem ↗
              </a>
            </li>
            <li>
              <a
                href={linkWhatsApp('Olá! Vim pela loja da Jitshouse.')}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-papel"
              >
                WhatsApp {WHATSAPP_EXIBICAO}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="break-all hover:text-papel">
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-papel"
              >
                @{INSTAGRAM}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-papel/15">
        <p className="mx-auto max-w-conteudo px-5 py-6 text-xs text-papel/50 md:px-10">
          © 2026 Jitshouse Lifestyle · Praia do Rosa, Imbituba — SC · Viva o Jiu
          Jitsu. Viva o Lifestyle.
        </p>
      </div>
    </footer>
  )
}
