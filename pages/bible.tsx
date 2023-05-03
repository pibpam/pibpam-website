import type {NextPage} from 'next'
import styles from '../styles/Bible.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import {EBible, getBooks, IBook} from "../data/bibles";
import useLoading from "../hooks/useLoading";
import {useRouter} from "next/router";
import {FiChevronRight} from "react-icons/fi";

interface IBible {
    books: IBook[]
}

const Bible: NextPage<IBible> = ({books}) => {
    const {open, toggleMenu} = useMenu()
    const router = useRouter()
    const {handleClose, handleOpen} = useLoading()

    const goTo = async (pathname: string) => {
        await handleOpen()
        await router.push({pathname})
        handleClose()
    }

    return (
        <Website openMenu={open} toggleMenu={toggleMenu}>
            <>
                <div className={styles.header_container}>
                    <Header title={"Bíblia"} toggleMenu={toggleMenu}/>
                </div>
                <DividerMobile color={EDividerColors.white}/>
                <div className={styles.container_books}>
                    {books && books.map(item => (
                        <button key={item.book_reference_id} onClick={() => goTo("/bible/" + item.book_reference_id)} >
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
