import Link from 'next/link'
import Emenda from './Emenda'
import { Marca } from './Marca'
import {
  EMAIL,
  INSTAGRAM,
  INSTAGRAM_URL,
  SITE_IMERSOES,
  WHATSAPP_EXIBICAO,
  linkWhatsApp,
} from '@/lib/contato'

const ELO =
  'border-b border-ouro/35 pb-0.5 transition-colors duration-300 ease-marca hover:border-ouro'

export default function Footer() {
  return (
    <footer className="relative bg-floresta-2 text-papel">
      <Emenda cor="papel" altura={130} />

      <div className="relative mx-auto grid max-w-conteudo gap-12 px-5 py-24 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 md:py-28">
        <div>
          <div className="flex items-center gap-2.5">
            <Marca claro tamanho={46} legenda="Lifestyle" />
          </div>
          <p className="display display--claro mt-7 max-w-xs text-[1.9rem]">
            Viva o Jiu Jitsu.
            <br />
            <em>Viva o Lifestyle.</em>
          </p>
        </div>

        <nav aria-labelledby="rodape-loja">
          <h2 id="rodape-loja" className="rotulo text-ouro">
            A loja
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-mute-esc">
            <li>
              <Link href="/categoria/kimonos" className={ELO}>
                Kimonos &amp; faixas
              </Link>
            </li>
            <li>
              <Link href="/categoria/vestuario" className={ELO}>
                Vestuário lifestyle
              </Link>
            </li>
            <li>
              <Link href="/categoria/acessorios" className={ELO}>
                Acessórios
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="rodape-jitshouse">
          <h2 id="rodape-jitshouse" className="rotulo text-ouro">
            Jitshouse
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-mute-esc">
            <li>
              <a
                href={SITE_IMERSOES}
                target="_blank"
                rel="noopener noreferrer"
                className={ELO}
              >
                Imersões e hospedagem ↗
              </a>
            </li>
            <li>
              <a
                href={linkWhatsApp('Olá! Vim pela loja da Jitshouse.')}
                target="_blank"
                rel="noopener noreferrer"
                className={ELO}
              >
                WhatsApp {WHATSAPP_EXIBICAO}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className={`${ELO} break-all`}>
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={ELO}
              >
                @{INSTAGRAM}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t borda-clara">
        <p className="rotulo rotulo--fino mx-auto max-w-conteudo px-5 py-6 text-mute-esc md:px-10">
          © 2026 Jitshouse Lifestyle · Praia do Rosa, Imbituba — SC · Viva o Jiu
          Jitsu. Viva o Lifestyle.
        </p>
        <p className="mx-auto max-w-conteudo px-5 pb-6 text-mute-esc md:px-10">
          <a
            href="https://www.instagram.com/baruc.amare/"
            target="_blank"
            rel="noopener"
            className="site-credit"
          >
            feito por @baruc.amare
          </a>
        </p>
      </div>
    </footer>
  )
}
