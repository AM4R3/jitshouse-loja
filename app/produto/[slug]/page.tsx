import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Brasao } from '@/components/Marca'
import ProdutoCard from '@/components/ProdutoCard'
import { CATEGORIAS, produtoPorSlug, produtos, relacionados } from '@/lib/loja'
import { parcelamento, precoBRL } from '@/lib/formato'
import { LOJA_SHOPIFY, linkWhatsApp } from '@/lib/contato'

type Props = { params: { slug: string } }

const URL_SITE =
  process.env.NEXT_PUBLIC_URL_SITE ?? 'https://jitshouse-loja.vercel.app'

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
      title: `${produto.nome} — Jitshouse Loja`,
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

  /* Shopify quando existir; até lá, o pedido fecha no WhatsApp. */
  const linkCompra = produto.linkCompra || LOJA_SHOPIFY || linkWhatsApp(mensagem)
  const compraNoWhatsApp = !produto.linkCompra && !LOJA_SHOPIFY

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
      url: `${URL_SITE}/produto/${produto.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
      />

      <div className="mx-auto max-w-conteudo px-5 pb-24 pt-8 md:px-10 md:pb-32 md:pt-12">
        <nav
          aria-label="Você está aqui"
          className="rotulo rotulo--fino text-mute-papel"
        >
          <Link href="/" className="hover:text-verde-rosa">
            Loja
          </Link>
          <span aria-hidden> / </span>
          <Link
            href={`/categoria/${produto.categoria}`}
            className="hover:text-verde-rosa"
          >
            {categoria?.nome}
          </Link>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Galeria */}
          <div>
            <div className="relative aspect-[3/4] overflow-hidden border borda-sutil bg-papel-alto">
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
                <Brasao
                  decorativo
                  className="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
                />
              )}
              {produto.tag && (
                <span className="tag absolute left-0 top-0">{produto.tag}</span>
              )}
            </div>

            {produto.galeria.length > 1 && (
              <ul className="mt-3 grid grid-cols-4 gap-3">
                {produto.galeria.slice(1, 5).map((src) => (
                  <li
                    key={src}
                    className="relative aspect-[3/4] overflow-hidden border borda-sutil bg-papel-alto"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 22vw, 12vw"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Informacoes */}
          <div className="lg:pt-4">
            <p className="sobrancelha">{categoria?.nome}</p>
            <h1 className="display mt-3 text-[clamp(2rem,4.6vw,3.2rem)]">
              {produto.nome}
            </h1>

            <div className="mt-7 flex items-baseline gap-3">
              {produto.precoDe && (
                <span className="font-rotulo text-lg font-light text-mute-papel line-through">
                  {precoBRL(produto.precoDe)}
                </span>
              )}
              <span className="display text-[clamp(2.1rem,5.2vw,3.1rem)] leading-[0.92]">
                {precoBRL(produto.preco)}
              </span>
            </div>
            <p className="rotulo rotulo--fino mt-3 text-mute-papel">
              ou {parcelamento(produto.preco)}
            </p>

            <div className="mt-8 border-t borda-sutil pt-8">
              {produto.descricao ? (
                <p className="max-w-prose leading-relaxed text-mute-papel">
                  {produto.descricao}
                </p>
              ) : (
                <p className="max-w-prose border border-dashed borda-sutil p-4 text-sm leading-relaxed text-mute-papel">
                  Descrição pendente — a loja atual não tem texto cadastrado
                  para esta peça.
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={linkCompra}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ouro flex-1"
              >
                {compraNoWhatsApp ? 'Comprar pelo WhatsApp' : 'Comprar'}
              </a>
              {!compraNoWhatsApp && (
                <a
                  href={linkWhatsApp(mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--linha flex-1"
                >
                  Falar no WhatsApp
                </a>
              )}
            </div>

            <p className="mt-4 text-xs text-mute-papel">
              {compraNoWhatsApp
                ? 'O pedido é fechado direto com a gente no WhatsApp: a gente confirma tamanho, frete e forma de pagamento.'
                : 'A compra é finalizada na loja da Jitshouse, em uma nova aba.'}
            </p>

            <dl className="mt-10 grid border borda-sutil bg-papel-alto sm:grid-cols-3">
              {SELOS.map(([titulo, detalhe]) => (
                <div key={titulo} className="p-5">
                  <dt className="rotulo text-verde-rosa">{titulo}</dt>
                  <dd className="mt-1.5 text-xs text-mute-papel">{detalhe}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Voce tambem pode gostar */}
        {sugestoes.length > 0 && (
          <section className="mt-24 border-t borda-sutil pt-12 md:mt-32">
            <h2 className="display text-[clamp(1.6rem,3.5vw,2.4rem)]">
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

      {/* CTA sempre visivel no mobile. Fundo opaco de proposito: com
          backdrop-blur aqui, a camada de grao (fixed + multiply) recompoe a
          tela inteira a cada quadro e o Speed Index desaba. */}
      <div className="sticky bottom-0 z-40 border-t borda-sutil bg-papel lg:hidden">
        <div className="flex items-center gap-4 px-5 py-3">
          <div className="min-w-0">
            <p className="truncate text-xs text-mute-papel">{produto.nome}</p>
            <p className="display text-xl leading-none">
              {precoBRL(produto.preco)}
            </p>
          </div>
          <a
            href={linkCompra}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ouro ml-auto shrink-0 px-6 py-3.5"
          >
            Comprar
          </a>
        </div>
      </div>
    </>
  )
}
