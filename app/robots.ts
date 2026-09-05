import type { MetadataRoute } from 'next'

const URL_SITE =
  process.env.NEXT_PUBLIC_URL_SITE ?? 'https://jitshouse-loja.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${URL_SITE}/sitemap.xml`,
  }
}
