import type {NextPage} from 'next'
import styles from '../../styles/Bible.module.scss'
import Website from '../../layout/container/Website'
import DividerMobile, {EDividerColors} from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import {EBible, getBook, getBooks, getChapters, IBook} from "../../data/bibles";
import {useAppNavigation} from "../../hooks/useAppNavigation";

interface IBible {
    chapters: number[]
    book: IBook
}

const BibleChapters: NextPage<IBible> = ({chapters, book}) => {
    const {open, toggleMenu} = useMenu()
    const {goTo: goToHook, goBack} = useAppNavigation()

    const goTo = async (pathname: string) => {
        await goToHook({pathname, showLoading: true})
    }

    return (
        <Website hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <div className={styles.header_container}>
                    <Header goBack={() => goBack({})} title={book.name} toggleMenu={toggleMenu}/>
                </div>
                <DividerMobile color={EDividerColors.white}/>
                <div className={styles.container_chapter}>
                    {chapters && chapters.map(item => (
                        <button
                            key={item}
                            onClick={() => goTo("/bible/" + book.book_reference_id + "/chapter/" + item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </>
        </Website>
    )
}

export async function getStaticPaths() {
    const books = getBooks(EBible.NVI)
    return {
        paths: books.map(item => ({params: {book: item.book_reference_id.toString()}})),
        fallback: false,
    }
}

interface IParams {
    params: {
        book: number
    }
}

export async function getStaticProps({params}: IParams) {
    const chapters = getChapters(EBible.NVI, Number(params.book))
    const book = getBook(EBible.NVI, Number(params.book))
    return {props: {chapters, book}}
}

export default BibleChapters
