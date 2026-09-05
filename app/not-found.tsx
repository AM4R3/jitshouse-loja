import Link from 'next/link'

export default function NaoEncontrado() {
  return (
    <div className="mx-auto flex max-w-conteudo flex-col items-start px-5 py-32 md:px-10 md:py-44">
      <p className="sobrancelha">Erro 404</p>
      <h1 className="display mt-4 text-[clamp(2.4rem,6vw,4rem)]">
        Essa página <em>saiu do tatame.</em>
      </h1>
      <p className="mt-4 max-w-md text-mute-papel">
        O link não existe ou a peça saiu do catálogo.
      </p>
      <Link href="/" className="btn btn--solido mt-10">
        Voltar para a loja
      </Link>
    </div>
  )
}
