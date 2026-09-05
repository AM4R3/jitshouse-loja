import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Logo from '@/components/Logo'
import ProdutoCard from '@/components/ProdutoCard'
import { CATEGORIAS, produtoPorSlug, produtos, relacionados } from '@/lib/loja'
import { parcelamento, precoBRL } from '@/lib/formato'
import { linkWhatsApp } from '@/lib/contato'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return produtos.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const produto = produtoPorSlug(params.slug)
  if (!produto) return { title: 'Produto não encontrado' }

  const descricao =
    produto.descricao ||
    `${produto.nome} — Jitshouse Lifestyle, Praia do Rosa. ${precoBRL(produto.preco)}.`

  return {
    title: produto.nome,
    description: descricao,
    alternates: { canonical: `/produto/${produto.slug}` },
    openGraph: {
      title: `${produto.nome} — JitsHouse Loja`,
      description: descricao,
      images: produto.imagem ? [{ url: produto.imagem }] : undefined,
    },
  }
}

/* Selos informados pela propria loja atual — nao sao promessas nossas. */
const SELOS = [
  ['Receba em casa', 'Enviamos para todo o Brasil'],
  ['Parcele em até 12x', 'Com cartões de crédito'],
  ['Troca e devolução', '7 dias após o recebimento'],
]

export default function PaginaProduto({ params }: Props) {
  const produto = produtoPorSlug(params.slug)
  if (!produto) notFound()

  const categoria = CATEGORIAS.find((c) => c.slug === produto.categoria)
  const sugestoes = relacionados(produto, 4)
  const mensagem = `Olá! Tenho interesse em: ${produto.nome} (${precoBRL(produto.preco)}). Ainda está disponível?`

  const dadosEstruturados = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: produto.nome,
    description: produto.descricao || undefined,
    image: produto.galeria,
    brand: { '@type': 'Brand', name: 'Jitshouse Lifestyle' },
    offers: {
      '@type': 'Offer',
      price: produto.preco.toFixed(2),
      priceCurrency: 'BRL',
      availability: produto.emEstoque
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: produto.linkInfinitePay,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
      />

      <div className="mx-auto max-w-conteudo px-5 pb-24 pt-8 md:px-10 md:pb-32 md:pt-12">
        <nav aria-label="Você está aqui" className="rotulo text-cinza">
          <Link href="/" className="hover:text-tinta">
            Loja
          </Link>
          <span aria-hidden> / </span>
          <Link
            href={`/categoria/${produto.categoria}`}
            className="hover:text-tinta"
          >
            {categoria?.nome}
          </Link>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Galeria */}
          <div>
            <div className="relative aspect-[3/4] overflow-hidden bg-papel-2">
              {produto.imagem ? (
                <Image
                  src={produto.imagem}
                  alt={produto.nome}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              ) : (
                <Logo
                  mascara
                  decorativo
                  className="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 text-tinta opacity-15"
                />
              )}
              {produto.tag && (
                <span className="rotulo absolute left-0 top-0 bg-ouro px-3 py-1.5 text-tinta">
                  {produto.tag}
                </span>
              )}
            </div>

            {produto.galeria.length > 1 && (
              <ul className="mt-3 grid grid-cols-4 gap-3">
                {produto.galeria.slice(1, 5).map((src) => (
                  <li
                    key={src}
                    className="relative aspect-[3/4] overflow-hidden bg-papel-2"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="20vw"
                      className="object-contain"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Informacoes */}
          <div className="lg:pt-4">
            <p className="sobrancelha">{categoria?.nome}</p>
            <h1 className="display mt-3 text-4xl md:text-5xl">{produto.nome}</h1>

            <div className="mt-6 flex items-baseline gap-3">
              {produto.precoDe && (
                <span className="text-lg text-cinza line-through">
                  {precoBRL(produto.precoDe)}
                </span>
              )}
              <span className="font-sans text-3xl font-medium text-tinta">
                {precoBRL(produto.preco)}
              </span>
            </div>
            <p className="mt-1 text-sm text-cinza">
              ou {parcelamento(produto.preco)}
            </p>

            <div className="mt-8 border-t borda-sutil pt-8">
              {produto.descricao ? (
                <p className="max-w-prose leading-relaxed text-cinza">
                  {produto.descricao}
                </p>
              ) : (
                <p className="max-w-prose border border-dashed borda-sutil p-4 text-sm leading-relaxed text-cinza">
                  Descrição pendente — a loja atual não tem texto cadastrado
                  para esta peça.
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={produto.linkInfinitePay}
                target="_blank"
                rel="noopener noreferrer"
                className="botao-ouro flex-1"
              >
                Comprar
              </a>
              <a
                href={linkWhatsApp(mensagem)}
                target="_blank"
                rel="noopener noreferrer"
                className="botao-contorno flex-1"
              >
                Falar no WhatsApp
              </a>
            </div>

            <p className="mt-4 text-xs text-cinza">
              A compra é finalizada na loja oficial da Jitshouse, em uma nova
              aba.
            </p>

            <dl className="mt-10 grid gap-px border borda-sutil sm:grid-cols-3">
              {SELOS.map(([titulo, detalhe]) => (
                <div key={titulo} className="p-5">
                  <dt className="rotulo text-tinta">{titulo}</dt>
                  <dd className="mt-1.5 text-xs text-cinza">{detalhe}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Voce tambem pode gostar */}
        {sugestoes.length > 0 && (
          <section className="mt-24 border-t borda-sutil pt-12 md:mt-32">
            <h2 className="display text-3xl md:text-4xl">
              Você também pode <em>gostar</em>
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sugestoes.map((p) => (
                <ProdutoCard key={p.slug} produto={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* CTA sempre visivel no mobile */}
      <div className="sticky bottom-0 z-40 border-t borda-sutil bg-papel/95 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-4 px-5 py-3">
          <div className="min-w-0">
            <p className="truncate text-xs text-cinza">{produto.nome}</p>
            <p className="font-sans text-sm font-medium text-tinta">
              {precoBRL(produto.preco)}
            </p>
          </div>
          <a
            href={produto.linkInfinitePay}
            target="_blank"
            rel="noopener noreferrer"
            className="botao-ouro ml-auto shrink-0 px-6 py-3.5"
          >
            Comprar
          </a>
        </div>
      </div>
    </>
  )
}
