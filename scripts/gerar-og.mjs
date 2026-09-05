/**
 * Gera os cards de link (Open Graph) — a imagem que aparece quando alguém
 * cola o link no WhatsApp, Instagram, X ou LinkedIn.
 *
 *   app/opengraph-image.jpg          home
 *   public/og/produto-<slug>.jpg     uma por peça
 *   public/og/categoria-<slug>.jpg   uma por categoria
 *
 * O texto é convertido em vetor com opentype.js antes de ir para o SVG, então
 * o card sai na tipografia da marca sem depender de fonte instalada na
 * máquina nem do @vercel/og (que tem um bug de caminho no Windows no Next 14).
 *
 *   node scripts/gerar-og.mjs
 */
import sharp from 'sharp'
import opentype from 'opentype.js'
import { mkdir, readFile, stat } from 'node:fs/promises'

const L = 1200
const A = 630

const C = {
  papel: '#F0E8D6',
  papelAlto: '#F7F1E4',
  floresta: '#04211E',
  floresta2: '#01100F',
  ouro: '#C5B178',
  areia: '#F9DA85',
  muteEsc: '#A7BCB2',
}

const carregar = async (arquivo) =>
  opentype.parse((await readFile(`app/fontes-og/${arquivo}`)).buffer.slice(0))

const [DISPLAY, DISPLAY_IT, ROTULO] = await Promise.all([
  carregar('dm-serif-display.ttf'),
  carregar('dm-serif-display-italic.ttf'),
  carregar('oswald-var.ttf'),
])

/**
 * Serializa os comandos do glifo à mão. O `toPathData` do opentype 2.0.0
 * injeta `NaN` no meio do `d` em alguns glifos — o renderer para ali e o
 * caractere sai deformado.
 */
function paraD(comandos, casas = 2) {
  const n = (v) => Number(v.toFixed(casas))
  let d = ''
  for (const c of comandos) {
    switch (c.type) {
      case 'M':
        d += `M${n(c.x)} ${n(c.y)}`
        break
      case 'L':
        d += `L${n(c.x)} ${n(c.y)}`
        break
      case 'C':
        d += `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`
        break
      case 'Q':
        d += `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`
        break
      case 'Z':
        d += 'Z'
        break
    }
  }
  return d
}

/** Largura de um texto já contando o tracking manual. */
function largura(fonte, texto, tamanho, tracking = 0) {
  return (
    fonte.getAdvanceWidth(texto, tamanho) +
    tracking * Math.max(texto.length - 1, 0)
  )
}

/**
 * Texto em <path>. O tracking é aplicado glifo a glifo porque o opentype não
 * conhece letter-spacing. `peso` engrossa o traço para imitar o Oswald 500 —
 * a fonte variável só entrega a instância padrão (400).
 *
 * Cada glifo é desenhado na origem e posicionado por `transform`, para que
 * a posição fracionária no texto nunca entre nas coordenadas do path.
 */
function texto(fonte, conteudo, { x, y, tamanho, cor, tracking = 0, peso = 0 }) {
  let cursor = 0
  const glifos = []
  for (const glifo of [...conteudo]) {
    const d = paraD(fonte.getPath(glifo, 0, 0, tamanho).commands)
    if (d) {
      glifos.push(`<path d="${d}" transform="translate(${cursor.toFixed(2)} 0)"/>`)
    }
    cursor += fonte.getAdvanceWidth(glifo, tamanho) + tracking
  }
  const traco = peso
    ? ` stroke="${cor}" stroke-width="${peso}" stroke-linejoin="round"`
    : ''
  return `<g transform="translate(${x.toFixed(2)} ${y.toFixed(2)})" fill="${cor}"${traco}>${glifos.join('')}</g>`
}

const rotulo = (conteudo, opcoes) =>
  texto(ROTULO, conteudo.toUpperCase(), {
    tracking: (opcoes.tamanho ?? 22) * 0.15,
    peso: 0.9,
    ...opcoes,
  })

/** Quebra em linhas que caibam em `limite`. */
function quebrar(fonte, conteudo, tamanho, limite) {
  const linhas = []
  let atual = ''
  for (const palavra of conteudo.split(' ')) {
    const teste = atual ? `${atual} ${palavra}` : palavra
    if (largura(fonte, teste, tamanho) > limite && atual) {
      linhas.push(atual)
      atual = palavra
    } else {
      atual = teste
    }
  }
  if (atual) linhas.push(atual)
  return linhas
}

const svg = (corpo) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${A}">${corpo}</svg>`,
  )

async function gravar(base, camadas, destino) {
  await sharp(base)
    .composite(camadas)
    .jpeg({ quality: 84, chromaSubsampling: '4:4:4' })
    .toFile(destino)
  const { size } = await stat(destino)
  console.log(`OK ${destino} (${(size / 1024).toFixed(0)} kB)`)
}

const brasao = (tamanho) =>
  sharp('public/marca/brasao-ouro.webp').resize({ width: tamanho }).png().toBuffer()

/** Reduz a opacidade de um PNG mexendo direto no canal alfa. */
async function comOpacidade(png, alfa) {
  const { data, info } = await sharp(png)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  for (let i = 3; i < data.length; i += 4) data[i] = Math.round(data[i] * alfa)
  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer()
}

