import type { MetadataRoute } from 'next'
import { CATEGORIAS, produtos } from '@/lib/loja'

const URL_SITE =
  process.env.NEXT_PUBLIC_URL_SITE ?? 'https://jitshouse-loja.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: URL_SITE, changeFrequency: 'weekly', priority: 1 },
    ...CATEGORIAS.map((c) => ({
      url: `${URL_SITE}/categoria/${c.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...produtos.map((p) => ({
      url: `${URL_SITE}/produto/${p.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
}
