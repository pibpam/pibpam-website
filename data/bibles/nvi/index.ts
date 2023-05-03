import books from "./book.json"
import verses from "./verse.json"
import {IBook, IVerse} from "../index";

const {book} = books
const {verse} = verses as { verse: IVerse[] }

export const nvi = {
    books: book, verses: verse
} as {
    books: IBook[]
    verses: IVerse[]
}
