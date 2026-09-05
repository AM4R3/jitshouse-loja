import Image from 'next/image'
import logo from '@/public/marca/logo.webp'

type Props = {
  /** Pinta o wordmark com a cor atual (máscara). Sem isso, usa o arquivo original. */
  mascara?: boolean
  /** Marca d'água / textura: some da árvore de acessibilidade. */
  decorativo?: boolean
  className?: string
  priority?: boolean
}

const PROPORCAO = logo.width / logo.height

export default function Logo({
  mascara,
  decorativo,
  className = '',
  priority,
}: Props) {
  if (mascara) {
    return (
      <span
        {...(decorativo
          ? { 'aria-hidden': true }
          : { role: 'img', 'aria-label': 'JitsHouse' })}
        className={`logo-mascara ${className}`}
        style={{ aspectRatio: PROPORCAO }}
      />
    )
  }

  return (
    <Image
      src={logo}
      alt={decorativo ? '' : 'JitsHouse'}
      aria-hidden={decorativo || undefined}
      priority={priority}
      className={className}
      sizes="(max-width: 768px) 160px, 220px"
    />
  )
}
