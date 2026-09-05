export const WHATSAPP = '5551999041589'
export const WHATSAPP_EXIBICAO = '(51) 99904-1589'
export const EMAIL = 'jitshousepraiadorosa@gmail.com'
export const INSTAGRAM = 'jitshouselifestyle'
export const INSTAGRAM_URL = 'https://instagram.com/jitshouselifestyle'
export const SITE_IMERSOES = 'https://www.jitshouse.site/'

/**
 * Checkout. A loja antiga saiu do ar do ponto de vista da navegação: nada
 * aqui aponta mais para loja.jitshouse.com.br.
 *
 * Enquanto a Shopify não estiver de pé, `LOJA_SHOPIFY` fica vazio e todo
 * CTA de compra cai no WhatsApp — o único canal de venda real hoje. Ao
 * publicar a Shopify, basta preencher a URL da loja aqui (e, se houver
 * link por peça, o campo `linkCompra` de cada item em data/produtos.json)
 * que os botões passam a apontar para lá sozinhos.
 */
export const LOJA_SHOPIFY = ''

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`
}
