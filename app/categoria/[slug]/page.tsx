import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Brasao } from '@/components/Marca'
import ProdutoCard from '@/components/ProdutoCard'
import { CATEGORIAS, categoriaPorSlug, produtosDaCategoria } from '@/lib/loja'
import { SITE_IMERSOES } from '@/lib/contato'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const categoria = categoriaPorSlug(params.slug)
  if (!categoria) return { title: 'Categoria não encontrada' }

  const descricao = `${categoria.nome} da Jitshouse Lifestyle — ${categoria.chamada}`

  return {
    title: categoria.nome,
    description: descricao,
    alternates: { canonical: `/categoria/${categoria.slug}` },
    openGraph: {
      title: `${categoria.nome} — Jitshouse Loja`,
      description: descricao,
    },
  }
}

export default function PaginaCategoria({ params }: Props) {
  const categoria = categoriaPorSlug(params.slug)
  if (!categoria) notFound()

  const lista = produtosDaCategoria(categoria.slug)
  const outras = CATEGORIAS.filter((c) => c.slug !== categoria.slug)

  return (
    <>
      <section className="relative overflow-hidden bg-floresta">
        <Brasao
          claro
          decorativo
          className="pointer-events-none absolute -right-10 top-1/2 w-[260px] max-w-none -translate-y-1/2 opacity-[0.09] md:right-10 md:w-[330px]"
        />
        <div className="relative mx-auto max-w-conteudo px-5 py-20 md:px-10 md:py-28">
          <nav
            aria-label="Você está aqui"
            className="rotulo rotulo--fino text-mute-esc"
          >
            <Link href="/" className="hover:text-papel">
              Loja
            </Link>
            <span aria-hidden> / </span>
            <span className="text-ouro">{categoria.nome}</span>
          </nav>

          <h1 className="display display--claro mt-5 text-[clamp(2.4rem,6vw,4rem)]">
            {categoria.nome}
          </h1>
          <p className="mt-4 max-w-md text-mute-esc">{categoria.chamada}</p>
          <p className="rotulo mt-8 text-ouro">
            {lista.length} {lista.length === 1 ? 'peça' : 'peças'}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-conteudo px-5 py-14 md:px-10 md:py-20">
        {lista.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {lista.map((p, i) => (
              <ProdutoCard key={p.slug} produto={p} prioridade={i < 4} />
            ))}
          </div>
        ) : (
          <p className="border border-dashed borda-sutil p-10 text-center text-mute-papel">
            Nenhuma peça cadastrada nesta categoria por enquanto.
          </p>
        )}
      </section>

      <section className="border-t borda-sutil bg-papel-alto">
        <div className="mx-auto flex max-w-conteudo flex-col gap-8 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="sobrancelha">Continue navegando</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {outras.map((c) => (
                <Link
                  key={c.slug}
                  href={`/categoria/${c.slug}`}
                  className="display text-[1.7rem] underline-offset-4 hover:underline md:text-[2rem]"
                >
                  {c.nome}
                </Link>
              ))}
            </div>
          </div>
          <a
            href={SITE_IMERSOES}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--linha shrink-0"
          >
            Ver as imersões
          </a>
        </div>
      </section>
    </>
  )
}
