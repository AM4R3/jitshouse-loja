/**
 * Gera OG image e favicons a partir do brasão da marca — o mesmo asset do
 * site principal (public/marca/brasao-ouro.webp). Nenhuma imagem externa
 * entra aqui.
 *
 *   node scripts/gerar-marca.mjs
 */
import sharp from 'sharp'

const FLORESTA = { r: 0x04, g: 0x21, b: 0x1e, alpha: 1 }

async function sobreFloresta(largura, altura, tamanhoBrasao, destino) {
  const brasao = await sharp('public/marca/brasao-ouro.webp')
    .resize({ width: tamanhoBrasao })
    .png()
    .toBuffer()

  await sharp({
    create: { width: largura, height: altura, channels: 4, background: FLORESTA },
  })
    .composite([{ input: brasao, gravity: 'center' }])
    .png()
    .toFile(destino)

  console.log('OK ' + destino)
}

// Open Graph / Twitter — 1200x630
await sobreFloresta(1200, 630, 400, 'app/opengraph-image.png')

// Favicons
await sobreFloresta(512, 512, 424, 'app/icon.png')
await sobreFloresta(180, 180, 150, 'app/apple-icon.png')
