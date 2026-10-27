import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Container } from "@/components/ui/Container";
import Website from "../../../../layout/container/Website";
import AppHeader from "../../../../components/AppHeader";
import BibleText from "../../../../components/BibleText";
import BibleThemeToggle from "../../../../components/BibleThemeToggle";
import {
  BIBLE_REVALIDATE,
  getBibleBook,
  getBibleChapter,
  getBibleCopyright,
  getLegacyBookId,
  IBibleBook,
} from "../../../../services/youversion";
import { useBibleTheme } from "../../../../hooks/useBibleTheme";

interface IBible {
  chapter: string;
  book: IBibleBook;
  html: string;
  copyright: string | null;
}

const BibleVerses: NextPage<IBible> = ({ chapter, book, html, copyright }) => {
  const { dark, toggle } = useBibleTheme();

  return (
    <Website
      title={`Bíblia: ${book.title} - ${chapter} `}
      hasTabNavigator={false}
      dark={dark}
    >
      <>
        <AppHeader
          title={`${book.title}, ${chapter}`}
          tone={dark ? "dark" : "light"}
          trailing={<BibleThemeToggle dark={dark} onToggle={toggle} />}
        />
        <Container className="pt-6 pb-16">
          <BibleText html={html} copyright={copyright} />
        </Container>
      </>
    </Website>
  );
};

// Os 1.189 capítulos são gerados sob demanda (e guardados em cache), não no build.
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps<
  IBible,
  { book: string; chapter: string }
> = async ({ params }) => {
  const { book: bookParam = "", chapter = "" } = params ?? {};

  const legacyId = await getLegacyBookId(bookParam);
  if (legacyId) {
    return {
      redirect: { destination: `/bible/${legacyId}/chapter/${chapter}`, permanent: true },
    };
  }

  if (!/^[0-9A-Z]{3}$/.test(bookParam) || !/^\d+$/.test(chapter)) {
    return { notFound: true };
  }

  const [data, html, copyright] = await Promise.all([
    getBibleBook(bookParam),
    getBibleChapter(bookParam, chapter),
    getBibleCopyright(),
  ]);
  if (!data || !html) return { notFound: true };

  return {
    props: { chapter, book: data.book, html, copyright },
    revalidate: BIBLE_REVALIDATE,
  };
};

export default BibleVerses;
