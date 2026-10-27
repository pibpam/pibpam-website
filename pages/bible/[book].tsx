import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Container } from '@/components/ui/Container'
import Website from '../../layout/container/Website'
import AppHeader from "../../components/AppHeader";
import BibleThemeToggle from "../../components/BibleThemeToggle";
import Reveal from "../../components/Reveal";
import SectionTitle from "../../components/SectionTitle";
import {
  BIBLE_REVALIDATE,
  getBibleBook,
  getBibleBooks,
  getLegacyBookId,
  IBibleBook,
} from "../../services/youversion";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { useBibleTheme } from "../../hooks/useBibleTheme";

interface IBible {
  chapters: string[]
  book: IBibleBook
}

const BibleChapters: NextPage<IBible> = ({ chapters, book }) => {
  const { goTo } = useAppNavigation()
  const { dark, toggle } = useBibleTheme()

  return (
    <Website title={`Bíblia: ${book.title}`} hasTabNavigator={false} dark={dark}>
      <>
        <AppHeader
          title={book.title}
          tone={dark ? 'dark' : 'light'}
          trailing={<BibleThemeToggle dark={dark} onToggle={toggle} />}
        />
        <Container className="pt-6 pb-16">
          <SectionTitle>Capítulos</SectionTitle>
          <Reveal as="ul" className="grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-10">
            {chapters.map(item => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => goTo({ pathname: "/bible/" + book.id + "/chapter/" + item })}
                  className="flex h-12 w-full items-center justify-center rounded-md border border-line bg-paper text-lg font-bold text-ink shadow-sm tabular-nums transition-colors active:bg-brand-soft"
                >
                  {item}
                </button>
              </li>
            ))}
          </Reveal>
        </Container>
      </>
    </Website>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await getBibleBooks()
  return {
    paths: books.map(item => ({ params: { book: item.id } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<IBible, { book: string }> = async ({ params }) => {
  const param = params?.book ?? ''

  const legacyId = await getLegacyBookId(param)
  if (legacyId) {
    return { redirect: { destination: `/bible/${legacyId}`, permanent: true } }
  }

  if (!/^[0-9A-Z]{3}$/.test(param)) return { notFound: true }

  const data = await getBibleBook(param)
  if (!data) return { notFound: true }

  return { props: data, revalidate: BIBLE_REVALIDATE }
}

export default BibleChapters
