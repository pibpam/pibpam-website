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

  static getMonthStr(date: string) {
    return format(new Date(date), "MMMM", {
      locale: ptBR
    })
  }
}
