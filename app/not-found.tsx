import Link from 'next/link'

export default function NaoEncontrado() {
  return (
    <div className="mx-auto flex max-w-conteudo flex-col items-start px-5 py-32 md:px-10 md:py-44">
      <p className="sobrancelha">Erro 404</p>
      <h1 className="display mt-4 text-5xl md:text-6xl">
        Essa página <em>saiu do tatame.</em>
      </h1>
      <p className="mt-4 max-w-md text-cinza">
        O link não existe ou a peça saiu do catálogo.
      </p>
      <Link href="/" className="botao-tinta mt-10">
        Voltar para a loja
      </Link>
    </div>
  )
}