const fundo = (cor) => ({
  create: { width: L, height: A, channels: 4, background: cor },
})

/* ── card da home ─────────────────────────────────────────────────────── */

async function cardHome() {
  const base = await sharp('app/og/hero.jpg').resize(L, A, { fit: 'cover' }).toBuffer()

  const veu = svg(`
    <defs>
      <linearGradient id="v" x1="0" y1="0" x2="1" y2="0.15">
        <stop offset="0%" stop-color="${C.floresta}" stop-opacity=".95"/>
        <stop offset="34%" stop-color="${C.floresta}" stop-opacity=".86"/>
        <stop offset="66%" stop-color="${C.floresta}" stop-opacity=".5"/>
        <stop offset="100%" stop-color="${C.floresta}" stop-opacity=".18"/>
      </linearGradient>
    </defs>
    <rect width="${L}" height="${A}" fill="url(#v)"/>`)

  const x = 76
  const tam = 88
  const primeira = 'Vista o '
  const fim = largura(DISPLAY, primeira, tam)

  const camada = svg(
    [
      rotulo('A loja oficial da Jitshouse', { x, y: 300, tamanho: 23, cor: C.ouro }),
      texto(DISPLAY, primeira, { x, y: 400, tamanho: tam, cor: C.papel }),
      texto(DISPLAY_IT, 'lifestyle.', { x: x + fim, y: 400, tamanho: tam, cor: C.areia }),
      rotulo('Kimonos · Vestuário · Acessórios', {
        x,
        y: 464,
        tamanho: 20,
        cor: C.muteEsc,
      }),
    ].join(''),
  )

  await gravar(
    base,
    [
      { input: veu },
      { input: await brasao(96), top: 130, left: x },
      { input: camada },
    ],
    'app/opengraph-image.jpg',
  )
}

/* ── card de produto ──────────────────────────────────────────────────── */

const precoBRL = (v) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

async function cardProduto(p, nomeCategoria) {
  const largFoto = 520
  const x = largFoto + 66
  const limite = L - x - 66

  const foto = await sharp('public' + p.imagem)
    .resize({ width: largFoto, height: A, fit: 'contain', background: C.papelAlto })
    .toBuffer()

  const linhas = quebrar(DISPLAY, p.nome, 52, limite).slice(0, 3)
  const corpo = [
    rotulo(nomeCategoria, { x, y: 168, tamanho: 20, cor: C.ouro }),
    ...linhas.map((linha, i) =>
      texto(DISPLAY, linha, { x, y: 236 + i * 60, tamanho: 52, cor: C.papel }),
    ),
    texto(DISPLAY, precoBRL(p.preco), {
      x,
      y: 236 + linhas.length * 60 + 62,
      tamanho: 62,
      cor: C.areia,
    }),
    rotulo('Jitshouse Loja', { x, y: 540, tamanho: 19, cor: C.muteEsc }),
  ].join('')

  await gravar(
    fundo(C.floresta),
    [
      { input: foto, top: 0, left: 0 },
      { input: svg(corpo) },
      { input: await brasao(58), top: 76, left: x },
    ],
    `public/og/produto-${p.slug}.jpg`,
  )
}

/* ── card de categoria ────────────────────────────────────────────────── */

async function cardCategoria(slug, nome, chamada, total) {
  const x = 76
  const linhas = quebrar(DISPLAY, nome, 84, 720)
  const corpo = [
    rotulo('Jitshouse Loja', { x, y: 300, tamanho: 22, cor: C.ouro }),
    ...linhas.map((linha, i) =>
      texto(DISPLAY, linha, { x, y: 392 + i * 92, tamanho: 84, cor: C.papel }),
    ),
    rotulo(`${total} ${total === 1 ? 'peça' : 'peças'} · ${chamada}`, {
      x,
      y: 392 + linhas.length * 92 + 22,
      tamanho: 19,
      cor: C.muteEsc,
    }),
  ].join('')

  await gravar(
    fundo(C.floresta),
    [
      { input: await comOpacidade(await brasao(420), 0.1), top: 105, left: 830 },
      { input: svg(corpo) },
      { input: await brasao(90), top: 130, left: x },
    ],
    `public/og/categoria-${slug}.jpg`,
  )
}

/* ── execução ─────────────────────────────────────────────────────────── */

await mkdir('public/og', { recursive: true })

const produtos = JSON.parse(await readFile('data/produtos.json', 'utf8'))
const CATEGORIAS = {
  kimonos: ['Kimonos & faixas', 'O uniforme do trabalho diário.'],
  vestuario: ['Vestuário lifestyle', 'O que a gente veste fora do tatame.'],
  acessorios: ['Acessórios', 'Detalhes de quem vive entre o mar e o mate.'],
}

await cardHome()

for (const p of produtos) {
  if (!p.imagem) continue
  await cardProduto(p, CATEGORIAS[p.categoria][0])
}

for (const [slug, [nome, chamada]] of Object.entries(CATEGORIAS)) {
  const total = produtos.filter((p) => p.categoria === slug).length
  await cardCategoria(slug, nome, chamada, total)
}
