class StringUtils {
  static capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // Máscara de telefone BR: (99) 99999-9999 (celular) ou (99) 9999-9999 (fixo)
  static maskPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) {
      return digits.replace(/^(\d{0,2})/, "($1");
    }
    if (digits.length <= 6) {
      return digits.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
    }
    if (digits.length <= 10) {
      return digits.replace(/^(\d{2})(\d{0,4})(\d{0,4})/, "($1) $2-$3");
    }
    return digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }
}

export default StringUtils