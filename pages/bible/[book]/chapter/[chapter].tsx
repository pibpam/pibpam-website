import type { NextPage } from "next";
import { ContainerVerse, HeaderWrap } from "../../../../styles/Bible";
import Website from "../../../../layout/container/Website";
import DividerMobile, {
  EDividerColors,
} from "../../../../components/DividerMobile";
import Header from "../../../../components/Header";
import useMenu from "../../../../hooks/useMenu";
import {
  EBible,
  getBook,
  getBooks,
  getChapters,
  getVerses,
  IBook,
  IVerse,
} from "../../../../data/bibles";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";

interface IBible {
  chapter: number;
  book: IBook;
  verses: IVerse[];
}

const BibleVerses: NextPage<IBible> = ({ chapter, book, verses }) => {
  const { open, toggleMenu } = useMenu();
  const { goBack } = useAppNavigation();

  return (
    <Website
      title={`Bíblia: ${book.name} - ${chapter} `}
      hasTabNavigator={false}
      openMenu={open}
      toggleMenu={toggleMenu}
    >
      <>
        <HeaderWrap>
          <Header
            goBack={() => goBack({})}
            title={`${book.name}, ${chapter}`}
            toggleMenu={toggleMenu}
          />
        </HeaderWrap>
        <DividerMobile color={EDividerColors.white} />
        <ContainerVerse>
          {verses &&
            verses.map((item) => (
              <p key={item.verse}>
                <sup>{item.verse} </sup> {item.text}
              </p>
            ))}
        </ContainerVerse>
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
