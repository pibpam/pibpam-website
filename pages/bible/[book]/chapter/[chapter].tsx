import type { NextPage } from "next";
import { Container } from "@/components/ui/Container";
import Website from "../../../../layout/container/Website";
import AppHeader from "../../../../components/AppHeader";
import {
  EBible,
  getBook,
  getBooks,
  getChapters,
  getVerses,
  IBook,
  IVerse,
} from "../../../../data/bibles";

interface IBible {
  chapter: number;
  book: IBook;
  verses: IVerse[];
}

const BibleVerses: NextPage<IBible> = ({ chapter, book, verses }) => {
  return (
    <Website
      title={`Bíblia: ${book.name} - ${chapter} `}
      hasTabNavigator={false}
    >
      <>
        <AppHeader title={`${book.name}, ${chapter}`} />
        <Container className="pt-6 pb-16">
          <div className="mx-auto flex max-w-[700px] flex-col gap-3 text-lg leading-8">
            {verses &&
              verses.map((item) => (
                <p key={item.verse}>
                  <sup className="mr-1 text-xs font-bold text-brand-strong">{item.verse}</sup>
                  {item.text}
                </p>
              ))}
          </div>
        </Container>
      </>
    </Website>
  );
};

export async function getStaticPaths() {
  const books = getBooks(EBible.NVI);
  const data = [] as { chapter: string; book: string }[];

  books.forEach((book) => {
    const chapters = getChapters(EBible.NVI, book.book_reference_id);
    chapters.forEach((chapter) => {
      data.push({
        chapter: chapter.toString(),
        book: book.book_reference_id.toString(),
      });
    });
  });

  return {
    paths: data.map((item) => ({ params: { ...item } })),
    fallback: false,
  };
}

interface IParams {
  params: {
    book: number;
    chapter: number;
  };
}

export async function getStaticProps({ params }: IParams) {
  const book = getBook(EBible.NVI, Number(params.book));
  const verses = getVerses(
    EBible.NVI,
    Number(params.book),
    Number(params.chapter)
  );
  return { props: { chapter: params.chapter, book, verses } };
}

export default BibleVerses;
