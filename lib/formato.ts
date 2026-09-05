/**
 * Parcelamento: a loja atual anuncia "PARCELE EM ATÉ 12x — com cartões de
 * crédito". Não há promessa de "sem juros" na origem, então não afirmamos isso.
 */
export const PARCELAS_MAX = 12

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function precoBRL(valor: number) {
  return brl.format(valor)
}

export function parcelamento(valor: number, curto = false) {
  const parcela = `${PARCELAS_MAX}x de ${brl.format(valor / PARCELAS_MAX)}`
  return curto ? parcela : `${parcela} no cartão`
}
