import {format} from "date-fns"
import ptBR from 'date-fns/locale/pt-BR';

export class DateUtils {
    static formatDateDefault(date: string) {
        return format(new Date(date), "dd MMM, yyyy", {
            locale: ptBR
        })
    }
}
