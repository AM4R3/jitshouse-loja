import Image from 'next/image'
import brasaoTinta from '@/public/marca/brasao-tinta.webp'
import brasaoOuro from '@/public/marca/brasao-ouro.webp'

/**
 * Brasão + lockup "JITSHOUSE / LOJA", igual ao do site principal
 * (lá a segunda linha é LIFESTYLE; aqui diz onde o visitante está).
 */
export function Marca({
  claro,
  tamanho = 34,
  legenda = 'Loja',
}: {
  claro?: boolean
  tamanho?: number
  legenda?: string
}) {
  return (
    <>
      <Image
        src={claro ? brasaoOuro : brasaoTinta}
        alt=""
        width={tamanho}
        height={tamanho}
        priority
      />
      <span className="flex flex-col leading-none">
        <b
          className={`font-rotulo text-[0.94rem] font-medium tracking-[0.19em] ${
            claro ? 'text-papel' : 'text-verde-rosa'
          }`}
        >
          JITSHOUSE
        </b>
        <span
          className={`mt-[3px] font-rotulo text-[0.53rem] font-light uppercase tracking-[0.3em] ${
            claro ? 'text-ouro' : 'text-ouro-dia'
          }`}
        >
          {legenda}
        </span>
      </span>
    </>
  )
}

/** Só o brasão — para marca d'água e placas sem foto. */
export function Brasao({
  claro,
  className = '',
  decorativo,
}: {
  claro?: boolean
  className?: string
  decorativo?: boolean
}) {
  return (
    <Image
      src={claro ? brasaoOuro : brasaoTinta}
      alt={decorativo ? '' : 'Jitshouse Lifestyle'}
      aria-hidden={decorativo || undefined}
      className={className}
      sizes="(max-width: 768px) 40vw, 20vw"
    />
  )
}
