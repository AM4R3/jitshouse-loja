import Image from 'next/image'
import Link from 'next/link'
import { Brasao } from './Marca'
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
      className="group flex flex-col border borda-sutil bg-papel-alto transition-colors duration-300 ease-marca hover:border-verde-rosa"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-floresta">
        {produto.imagem ? (
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            priority={prioridade}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-opacity duration-300 ease-marca group-hover:opacity-90"
          />
        ) : (
          <Brasao
            claro
            decorativo
            className="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
          />
        )}

        {produto.tag && (
          <span className="tag absolute left-0 top-0">{produto.tag}</span>
        )}
        {!produto.emEstoque && (
          <span className="tag tag--escura absolute right-0 top-0">
            Esgotado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="display text-[1.35rem]">{produto.nome}</h3>

        {produto.descricao && (
          <p className="line-clamp-2 text-sm leading-relaxed text-mute-papel">
            {produto.descricao}
          </p>
        )}

        <div className="mt-auto pt-3">
          <p className="flex items-baseline gap-2">
            {produto.precoDe && (
              <span className="font-rotulo text-sm font-light text-mute-papel line-through">
                {precoBRL(produto.precoDe)}
              </span>
            )}
            <span className="display text-[1.6rem] leading-none">
              {precoBRL(produto.preco)}
            </span>
          </p>
          <p className="rotulo rotulo--fino mt-2 text-mute-papel">
            {parcelamento(produto.preco, true)}
          </p>
        </div>
      </div>
    </Link>
  )
}
