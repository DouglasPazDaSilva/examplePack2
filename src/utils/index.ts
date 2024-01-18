import dayjs from 'dayjs'
import { nextTick } from 'vue'
import type { GlobalError } from './error'
import { handleError } from './error'

interface Item {
  [key: string]: any
}
// TODO deprecated
function filterItems(itens: { [key: string]: any }[], filters: { [key: string]: any }) {
  return itens.filter(item =>
    Object.keys(filters).every(chave =>
      filters[chave] === null || item[chave] === filters[chave],
    ),
  )
}
// TODO deprecated
function filterItemsWithSearch(itens: Item[], filters: Item, searchBar: string) {
  return itens.filter(item =>
    Object.keys(item).some((key) => {
      const value = item[key]
      const isValid = value != null && value.toString().toLowerCase().includes(searchBar.toLowerCase().trim())
      return isValid
    }) && Object.keys(filters).every(key =>
      filters[key] === null || item[key] === filters[key],
    ),
  )
}

function formatDate(date: string, { time = false, inverted = false } = {}) {
  return time ? dayjs(date).format('DD-MM-YYYY HH:mm') : inverted ? dayjs(date).format('YYYY-MM-DD') : dayjs(date).format('DD-MM-YYYY')
}

interface Filters {
  [key: string]: any
}

function convertFiltersToQueryParams(filters: Filters): string {
  const params = new URLSearchParams()

  for (const key in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, key)) {
      if (filters[key]) {
        if (Array.isArray(filters[key])) {
          filters[key].forEach((filterValue: any) => {
            params.append(key, filterValue)
          })
        }
        else if (typeof filters[key] === 'string') {
          params.append(key, filters[key].trim())
        }
        else {
          params.append(key, filters[key])
        }
      }
    }
  }

  return `?${params.toString()}`
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function createAvatarLetter(name: string) {
  return name.slice(0, 1).toUpperCase()
}

function generateRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function formatCNPJ(cnpj: string) {
  if (cnpj.length >= 18) {
    cnpj = cnpj.slice(0, 18)
    return cnpj
  }

  cnpj = cnpj.replace(/\D/g, '') // Remove tudo o que não é dígito
  cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2') // Coloca ponto entre o segundo e o terceiro dígitos
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Coloca ponto entre o quinto e o sexto dígitos
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2') // Coloca uma barra entre o oitavo e o nono dígitos
  cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2') // Coloca um hífen depois do bloco de quatro dígitos

  return cnpj
}

function formatCPF(cpf: string) {
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

function formatPhoneNumber(phone: string) {
  phone = phone.replace(/\D/g, '') // Remove tudo o que não é dígito
  phone = phone.replace(/(\d{0})(\d)/, '$1($2') // Coloca um parentese no inicio
  phone = phone.replace(/(\d{2})(\d)/, '$1) $2') // Fecha o parentese entre o dígito 2 e 3
  phone = phone.replace(/(\d{5})(\d)/, '$1-$2') // Coloca um hífen entre o quinto e o sexto dígitos

  return phone
}

function arrayEquals(firstArray: number[], secondArray: number[]) {
  // compara dois arrays de números
  if (!firstArray || !secondArray) {
    return false
  }
  return JSON.stringify(firstArray.sort()) === JSON.stringify(secondArray.sort())
}

function createFormData(data: any) {
  // Cria um FormData a partir de um objeto

  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      // Se o valor for um File, adiciona ao FormData como um File
      formData.append(key, value)
    }
    else {
      // Para outros tipos, converte para string
      formData.append(key, String(value))
    }
  })
  return formData
}

function getModifiedFields(initialValues: any, currentValues: any) {
  // Retorna um objeto com os campos que foram modificados

  const modifiedFields: any = {}

  // Itera pelas chaves do objeto initialValues
  Object.keys(initialValues).forEach((key) => {
    // Verifica se a chave também existe em currentValues
    if (key in currentValues) {
      // Compara os valores; se forem diferentes, adiciona ao objeto modifiedFields
      if (initialValues[key] !== currentValues[key]) {
        // caso seja um array compara se ambos são iguais
        if (Array.isArray(initialValues[key])) {
          if (!arrayEquals(initialValues[key], currentValues[key])) {
            modifiedFields[key] = currentValues[key]
          }
        }
        else {
          modifiedFields[key] = currentValues[key]
        }
      }
    }
  })

  return modifiedFields
}
// TODO: deprecated
function formatInputMoney(value: string) {
  value = value.replace(/[^0-9]/g, '') // Remove tudo que não é número
  if (!value) {
    return ''
  }

  // Adicionando vírgula e pontos
  if (value.length > 2) {
    const decimalPart = value.slice(-2)
    const integerPart = value.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    value = `${integerPart},${decimalPart}`
  }
  return value
}

// função wrapper pra todas as chamadas a api
async function to<T, U = GlobalError>(
  promise: Promise<{ data: T }>,
): Promise<[undefined, U] | [T, undefined]> {
  try {
    const response = await promise
    return [response.data, undefined]
  }
  catch (err) {
    const parsedError = handleError(err)
    return [undefined, parsedError as U]
  }
}

function formatMoney(event: InputEvent, { clearEmptyValue = false } = {}) {
  const inputElement = event.target as HTMLInputElement
  let value = inputElement.value
  const cursorPosition = inputElement.selectionStart
  const originalLength = value.length

  // Remove caracteres não numéricos e faz a formatação
  value = value.replace(/[^0-9]/g, '')
  if (!value.length) {
    return ''
  };

  const numericValue = Number.parseInt(value, 10) / 100
  if (clearEmptyValue && numericValue === 0) {
    return ''
  };

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

export {
  generateRandomColor,
  filterItems,
  filterItemsWithSearch,
  formatDate,
  convertFiltersToQueryParams,
  capitalizeFirstLetter,
  createAvatarLetter,
  formatPhoneNumber,
  formatCPF,
  arrayEquals,
  createFormData,
  getModifiedFields,
  formatCNPJ,
  formatInputMoney,
  to,
  formatMoney,
}
