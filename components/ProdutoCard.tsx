import Image from 'next/image'
import Link from 'next/link'
import Logo from './Logo'
import type { Produto } from '@/lib/loja'
import { parcelamento, precoBRL } from '@/lib/formato'

export default function ProdutoCard({
  produto,
  prioridade,
}: {
  produto: Produto
  prioridade?: boolean
}) {
  return (
    <Link
      href={`/produto/${produto.slug}`}
      className="group flex flex-col border borda-sutil bg-papel transition-colors duration-200 hover:border-ouro"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-papel-2">
        {produto.imagem ? (
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            priority={prioridade}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-opacity duration-300 group-hover:opacity-90"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Logo mascara decorativo className="w-1/2 text-tinta opacity-15" />
          </div>
        )}

        {produto.tag && (
          <span className="rotulo absolute left-0 top-0 bg-ouro px-3 py-1.5 text-tinta">
            {produto.tag}
          </span>
        )}
        {!produto.emEstoque && (
          <span className="rotulo absolute right-0 top-0 bg-tinta px-3 py-1.5 text-papel">
            Esgotado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="display text-xl text-tinta">{produto.nome}</h3>

        {produto.descricao && (
          <p className="line-clamp-2 text-sm leading-relaxed text-cinza">
            {produto.descricao}
          </p>
        )}

        <div className="mt-auto pt-3">
          <p className="flex items-baseline gap-2">
            {produto.precoDe && (
              <span className="text-sm text-cinza line-through">
                {precoBRL(produto.precoDe)}
              </span>
            )}
            <span className="font-sans text-base font-medium text-tinta">
              {precoBRL(produto.preco)}
            </span>
          </p>
          <p className="mt-1 text-xs text-cinza">
            ou {parcelamento(produto.preco)}
          </p>
        </div>
      </div>
    </Link>
  )
}
