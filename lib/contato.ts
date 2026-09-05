export const WHATSAPP = '5551999041589'
export const WHATSAPP_EXIBICAO = '(51) 99904-1589'
export const EMAIL = 'jitshousepraiadorosa@gmail.com'
export const INSTAGRAM = 'jitshouselifestyle'
export const INSTAGRAM_URL = 'https://instagram.com/jitshouselifestyle'
export const SITE_IMERSOES = 'https://www.jitshouse.site/'
export const LOJA_ATUAL = 'https://loja.jitshouse.com.br'
export const CARRINHO_ATUAL = 'https://loja.jitshouse.com.br/carrinho/'

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`
}
