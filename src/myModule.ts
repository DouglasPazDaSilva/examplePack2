export function add(a: number, b: number) {
  return a + b;
}

export function subtract(a: number, b: number) {
  return a - b;
}

export function formatCPF(cpf: string) {
  if (cpf.length >= 14) {
    cpf = cpf.slice(0, 14)
    return cpf
  }
  cpf = cpf.replace(/\D/g, '') // Remove tudo o que não é dígito
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca um hífen entre o terceiro e o quarto dígitos
  return cpf
}

import { nextTick } from 'vue'

export function formatMoney(event: InputEvent, { clearEmptyValue = false } = {}) {
  const inputElement = event.target as HTMLInputElement
  let value = inputElement.value
  const cursorPosition = inputElement.selectionStart
  const originalLength = value.length

  // Remove caracteres não numéricos e faz a formatação
  value = value.replace(/[^0-9]/g, '')
  if (!value.length) {
    return ''
  }

  const numericValue = Number.parseInt(value, 10) / 100
  if (clearEmptyValue && numericValue === 0) {
    return ''
  }

  const formattedValue = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(numericValue)
  inputElement.value = formattedValue

  // Ajusta a posição do cursor
  const newLength = formattedValue.length
  const newPosition = cursorPosition ? cursorPosition + (newLength - originalLength) : 0

  // Aguarda a próxima atualização do DOM e ajusta a posição do cursor
  nextTick(() => {
    inputElement.setSelectionRange(newPosition, newPosition)
  })
  return formattedValue
}