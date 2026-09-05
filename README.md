# JITSHOUSE Loja

E-commerce vitrine da **Jitshouse Lifestyle** (Praia do Rosa, Imbituba — SC).
Next.js 14 (App Router) + Tailwind, 100% estático.

Nesta primeira versão o catálogo é vitrine. **Nada aponta mais para a loja
antiga** (`loja.jitshouse.com.br`) — o checkout vai para a Shopify. Enquanto
ela não sobe, todo CTA de compra cai no WhatsApp, que é o canal de venda real
hoje.

Para ligar a Shopify: preencha `LOJA_SHOPIFY` em `lib/contato.ts` com a URL da
loja e, se houver link por peça, o campo `linkCompra` de cada item em
`data/produtos.json`. Os botões trocam de destino e de texto sozinhos.

## Deploy na Vercel — 3 comandos

```bash
npm i -g vercel && vercel link --yes
```

```bash
vercel env add NEXT_PUBLIC_URL_SITE production
```

```bash
vercel --prod
```

O segundo comando pede o valor: informe a URL final do site (ex.
`https://jitshouse-loja.vercel.app`). Ela alimenta o `metadataBase`, o
`sitemap.xml` e o `robots.txt`. Sem ela, o padrão é
`https://jitshouse-loja.vercel.app`.

Se o repositório estiver no GitHub, importar o projeto em vercel.com também
funciona sem configuração — os defaults do Next.js já são os corretos.

## Rodando local

```bash
npm install && npm run dev
```

## Estrutura

```
app/
  page.tsx                  home (hero, vitrine, categorias, manifesto, cross-sell)
  produto/[slug]/page.tsx   página de produto + "você também pode gostar"
  categoria/[slug]/page.tsx grid filtrado
  opengraph-image.png       OG 1200x630 gerada a partir do brasão
  icon.png / apple-icon.png favicons gerados a partir do brasão
components/                 Header, Footer, Marca, ProdutoCard
lib/
  loja.ts                   leitura do catálogo, categorias, relacionados
  formato.ts                preço e parcelamento
  contato.ts                WhatsApp, e-mail, Instagram, LOJA_SHOPIFY
data/produtos.json          catálogo (fonte única de verdade)
public/produtos/            fotos dos produtos (.webp)
public/marca/brasao-*.webp  brasão da marca (mesmo do site principal)
public/marca/hero.webp      foto do hero (catálogo da loja atual)
scripts/gerar-marca.mjs     regera OG image e favicons a partir do brasão
```

## Origem dos dados

Tudo em `data/produtos.json` e em `public/` foi extraído da loja atual
(`loja.jitshouse.com.br`), incluindo nomes, preços, descrições e fotos.
A única exceção é o **brasão da marca**, trazido do site principal para que
as duas peças falem a mesma língua visual. Onde falta foto adequada, o
layout usa fundo `--floresta` com o brasão em baixa opacidade.

### Como atualizar o catálogo

Edite `data/produtos.json` — a home, as categorias e as páginas de produto
saem todas dele. Campos por item:

| campo             | uso                                                        |
| ----------------- | ---------------------------------------------------------- |
| `slug`            | URL (`/produto/<slug>`)                                     |
| `nome`            | título                                                      |
| `preco`           | preço vigente (número)                                      |
| `precoDe`         | preço cheio riscado, ou `null`                              |
| `descricao`       | texto do card e da página                                   |
| `descricaoPendente` | `true` quando a loja atual não tem texto cadastrado       |
| `imagem`          | foto principal                                              |
| `galeria`         | foto principal + demais ângulos                             |
| `categoria`       | `kimonos` \| `vestuario` \| `acessorios`                    |
| `emEstoque`       | mostra o selo "Esgotado" quando `false`                     |
| `tag`             | etiqueta ouro no card (`"Oferta"` ou `null`)                |
| `linkCompra`      | URL da peça na Shopify; `null` cai no WhatsApp               |

Ao trocar o brasão, rode `node scripts/gerar-marca.mjs` para regerar OG image
e favicons.

## Identidade

Herdada de **jitshouse.site** — mesmos tokens, mesmas três fontes, mesmas
regras de botão. Mexeu lá, mexe aqui.

| token          | valor     | uso                                  |
| -------------- | --------- | ------------------------------------ |
| `--papel`      | `#F0E8D6` | fundo dominante                      |
| `--papel-alto` | `#F7F1E4` | cards e faixas de respiro            |
| `--floresta`   | `#04211E` | faixas escuras                       |
| `--floresta-2` | `#01100F` | rodapé                               |
| `--verde-rosa` | `#004030` | títulos e links                      |
| `--ouro`       | `#C5B178` | CTA e rótulos sobre a floresta       |
| `--areia`      | `#F9DA85` | itálico sobre a floresta             |
| `--ouro-dia`   | `#935C0E` | itálico e filetes sobre o papel      |
| `--tinta`      | `#1C2420` | corpo de texto                       |
| `--mute-papel` | `#4A554F` | secundário no papel                  |
| `--mute-esc`   | `#A7BCB2` | secundário na floresta               |

Fontes: **DM Serif Display** 400 (títulos e preços, palavras-chave em
itálico), **Oswald** 300/500 (rótulos, botões, nav, micro-informação),
**Inter** 400/500 (corpo, line-height 1.7). Cantos de 1px, nunca
arredondados. Grão de pôster sobre a página inteira (`body::after`,
opacidade .04, multiply), igual ao site principal.

A marca é o **brasão** (`public/marca/brasao-tinta.webp` e `-ouro.webp`,
os mesmos arquivos do site principal) com o lockup `JITSHOUSE / LOJA` em
Oswald — no site principal a segunda linha diz `LIFESTYLE`.

Todos os pares de cor usados passam 4,5:1: verde-rosa no papel 9,7:1,
ouro-dia no papel 4,6:1, ouro na floresta 8,0:1, areia na floresta 12,4:1.
