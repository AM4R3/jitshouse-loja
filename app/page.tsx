import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/Logo'
import ProdutoCard from '@/components/ProdutoCard'
import { CATEGORIAS, capaDaCategoria, destaques, produtosDaCategoria } from '@/lib/loja'
import { SITE_IMERSOES } from '@/lib/contato'

export default function Home() {
  const vitrine = destaques(8)

  return (
    <>
      {/* 1 — HERO */}
      <section className="relative overflow-hidden bg-tinta">
        <Logo
          mascara
          decorativo
          className="pointer-events-none absolute left-1/2 top-1/2 w-[190%] max-w-none -translate-x-1/2 -translate-y-1/2 text-ouro-claro opacity-[0.07] md:w-[120%]"
        />

        <div className="relative mx-auto flex max-w-conteudo flex-col items-center px-5 py-28 text-center md:px-10 md:py-40">
          <Logo
            mascara
            className="h-8 w-auto max-w-[260px] text-ouro-claro md:h-11 md:max-w-[360px]"
          />

          <p className="rotulo mt-8 text-ouro-claro">
            A loja oficial da Jitshouse Lifestyle
          </p>

          <h1 className="display mt-5 max-w-3xl text-[2.6rem] text-papel sm:text-6xl md:text-7xl">
            O tatame é só o começo.{' '}
            <em className="text-ouro-claro">Vista o lifestyle.</em>
          </h1>

          <Link href="#produtos" className="botao-ouro mt-10">
            Ver produtos
          </Link>
        </div>
      </section>

      {/* 2 — PRODUTOS EM DESTAQUE */}
      <section id="produtos" className="mx-auto max-w-conteudo px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b borda-sutil pb-6">
          <div>
            <p className="sobrancelha">Vitrine</p>
            <h2 className="display mt-2 text-4xl md:text-5xl">
              Peças <em>em destaque</em>
            </h2>
          </div>
          <Link
            href="/categoria/vestuario"
            className="rotulo text-cinza underline-offset-4 hover:text-tinta hover:underline"
          >
            Ver tudo
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vitrine.map((p, i) => (
            <ProdutoCard key={p.slug} produto={p} prioridade={i < 4} />
          ))}
        </div>
      </section>

      {/* 3 — CATEGORIAS */}
      <section className="border-t borda-sutil bg-papel-2/60">
        <div className="mx-auto max-w-conteudo px-5 py-20 md:px-10 md:py-28">
          <p className="sobrancelha">Navegue</p>
          <h2 className="display mt-2 text-4xl md:text-5xl">
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
                  className="group relative block overflow-hidden bg-tinta"
                >
                  <div className="relative aspect-[4/5]">
                    {capa ? (
                      <Image
                        src={capa}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-90"
                      />
                    ) : (
                      <Logo
                        mascara
                        decorativo
                        className="absolute left-1/2 top-1/2 w-2/3 -translate-x-1/2 -translate-y-1/2 text-ouro-claro opacity-15"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-tinta via-tinta/40 to-transparent" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="display text-3xl text-papel">{c.nome}</h3>
                    <p className="mt-1 text-sm text-papel/70">{c.chamada}</p>
                    <p className="rotulo mt-4 text-ouro-claro">
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
      <section className="bg-tinta">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center md:px-10 md:py-32">
          <p className="display text-3xl leading-snug text-papel sm:text-4xl md:text-5xl">
            Cada peça carrega o que a gente vive na casa:{' '}
            <em className="text-ouro-claro">disciplina, mar e comunidade.</em>
          </p>
          <p className="rotulo mt-10 text-ouro-claro">
            Viva o Jiu Jitsu. Viva o Lifestyle.
          </p>
        </div>
      </section>

      {/* 5 — CROSS-SELL IMERSÕES */}
      <section className="mx-auto max-w-conteudo px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-col items-start gap-8 border borda-sutil p-8 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <p className="sobrancelha">Imersões Jitshouse</p>
            <h2 className="display mt-3 max-w-xl text-3xl md:text-4xl">
              Quer viver a casa <em>de verdade?</em>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-cinza">
              Treino, mar e convivência na Praia do Rosa. As imersões e a
              hospedagem ficam no site da Jitshouse.
            </p>
          </div>
          <a
            href={SITE_IMERSOES}
            target="_blank"
            rel="noopener noreferrer"
            className="botao-contorno shrink-0"
          >
            Conhecer as imersões
          </a>
        </div>
      </section>
    </>
  )
}
