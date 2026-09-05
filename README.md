# JITSHOUSE Loja

E-commerce vitrine da **Jitshouse Lifestyle** (Praia do Rosa, Imbituba — SC).
Next.js 14 (App Router) + Tailwind, 100% estático.

Nesta primeira versão o catálogo é vitrine: o botão **Comprar** de cada peça
abre a página do produto na loja oficial atual (`loja.jitshouse.com.br`), onde
a compra é finalizada.

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
  opengraph-image.png       OG 1200x630 gerada a partir do logo
  icon.png / apple-icon.png favicons gerados a partir do logo
components/                 Header, Footer, Logo, ProdutoCard
lib/
  loja.ts                   leitura do catálogo, categorias, relacionados
  formato.ts                preço e parcelamento
  contato.ts                WhatsApp, e-mail, Instagram, links externos
data/produtos.json          catálogo (fonte única de verdade)
public/produtos/            fotos dos produtos (.webp)
public/marca/logo.webp      logo da loja
scripts/gerar-marca.mjs     regera OG image e favicons a partir do logo
```

## Origem dos dados

Tudo em `data/produtos.json` e em `public/` foi extraído da loja atual
(`loja.jitshouse.com.br`), incluindo nomes, preços, descrições e fotos.
**Nenhuma imagem de outra fonte entra no projeto.** Onde falta foto adequada,
o layout usa fundo sólido da paleta com o logo em baixa opacidade.

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
| `linkInfinitePay` | destino do botão Comprar                                    |

Ao trocar o logo, rode `node scripts/gerar-marca.mjs` para regerar OG image e
favicons.

## Identidade

| token          | valor     |
| -------------- | --------- |
| `--papel`      | `#F3EEE3` |
| `--papel-2`    | `#EAE2D2` |
| `--tinta`      | `#171410` |
| `--ouro`       | `#B9892F` |
| `--ouro-claro` | `#D2AC5C` |
| `--cinza`      | `#6E675C` |

Display: Instrument Serif 400, com palavras-chave em itálico dentro dos
títulos. Corpo: Inter. Botões e labels em caixa alta com `letter-spacing:
0.1em`. Sem `border-radius` em nenhum lugar (`tailwind.config.ts` zera o
token).

Duas decisões de contraste, para manter a paleta sem reprovar em
acessibilidade: o texto sobre ouro é **tinta** (5,8:1 — papel daria 2,7:1), e
as sobrancelhas de seção em fundo claro usam texto tinta com um filete ouro
(`.sobrancelha`), já que nenhum ouro da paleta passa 4,5:1 sobre o papel.
