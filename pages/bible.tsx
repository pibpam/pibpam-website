import type { NextPage } from 'next'
import { ContainerBooks, HeaderWrap } from '../styles/Bible'
import Website from '../layout/container/Website'
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import { EBible, getBooks, IBook } from "../data/bibles";
import { FiChevronRight, FiMusic } from "react-icons/fi";
import { useAppNavigation } from "../hooks/useAppNavigation";
import FooterPage from '../components/FooterPage';

interface IBible {
  books: IBook[]
}

const Bible: NextPage<IBible> = ({ books }) => {
  const { open, toggleMenu } = useMenu()
  const { goTo: goToHook } = useAppNavigation()

  const goTo = async (pathname: string) => {
    await goToHook({ pathname, showLoading: true })
  }

  return (
    <Website title={"Bíblia"} openMenu={open} toggleMenu={toggleMenu}>
      <>
        <HeaderWrap>
          <Header title={"Bíblia"} toggleMenu={toggleMenu} />
        </HeaderWrap>
        <ContainerBooks>
          {books && books.map(item => (
            <button key={item.book_reference_id} onClick={() => goTo("/bible/" + item.book_reference_id)}>
              {item.name} <FiChevronRight />
            </button>
          ))}
        </ContainerBooks>
        <FooterPage
          options={[
            {
              text: "Hinários",
              icon: <FiMusic />,
              action: () => goTo("/lyrics")
            },
          ]}
        />
      </>
    </Website>
  )
}


export async function getStaticProps() {
  const books = getBooks(EBible.NVI)
  return { props: { books } }
}

export default Bible
