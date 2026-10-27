import type { NextPage } from 'next'
import { Container } from '@/components/ui/Container'
import Website from '../layout/container/Website'
import AppHeader from "../components/AppHeader";
import BibleThemeToggle from "../components/BibleThemeToggle";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import ListLink from "../components/ListLink";
import { BIBLE_REVALIDATE, getBibleBooks, IBibleBook } from "../services/youversion";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { useBibleTheme } from "../hooks/useBibleTheme";

interface IBible {
  books: IBibleBook[]
}

const TESTAMENTS = [
  { canon: "old_testament", title: "Antigo Testamento" },
  { canon: "new_testament", title: "Novo Testamento" },
]

const Bible: NextPage<IBible> = ({ books }) => {
  const { goTo } = useAppNavigation()
  const { dark, toggle } = useBibleTheme()

  const open = (pathname: string) => goTo({ pathname })

  return (
    <Website title={"Bíblia"} dark={dark}>
      <>
        <AppHeader
          title="Bíblia"
          tone={dark ? 'dark' : 'light'}
          trailing={<BibleThemeToggle dark={dark} onToggle={toggle} />}
        />
        <Container className="pt-6 pb-32">

          {TESTAMENTS.map(testament => (
            <section key={testament.canon} className="mb-10" aria-label={testament.title}>
              <SectionTitle>{testament.title}</SectionTitle>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {books.filter(book => book.canon === testament.canon).map((item, i) => (
                  <Reveal as="li" index={i} key={item.id}>
                    <ListLink label={item.title} onClick={() => open("/bible/" + item.id)} />
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
  const books = await getBibleBooks()
  return { props: { books }, revalidate: BIBLE_REVALIDATE }
}

export default Bible
