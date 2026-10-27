import type { NextPage } from 'next'
import { Container } from '@/components/ui/Container'
import Website from '../../layout/container/Website'
import AppHeader from "../../components/AppHeader";
import { EBible, getBook, getBooks, getChapters, IBook } from "../../data/bibles";
import { useAppNavigation } from "../../hooks/useAppNavigation";

interface IBible {
  chapters: number[]
  book: IBook
}

const BibleChapters: NextPage<IBible> = ({ chapters, book }) => {
  const { goTo } = useAppNavigation()

  return (
    <Website title={`Bíblia: ${book.name}`} hasTabNavigator={false}>
      <>
        <AppHeader title={book.name} />
        <Container className="pt-6 pb-16">
          <h2 className="mb-4 text-xl font-extrabold tracking-tight">Capítulos</h2>
          <ul className="grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-10">
            {chapters && chapters.map(item => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => goTo({ pathname: "/bible/" + book.book_reference_id + "/chapter/" + item, showLoading: true })}
                  className="flex h-12 w-full items-center justify-center rounded-md border border-line bg-paper text-lg font-bold tabular-nums transition-colors active:bg-brand-soft"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </Container>
      </>
    </Website>
  )
}

export async function getStaticPaths() {
  const books = getBooks(EBible.NVI)
  return {
    paths: books.map(item => ({ params: { book: item.book_reference_id.toString() } })),
    fallback: false,
  }
}

interface IParams {
  params: {
    book: number
  }
}

export async function getStaticProps({ params }: IParams) {
  const chapters = getChapters(EBible.NVI, Number(params.book))
  const book = getBook(EBible.NVI, Number(params.book))
  return { props: { chapters, book } }
}

export default BibleChapters
