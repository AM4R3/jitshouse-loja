import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import ProdutoCard from '@/components/ProdutoCard'
import {
  CATEGORIAS,
  categoriaPorSlug,
  produtosDaCategoria,
} from '@/lib/loja'
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
    openGraph: { title: `${categoria.nome} — JitsHouse Loja`, description: descricao },
  }
}

export default function PaginaCategoria({ params }: Props) {
  const categoria = categoriaPorSlug(params.slug)
  if (!categoria) notFound()

  const lista = produtosDaCategoria(categoria.slug)
  const outras = CATEGORIAS.filter((c) => c.slug !== categoria.slug)

  return (
    <>
      <section className="relative overflow-hidden border-b borda-sutil bg-tinta">
        <Logo
          mascara
          decorativo
          className="pointer-events-none absolute left-1/2 top-1/2 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 text-ouro-claro opacity-[0.08] md:w-[90%]"
        />
        <div className="relative mx-auto max-w-conteudo px-5 py-20 md:px-10 md:py-28">
          <nav aria-label="Você está aqui" className="rotulo text-papel/50">
            <Link href="/" className="hover:text-papel">
              Loja
            </Link>
            <span aria-hidden> / </span>
            <span className="text-ouro-claro">{categoria.nome}</span>
          </nav>

          <h1 className="display mt-5 text-5xl text-papel md:text-6xl">
            {categoria.nome}
          </h1>
          <p className="mt-4 max-w-md text-papel/70">{categoria.chamada}</p>
          <p className="rotulo mt-8 text-ouro-claro">
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
          <p className="border border-dashed borda-sutil p-10 text-center text-cinza">
            Nenhuma peça cadastrada nesta categoria por enquanto.
          </p>
        )}
      </section>

      <section className="border-t borda-sutil bg-papel-2/60">
        <div className="mx-auto flex max-w-conteudo flex-col gap-8 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="sobrancelha">Continue navegando</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {outras.map((c) => (
                <Link
                  key={c.slug}
                  href={`/categoria/${c.slug}`}
                  className="display text-2xl text-tinta underline-offset-4 hover:underline md:text-3xl"
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
            className="botao-contorno shrink-0"
          >
            Ver as imersões
          </a>
        </div>
      </section>
    </>
  )
}
