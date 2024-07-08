export const formatPhone = (value: string) => {
    // Se nenhum valor for fornecido, retorna-o como está.
    if (!value) return value;
    
    // Remove todos os caracteres que não são dígitos da string de entrada.
    const phoneNumber = value.replace(/[^\d]/g, '');
    
    // Obtém o comprimento da string do número de telefone limpa.
    const phoneNumberLength = phoneNumber.length;
    
    // Se o comprimento do número de telefone for menor que 3, retorna-o como está.
    if (phoneNumberLength < 3) return phoneNumber;
    
    // Se o comprimento do número de telefone for menor que 8, formata como (XX) XXXXX.
    if (phoneNumberLength < 8) {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    }
    
    // Caso contrário, formata como (XX) XXXXX-XXXX.
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
};
