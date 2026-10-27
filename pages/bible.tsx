import type { NextPage } from 'next'
import { FiMusic } from "react-icons/fi";
import { Container } from '@/components/ui/Container'
import Website from '../layout/container/Website'
import AppHeader from "../components/AppHeader";
import AppButton from "../components/AppButton";
import ListLink from "../components/ListLink";
import { EBible, getBooks, IBook } from "../data/bibles";
import { useAppNavigation } from "../hooks/useAppNavigation";

interface IBible {
  books: IBook[]
}

const TESTAMENTS = [
  { id: 1, title: "Antigo Testamento" },
  { id: 2, title: "Novo Testamento" },
]

const Bible: NextPage<IBible> = ({ books }) => {
  const { goTo } = useAppNavigation()

  const open = (pathname: string) => goTo({ pathname, showLoading: true })

  return (
    <Website title={"Bíblia"}>
      <>
        <AppHeader title="Bíblia" />
        <Container className="pt-6 pb-32">
          <AppButton variant="outline" icon={<FiMusic aria-hidden />} href="/lyrics">
            Hinários
          </AppButton>

          {TESTAMENTS.map(testament => (
            <section key={testament.id} className="mt-8" aria-label={testament.title}>
              <h2 className="mb-3 text-xl font-extrabold tracking-tight">{testament.title}</h2>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {books.filter(book => book.testament_reference_id === testament.id).map(item => (
                  <li key={item.book_reference_id}>
                    <ListLink label={item.name} onClick={() => open("/bible/" + item.book_reference_id)} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </Container>
      </>
    </Website>
  )
}


export async function getStaticProps() {
  const books = getBooks(EBible.NVI)
  return { props: { books } }
}

export default Bible
