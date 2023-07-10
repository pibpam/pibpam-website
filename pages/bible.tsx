import type {NextPage} from 'next'
import styles from '../styles/Bible.module.scss'
import Website from '../layout/container/Website'
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import {EBible, getBooks, IBook} from "../data/bibles";
import {FiChevronRight} from "react-icons/fi";
import {useAppNavigation} from "../hooks/useAppNavigation";

interface IBible {
    books: IBook[]
}

const Bible: NextPage<IBible> = ({books}) => {
    const {open, toggleMenu} = useMenu()
    const {goTo: goToHook} = useAppNavigation()

    const goTo = async (pathname: string) => {
        await goToHook({pathname, showLoading: true})
    }

    return (
        <Website title={"Bíblia"} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <div className={styles.header_container}>
                    <Header title={"Bíblia"} toggleMenu={toggleMenu}/>
                </div>
                <div className={styles.container_books}>
                    {books && books.map(item => (
                        <button key={item.book_reference_id} onClick={() => goTo("/bible/" + item.book_reference_id)}>
                            {item.name} <FiChevronRight/>
                        </button>
                    ))}
                </div>
            </>
        </Website>
    )
}

export async function getStaticProps() {
    const books = getBooks(EBible.NVI)
    return {props: {books}}
}

export default Bible
