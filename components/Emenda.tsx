const RGB = {
  papel: '240,232,214',
  'papel-alto': '247,241,228',
  floresta: '4,33,30',
  'floresta-2': '1,16,15',
} as const

export type CorDeEmenda = keyof typeof RGB

/**
 * Dissolve a emenda entre duas seções de fundo diferente. Fica dentro da
 * seção escura, sangrando a cor da seção vizinha por cima da borda — o corte
 * reto vira uma rampa e some.
 *
 * As paradas são escalonadas (não é um gradiente linear puro) porque uma
 * rampa linear entre dois tons distantes ainda deixa uma faixa visível no
 * meio. E o fim é a mesma cor com alfa 0, nunca `transparent`: em sRGB,
 * `transparent` é preto transparente e suja o meio do gradiente.
 */
export default function Emenda({
  cor,
  posicao = 'topo',
  altura = 120,
}: {
  cor: CorDeEmenda
  posicao?: 'topo' | 'base'
  altura?: number
}) {
  const rgb = RGB[cor]
  const sentido = posicao === 'topo' ? 'bottom' : 'top'

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 ${
        posicao === 'topo' ? 'top-0' : 'bottom-0'
      }`}
      style={{
        height: altura,
        backgroundImage: `linear-gradient(to ${sentido},
          rgba(${rgb},1) 0%,
          rgba(${rgb},.92) 14%,
          rgba(${rgb},.72) 32%,
          rgba(${rgb},.44) 54%,
          rgba(${rgb},.2) 76%,
          rgba(${rgb},.06) 90%,
          rgba(${rgb},0) 100%)`,
      }}
    />
  )
}
