import Image from 'next/image'
import Link from 'next/link'
import Emenda from '@/components/Emenda'
import { Brasao } from '@/components/Marca'
import ProdutoCard from '@/components/ProdutoCard'
import hero from '@/public/marca/hero.webp'
import {
  CATEGORIAS,
  capaDaCategoria,
  destaques,
  produtosDaCategoria,
} from '@/lib/loja'
import { SITE_IMERSOES } from '@/lib/contato'

export default function Home() {
  const vitrine = destaques(8)

  return (
    <>
      {/* 1 — HERO */}
      <section className="relative isolate flex h-[min(84vh,880px)] min-h-[560px] items-end overflow-hidden bg-floresta">
        <Image
          src={hero}
          alt="Camiseta preta da Jitshouse com o brasão nas costas, nas dunas da Praia do Rosa."
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="-z-20 object-cover object-[62%_28%]"
        />
        {/* Véu na floresta, mesma receita do site principal. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(100deg, rgba(4,33,30,.94) 0%, rgba(4,33,30,.82) 30%, rgba(4,33,30,.46) 60%, rgba(4,33,30,.14) 88%), linear-gradient(to top, rgba(4,33,30,.86) 0%, rgba(4,33,30,.6) 32%, rgba(4,33,30,.12) 68%, rgba(4,33,30,0) 88%)',
          }}
        />

        <Emenda cor="papel" posicao="base" altura={150} />

        <div className="relative mx-auto w-full max-w-conteudo px-5 pb-20 pt-28 md:px-10 md:pb-28 md:pt-40">
          <Brasao claro decorativo className="mb-7 w-[74px] md:w-[86px]" />

          <p className="rotulo mb-5 text-ouro">
            A loja oficial da Jitshouse
          </p>

          <h1 className="display display--claro max-w-[14ch] text-[clamp(2.8rem,8.5vw,6.5rem)]">
            Vista o <em>lifestyle.</em>
          </h1>

          <p className="mt-6 max-w-[46ch] text-[clamp(1rem,1.7vw,1.2rem)] text-papel/95">
            Kimonos, faixas e vestuário feitos na Praia do Rosa — as mesmas
            peças que a gente usa dentro e fora da casa.
          </p>

          <Link href="#produtos" className="btn btn--ouro mt-9">
            Ver produtos
          </Link>
        </div>
      </section>

      {/* 2 — PRODUTOS EM DESTAQUE */}
      <section
        id="produtos"
        className="mx-auto max-w-conteudo px-5 py-20 md:px-10 md:py-28"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 border-b borda-sutil pb-6">
          <div>
            <p className="sobrancelha">Vitrine</p>
            <h2 className="display mt-3 text-[clamp(2rem,5vw,3.5rem)]">
              Peças <em>em destaque</em>
            </h2>
          </div>
          <Link
            href="/categoria/vestuario"
            className="rotulo rotulo--fino border-b border-ouro-dia/50 pb-0.5 text-verde-rosa transition-colors duration-300 ease-marca hover:border-ouro-dia"
          >
            Ver tudo
          </Link>
        </div>

        {/* Sem `prioridade`: a foto do hero e o unico LCP da home e nao pode
            dividir banda com a vitrine, que fica abaixo da dobra. */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vitrine.map((p) => (
            <ProdutoCard key={p.slug} produto={p} />
          ))}
        </div>
      </section>

      {/* 3 — CATEGORIAS */}
      <section className="relative bg-papel-alto">
        <Emenda cor="papel" altura={120} />
        <Emenda cor="papel" posicao="base" altura={120} />
        <div className="relative mx-auto max-w-conteudo px-5 py-20 md:px-10 md:py-28">
          <p className="sobrancelha">Navegue</p>
          <h2 className="display mt-3 text-[clamp(2rem,5vw,3.5rem)]">
            Três frentes, <em>uma casa só</em>
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CATEGORIAS.map((c) => {
              const capa = capaDaCategoria(c.slug)
              const total = produtosDaCategoria(c.slug).length
              return (
                <Link
                  key={c.slug}
                  href={`/categoria/${c.slug}`}
                  className="group relative block overflow-hidden bg-floresta"
                >
                  <div className="relative aspect-[4/5]">
                    {capa ? (
                      <Image
                        src={capa}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover opacity-70 transition-opacity duration-300 ease-marca group-hover:opacity-90"
                      />
                    ) : (
                      <Brasao
                        claro
                        decorativo
                        className="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40"
                      />
                    )}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(4,33,30,.95) 0%, rgba(4,33,30,.55) 45%, rgba(4,33,30,.05) 100%)',
                      }}
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="display display--claro text-[1.7rem]">
                      {c.nome}
                    </h3>
                    <p className="mt-1 text-sm text-mute-esc">{c.chamada}</p>
                    <p className="rotulo rotulo--fino mt-4 text-ouro">
                      {total} {total === 1 ? 'peça' : 'peças'} →
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4 — FAIXA MANIFESTO */}
      <section className="relative overflow-hidden bg-floresta">
        <Brasao
          claro
          decorativo
          className="pointer-events-none absolute -right-16 top-1/2 w-[320px] max-w-none -translate-y-1/2 opacity-[0.07] md:right-8 md:w-[420px]"
        />
        <Emenda cor="papel-alto" altura={140} />
        <Emenda cor="papel" posicao="base" altura={140} />

        <div className="relative mx-auto max-w-3xl px-5 py-32 text-center md:px-10 md:py-40">
          <p className="display display--claro text-[clamp(1.6rem,3.6vw,2.7rem)] leading-[1.24]">
            Cada peça carrega o que a gente vive na casa:{' '}
            <em>disciplina, mar e comunidade.</em>
          </p>
          <p className="rotulo mt-10 text-ouro">
            Viva o Jiu Jitsu. Viva o Lifestyle.
          </p>
        </div>
      </section>

      {/* 5 — CROSS-SELL IMERSÕES */}
      <section className="mx-auto max-w-conteudo px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-col items-start gap-8 border borda-sutil bg-papel-alto p-8 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <p className="sobrancelha">Imersões Jitshouse</p>
            <h2 className="display mt-3 max-w-xl text-[clamp(1.6rem,3.5vw,2.4rem)]">
              Quer viver a casa <em>de verdade?</em>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-mute-papel">
              Treino, mar e convivência na Praia do Rosa. As imersões e a
              hospedagem ficam no site da Jitshouse.
            </p>
          </div>
          <a
            href={SITE_IMERSOES}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--linha shrink-0"
          >
            Conhecer as imersões
          </a>
        </div>
      </section>
    </>
  )
}
