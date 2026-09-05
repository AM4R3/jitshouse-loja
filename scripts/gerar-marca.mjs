/**
 * Gera OG image e favicons a partir do brasão da marca — o mesmo asset do
 * site principal (public/marca/brasao-ouro.webp). Nenhuma imagem externa
 * entra aqui.
 *
 *   node scripts/gerar-marca.mjs
 */
import sharp from 'sharp'
import { stat } from 'node:fs/promises'

const FLORESTA = { r: 0x04, g: 0x21, b: 0x1e, alpha: 1 }

async function sobreFloresta(largura, altura, tamanhoBrasao, destino, paleta) {
  const brasao = await sharp('public/marca/brasao-ouro.webp')
    .resize({ width: tamanhoBrasao })
    .png()
    .toBuffer()

  await sharp({
    create: { width: largura, height: altura, channels: 4, background: FLORESTA },
  })
    .composite([{ input: brasao, gravity: 'center' }])
    // Favicon entra no carregamento inicial: paleta reduzida para nao pesar.
    .png(paleta ? { palette: true, colours: 64, compressionLevel: 9 } : {})
    .toFile(destino)

  const { size } = await stat(destino)
  console.log('OK ' + destino + ' (' + (size / 1024).toFixed(0) + ' kB)')
}

// Open Graph / Twitter — 1200x630
await sobreFloresta(1200, 630, 400, 'app/opengraph-image.png')

// Favicons
await sobreFloresta(192, 192, 160, 'app/icon.png', true)
await sobreFloresta(180, 180, 150, 'app/apple-icon.png', true)
