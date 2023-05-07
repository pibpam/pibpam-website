import type {NextPage} from 'next'
import styles from '../../../../styles/Bible.module.scss'
import Website from '../../../../layout/container/Website'
import DividerMobile, {EDividerColors} from "../../../../components/DividerMobile";
import Header from "../../../../components/Header";
import useMenu from "../../../../hooks/useMenu";
import {EBible, getBook, getBooks, getChapters, getVerses, IBook, IVerse} from "../../../../data/bibles";
import {useAppNavigation} from "../../../../hooks/useAppNavigation";

interface IBible {
    chapter: number
    book: IBook
    verses: IVerse[]
}

const BibleVerses: NextPage<IBible> = ({chapter, book, verses}) => {
    const {open, toggleMenu} = useMenu()
    const {goTo: goToHook} = useAppNavigation()

    const goTo = async (pathname: string) => {
        await goToHook({pathname, showLoading: true})
    }

    return (
        <Website hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <div className={styles.header_container}>
                    <Header goBack={() => goTo("/bible/" + book.id)} title={`${book.name}, ${chapter}`}
                            toggleMenu={toggleMenu}/>
                </div>
                <DividerMobile color={EDividerColors.white}/>
                <div className={styles.container_verse}>
                    {verses && verses.map(item => (
                        <p
                            key={item.verse}
                        >
                            <sup>{item.verse} </sup> {item.text}
                        </p>
                    ))}
                </div>
            </>
        </Website>
    )
}

export async function getStaticPaths() {
    const books = getBooks(EBible.NVI)
    const data = [] as { chapter: string, book: string }[]

    books.forEach(book => {
        const chapters = getChapters(EBible.NVI, book.book_reference_id)
        chapters.forEach(chapter => {
            data.push({
                chapter: chapter.toString(),
                book: book.book_reference_id.toString()
            })
        })
    })

    return {
        paths: data.map(item => ({params: {...item}})),
        fallback: false,
    }
}

interface IParams {
    params: {
        book: number
        chapter: number
    }
}

export async function getStaticProps({params}: IParams) {
    const book = getBook(EBible.NVI, Number(params.book))
    const verses = getVerses(EBible.NVI, Number(params.book), Number(params.chapter))
    return {props: {chapter: params.chapter, book, verses}}
}

export default BibleVerses
