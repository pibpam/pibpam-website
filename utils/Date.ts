import { format } from "date-fns"
import ptBR from 'date-fns/locale/pt-BR';

export class DateUtils {
  static formatDateDefault(date: string) {
    return format(new Date(date), "dd MMM, yyyy", {
      locale: ptBR
    })
  }

  static getWeekdayStr(date: string) {
    return format(new Date(date), "EEEE", {
      locale: ptBR
    })
  }

  static formatDateUS(date: string) {
    return format(new Date(date), "MM-dd-yyyy")
  }

  static formatDateDayAndMonth(date: string) {
    return format(new Date(date), "dd/MM", {
      locale: ptBR
    })
  }

  static formatTime(date: string) {
    return format(new Date(date), "HH:mm", {
      locale: ptBR
    })
  }

  static formatTimeH(date: string) {
    return format(new Date(date), "HH:mm", {
      locale: ptBR
    })
  }

  static formatDateTimeWithWeekDay(date: string) {
    return format(new Date(date), "EEEE, dd 'de' MMMM 'de' yyyy", {
      locale: ptBR
    })
  }

  // "Dom, 09/12 · 19h30" — versão curta (dia da semana abreviado, data numérica) usada
  // em cabeçalhos compactos (ex.: chevron do plano litúrgico).
  static formatShortDateTimeWithWeekDay(date: string) {
    const weekday = format(new Date(date), "EEEEEE", { locale: ptBR })
    const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1)
    const dayMonth = format(new Date(date), "dd/MM", { locale: ptBR })
    const time = format(new Date(date), "HH'h'mm", { locale: ptBR })
    return `${capitalizedWeekday}, ${dayMonth} · ${time}`
  }

  static getMonthStr(date: string) {
    return format(new Date(date), "MMMM", {
      locale: ptBR
    })
  }

  // Converte "DD/MM/YYYY" (input mascarado) para "YYYY-MM-DD" (ISO).
  static parseBRDateToISO(date: string) {
    const match = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
    if (!match) return ""
    const [, day, month, year] = match
    return `${year}-${month}-${day}`
  }
}
