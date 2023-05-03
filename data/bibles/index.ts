import {nvi} from "./nvi";

export enum EBible {
    NVI = "nvi"
}

export interface IBook {
    id: number
    book_reference_id: number
    testament_reference_id: number
    name: string
}

export interface IVerse {
    id: number
    book_id: number
    chapter: number
    verse: number
    text: string
}

export const bibles = {
    nvi
}

export const getBible = (bible: EBible) => {
    return bibles[bible]
}

export const getBooks = (bible: EBible): IBook[] => {
    return getBible(bible).books
}
export const getBook = (bible: EBible, book: number): IBook | undefined => {
    return getBible(bible).books.find(item => item.book_reference_id === book)
}

export const getChapters = (bible: EBible, bookId: number): Number[] => {
    const chapters = [] as Number[]
    getBible(bible).verses.forEach(item => {
        if (bookId === item.book_id) {
            if (!chapters.includes(item.chapter)) {
                chapters.push(item.chapter)
            }
        }
    })
    return chapters
}

export const getVerses = (bible: EBible, bookId: number, chapterId: number): IVerse[] => {
    return getBible(bible).verses.filter(item => bookId === item.book_id && chapterId === item.chapter)
}
