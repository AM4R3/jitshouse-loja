import produtosJson from '@/data/produtos.json'

export type Categoria = 'kimonos' | 'vestuario' | 'acessorios'

export type Produto = {
  slug: string
  nome: string
  preco: number
  precoDe: number | null
  descricao: string
  descricaoPendente: boolean
  imagem: string | null
  galeria: string[]
  categoria: Categoria
  emEstoque: boolean
  tag: string | null
  /** URL da peça na Shopify. `null` enquanto a loja nova não está no ar. */
  linkCompra: string | null
}

export const produtos = produtosJson as Produto[]

export const CATEGORIAS: {
  slug: Categoria
  nome: string
  chamada: string
}[] = [
  {
    slug: 'kimonos',
    nome: 'Kimonos & faixas',
    chamada: 'O uniforme do trabalho diário.',
  },
  {
    slug: 'vestuario',
    nome: 'Vestuário lifestyle',
    chamada: 'O que a gente veste fora do tatame.',
  },
  {
    slug: 'acessorios',
    nome: 'Acessórios',
    chamada: 'Detalhes de quem vive entre o mar e o mate.',
  },
]

export function produtoPorSlug(slug: string) {
  return produtos.find((p) => p.slug === slug)
}

export function produtosDaCategoria(slug: string) {
  return produtos.filter((p) => p.categoria === slug)
}

export function categoriaPorSlug(slug: string) {
  return CATEGORIAS.find((c) => c.slug === slug)
}

/** Capa de cada categoria: a foto do produto mais representativo do catálogo. */
export function capaDaCategoria(slug: Categoria) {
  const preferidos: Record<Categoria, string> = {
    kimonos: 'kimono-branco-jits-house',
    vestuario: 'camiseta-jiujitsu-house-lifestyle-preta',
    acessorios: 'oculos-jits-house-1',
  }
  const escolhido =
    produtoPorSlug(preferidos[slug]) ?? produtosDaCategoria(slug)[0]
  return escolhido?.imagem ?? null
}

/** Vitrine da home: um recorte com as três categorias representadas. */
export function destaques(quantidade = 8) {
  const ordem = ['kimonos', 'vestuario', 'acessorios'] as const
  const filas = ordem.map((c) => produtosDaCategoria(c))
  const saida: Produto[] = []
  let i = 0
  while (saida.length < quantidade && filas.some((f) => f[i] || f[i - 1])) {
    for (const fila of filas) {
      if (fila[i] && saida.length < quantidade) saida.push(fila[i])
    }
    i++
    if (i > 20) break
  }
  return saida
}

export function relacionados(produto: Produto, quantidade = 4) {
  const mesmaCategoria = produtos.filter(
    (p) => p.categoria === produto.categoria && p.slug !== produto.slug,
  )
  const resto = produtos.filter(
    (p) => p.categoria !== produto.categoria && p.slug !== produto.slug,
  )
  return [...mesmaCategoria, ...resto].slice(0, quantidade)
}
