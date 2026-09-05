/**
 * Gera os assets estáticos de marca a partir do brasão e da foto do hero:
 *
 *   app/icon.png, app/apple-icon.png   favicons
 *   app/og/brasao.png                  brasão em ouro, p/ os cards de link
 *   app/og/hero.jpg                    foto do hero recortada em 1200x630
 *   app/og/produtos/<slug>.jpg         foto de cada peça p/ o card do produto
 *
 * Os cards de Open Graph em si são montados em app/**\/opengraph-image.tsx,
 * que compõem estes arquivos com o texto na tipografia da marca.
 *
 *   node scripts/gerar-marca.mjs
 */
import sharp from 'sharp'
import { mkdir, stat, readFile } from 'node:fs/promises'

const FLORESTA = { r: 0x04, g: 0x21, b: 0x1e, alpha: 1 }

async function tamanho(arquivo) {
  const { size } = await stat(arquivo)
  return (size / 1024).toFixed(0) + ' kB'
}

async function brasaoOuro(largura) {
  return sharp('public/marca/brasao-ouro.webp')
    .resize({ width: largura })
    .png()
    .toBuffer()
}

/**
 * Favicon: o mesmo selo de jitshouse.site, para as duas abas ficarem iguais.
 * O original tem 28x28 — o `app/icon.png` sai idêntico a ele, e o ícone de
 * iOS é o mesmo desenho ampliado sobre floresta (precisa ser opaco).
 */
const FAVICON = 'public/marca/favicon-institucional.png'

async function favicon(lado, destino, opaco) {
  let img = sharp(FAVICON).resize(lado, lado, { kernel: 'mitchell' })
  if (opaco) img = img.flatten({ background: FLORESTA })
  await img.png({ palette: true, colours: 128, compressionLevel: 9 }).toFile(destino)
  console.log(`OK ${destino} (${await tamanho(destino)})`)
}

await mkdir('app/og/produtos', { recursive: true })

await favicon(28, 'app/icon.png')
await favicon(180, 'app/apple-icon.png', true)

// Brasão solto, com fundo transparente, para os cards.
await sharp(await brasaoOuro(240)).png().toFile('app/og/brasao.png')
console.log(`OK app/og/brasao.png (${await tamanho('app/og/brasao.png')})`)

// Hero em 1200x630 — mesmo enquadramento do topo da home.
await sharp('public/marca/hero.webp')
  .resize({ width: 1200, height: 630, fit: 'cover', position: sharp.strategy.attention })
  .jpeg({ quality: 82 })
  .toFile('app/og/hero.jpg')
console.log(`OK app/og/hero.jpg (${await tamanho('app/og/hero.jpg')})`)

// Uma foto por peça, no formato do painel esquerdo do card de produto.
const produtos = JSON.parse(await readFile('data/produtos.json', 'utf8'))
for (const p of produtos) {
  if (!p.imagem) continue
  const destino = `app/og/produtos/${p.slug}.jpg`
  await sharp('public' + p.imagem)
    .resize({ width: 520, height: 630, fit: 'contain', background: '#F7F1E4' })
    .jpeg({ quality: 78 })
    .toFile(destino)
}
console.log(`OK app/og/produtos/ (${produtos.length} peças)`)
