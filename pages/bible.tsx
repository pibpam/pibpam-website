import type { NextPage } from 'next'
import { Container } from '@/components/ui/Container'
import Website from '../layout/container/Website'
import AppHeader from "../components/AppHeader";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
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

  const open = (pathname: string) => goTo({ pathname })

  return (
    <Website title={"Bíblia"}>
      <>
        <AppHeader title="Bíblia" />
        <Container className="pt-6 pb-32">

          {TESTAMENTS.map(testament => (
            <section key={testament.id} className="mb-10" aria-label={testament.title}>
              <SectionTitle>{testament.title}</SectionTitle>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {books.filter(book => book.testament_reference_id === testament.id).map((item, i) => (
                  <Reveal as="li" index={i} key={item.book_reference_id}>
                    <ListLink label={item.name} onClick={() => open("/bible/" + item.book_reference_id)} />
                  </Reveal>
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
