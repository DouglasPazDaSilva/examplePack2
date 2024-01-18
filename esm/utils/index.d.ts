import type { GlobalError } from './error';
interface Item {
    [key: string]: any;
}
declare function filterItems(itens: {
    [key: string]: any;
}[], filters: {
    [key: string]: any;
}): {
    [key: string]: any;
}[];
declare function filterItemsWithSearch(itens: Item[], filters: Item, searchBar: string): Item[];
declare function formatDate(date: string, { time, inverted }?: {
    time?: boolean | undefined;
    inverted?: boolean | undefined;
}): string;
interface Filters {
    [key: string]: any;
}
declare function convertFiltersToQueryParams(filters: Filters): string;
declare function capitalizeFirstLetter(string: string): string;
declare function createAvatarLetter(name: string): string;
declare function generateRandomColor(): string;
declare function formatCNPJ(cnpj: string): string;
declare function formatCPF(cpf: string): string;
declare function formatPhoneNumber(phone: string): string;
declare function arrayEquals(firstArray: number[], secondArray: number[]): boolean;
declare function createFormData(data: any): FormData;
declare function getModifiedFields(initialValues: any, currentValues: any): any;
declare function formatInputMoney(value: string): string;
declare function to<T, U = GlobalError>(promise: Promise<{
    data: T;
}>): Promise<[undefined, U] | [T, undefined]>;
declare function formatMoney(event: InputEvent, { clearEmptyValue }?: {
    clearEmptyValue?: boolean | undefined;
}): string;
export { generateRandomColor, filterItems, filterItemsWithSearch, formatDate, convertFiltersToQueryParams, capitalizeFirstLetter, createAvatarLetter, formatPhoneNumber, formatCPF, arrayEquals, createFormData, getModifiedFields, formatCNPJ, formatInputMoney, to, formatMoney, };
