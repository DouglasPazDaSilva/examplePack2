export function add(a, b) {
    return a + b;
}
export function subtract(a, b) {
    return a - b;
}
export function formatCPF(cpf) {
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
