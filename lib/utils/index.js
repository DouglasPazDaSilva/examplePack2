"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMoney = exports.to = exports.formatInputMoney = exports.formatCNPJ = exports.getModifiedFields = exports.createFormData = exports.arrayEquals = exports.formatCPF = exports.formatPhoneNumber = exports.createAvatarLetter = exports.capitalizeFirstLetter = exports.convertFiltersToQueryParams = exports.formatDate = exports.filterItemsWithSearch = exports.filterItems = exports.generateRandomColor = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const vue_1 = require("vue");
const error_1 = require("./error");
// TODO deprecated
function filterItems(itens, filters) {
    return itens.filter(item => Object.keys(filters).every(chave => filters[chave] === null || item[chave] === filters[chave]));
}
exports.filterItems = filterItems;
// TODO deprecated
function filterItemsWithSearch(itens, filters, searchBar) {
    return itens.filter(item => Object.keys(item).some((key) => {
        const value = item[key];
        const isValid = value != null && value.toString().toLowerCase().includes(searchBar.toLowerCase().trim());
        return isValid;
    }) && Object.keys(filters).every(key => filters[key] === null || item[key] === filters[key]));
}
exports.filterItemsWithSearch = filterItemsWithSearch;
function formatDate(date, { time = false, inverted = false } = {}) {
    return time ? (0, dayjs_1.default)(date).format('DD-MM-YYYY HH:mm') : inverted ? (0, dayjs_1.default)(date).format('YYYY-MM-DD') : (0, dayjs_1.default)(date).format('DD-MM-YYYY');
}
exports.formatDate = formatDate;
function convertFiltersToQueryParams(filters) {
    const params = new URLSearchParams();
    for (const key in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, key)) {
            if (filters[key]) {
                if (Array.isArray(filters[key])) {
                    filters[key].forEach((filterValue) => {
                        params.append(key, filterValue);
                    });
                }
                else if (typeof filters[key] === 'string') {
                    params.append(key, filters[key].trim());
                }
                else {
                    params.append(key, filters[key]);
                }
            }
        }
    }
    return `?${params.toString()}`;
}
exports.convertFiltersToQueryParams = convertFiltersToQueryParams;
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function createAvatarLetter(name) {
    return name.slice(0, 1).toUpperCase();
}
exports.createAvatarLetter = createAvatarLetter;
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
exports.generateRandomColor = generateRandomColor;
function formatCNPJ(cnpj) {
    if (cnpj.length >= 18) {
        cnpj = cnpj.slice(0, 18);
        return cnpj;
    }
    cnpj = cnpj.replace(/\D/g, ''); // Remove tudo o que não é dígito
    cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígitos
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Coloca uma barra entre o oitavo e o nono dígitos
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
    return cnpj;
}
exports.formatCNPJ = formatCNPJ;
function formatCPF(cpf) {
    if (cpf.length >= 14) {
        cpf = cpf.slice(0, 14);
        return cpf;
    }
    cpf = cpf.replace(/\D/g, ''); // Remove tudo o que não é dígito
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
    return cpf;
}
exports.formatCPF = formatCPF;
function formatPhoneNumber(phone) {
    phone = phone.replace(/\D/g, ''); // Remove tudo o que não é dígito
    phone = phone.replace(/(\d{0})(\d)/, '$1($2'); // Coloca um parentese no inicio
    phone = phone.replace(/(\d{2})(\d)/, '$1) $2'); // Fecha o parentese entre o dígito 2 e 3
    phone = phone.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca um hífen entre o quinto e o sexto dígitos
    return phone;
}
exports.formatPhoneNumber = formatPhoneNumber;
function arrayEquals(firstArray, secondArray) {
    // compara dois arrays de números
    if (!firstArray || !secondArray) {
        return false;
    }
    return JSON.stringify(firstArray.sort()) === JSON.stringify(secondArray.sort());
}
exports.arrayEquals = arrayEquals;
function createFormData(data) {
    // Cria um FormData a partir de um objeto
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
            // Se o valor for um File, adiciona ao FormData como um File
            formData.append(key, value);
        }
        else {
            // Para outros tipos, converte para string
            formData.append(key, String(value));
        }
    });
    return formData;
}
exports.createFormData = createFormData;
function getModifiedFields(initialValues, currentValues) {
    // Retorna um objeto com os campos que foram modificados
    const modifiedFields = {};
    // Itera pelas chaves do objeto initialValues
    Object.keys(initialValues).forEach((key) => {
        // Verifica se a chave também existe em currentValues
        if (key in currentValues) {
            // Compara os valores; se forem diferentes, adiciona ao objeto modifiedFields
            if (initialValues[key] !== currentValues[key]) {
                // caso seja um array compara se ambos são iguais
                if (Array.isArray(initialValues[key])) {
                    if (!arrayEquals(initialValues[key], currentValues[key])) {
                        modifiedFields[key] = currentValues[key];
                    }
                }
                else {
                    modifiedFields[key] = currentValues[key];
                }
            }
        }
    });
    return modifiedFields;
}
exports.getModifiedFields = getModifiedFields;
//TODO: deprecated
function formatInputMoney(value) {
    value = value.replace(/[^0-9]/g, ''); // Remove tudo que não é número
    if (!value) {
        return '';
    }
    // Adicionando vírgula e pontos
    if (value.length > 2) {
        const decimalPart = value.slice(-2);
        const integerPart = value.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        value = `${integerPart},${decimalPart}`;
    }
    return value;
}
exports.formatInputMoney = formatInputMoney;
// função wrapper pra todas as chamadas a api
function to(promise) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield promise;
            return [response.data, undefined];
        }
        catch (err) {
            const parsedError = (0, error_1.handleError)(err);
            return [undefined, parsedError];
        }
    });
}
exports.to = to;
function formatMoney(event, { clearEmptyValue = false } = {}) {
    const inputElement = event.target;
    let value = inputElement.value;
    const cursorPosition = inputElement.selectionStart;
    const originalLength = value.length;
    // Remove caracteres não numéricos e faz a formatação
    value = value.replace(/[^0-9]/g, '');
    if (!value.length) {
        return '';
    }
    const numericValue = Number.parseInt(value, 10) / 100;
    if (clearEmptyValue && numericValue === 0) {
        return '';
    }
    const formattedValue = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(numericValue);
    inputElement.value = formattedValue;
    // Ajusta a posição do cursor
    const newLength = formattedValue.length;
    const newPosition = cursorPosition ? cursorPosition + (newLength - originalLength) : 0;
    // Aguarda a próxima atualização do DOM e ajusta a posição do cursor
    (0, vue_1.nextTick)(() => {
        inputElement.setSelectionRange(newPosition, newPosition);
    });
    return formattedValue;
}
exports.formatMoney = formatMoney;
