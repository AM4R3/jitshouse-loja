/**
 * Gera OG image e favicons a partir do UNICO asset de marca permitido:
 * public/marca/logo.webp (baixado da loja atual).
 * O wordmark e chapado com alpha, entao pintamos ele em ouro-claro usando
 * o proprio alpha como mascara. Nenhuma imagem externa entra aqui.
 *
 *   node scripts/gerar-marca.mjs
 */
import sharp from 'sharp'

const TINTA = { r: 0x17, g: 0x14, b: 0x10, alpha: 1 }
const OURO_CLARO = { r: 0xd2, g: 0xac, b: 0x5c, alpha: 1 }

async function logoPintado(largura) {
  const logo = await sharp('public/marca/logo.webp')
    .resize({ width: largura })
    .png()
    .toBuffer()
  const { width, height } = await sharp(logo).metadata()

  return sharp({
    create: { width, height, channels: 4, background: OURO_CLARO },
  })
    .composite([{ input: logo, blend: 'dest-in' }])
    .png()
    .toBuffer()
}

async function tile(tamanho, larguraLogo, destino) {
  const logo = await logoPintado(larguraLogo)
  await sharp({
    create: {
      width: tamanho,
      height: tamanho,
      channels: 4,
      background: TINTA,
    },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(destino)
  console.log('OK ' + destino)
}

// Open Graph / Twitter — 1200x630
const og = await logoPintado(680)
await sharp({
  create: { width: 1200, height: 630, channels: 4, background: TINTA },
})
  .composite([{ input: og, gravity: 'center' }])
  .png()
  .toFile('app/opengraph-image.png')
console.log('OK app/opengraph-image.png')

await tile(512, 380, 'app/icon.png')
await tile(180, 132, 'app/apple-icon.png')
