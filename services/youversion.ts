import { ApiClient, BibleClient, getHttpStatus } from "@youversion/platform-core";

// Bíblia via YouVersion Platform. Server-side only (getStaticProps/getStaticPaths):
// a chave não pode ir para o cliente.
export const BIBLE_VERSION_ID = 129; // NVI (Nova Versão Internacional - Português)

export interface IBibleBook {
  /** Código USFM do livro (GEN, JHN…), usado na URL. */
  id: string;
  title: string;
  canon: string;
}

let client: BibleClient | undefined;

const bible = () => {
  if (!client) {
    client = new BibleClient(
      new ApiClient({ appKey: process.env.YOUVERSION_APP_KEY as string }),
    );
  }
  return client;
};

const isNotFound = (error: unknown) => getHttpStatus(error) === 404;

// A API escreve "1Samuel", "2Reis"…; o app sempre mostrou "1 Samuel".
const bookTitle = (title: string) => title.replace(/^(\d)(?=\S)/, "$1 ");

export const getBibleBooks = async (): Promise<IBibleBook[]> => {
  const { data } = await bible().getBooks(BIBLE_VERSION_ID);
  return data.map(({ id, title, canon }) => ({ id, title: bookTitle(title), canon }));
};

/** Livro com a lista de capítulos, ou `null` se o código não existir. */
export const getBibleBook = async (usfm: string) => {
  try {
    const { id, title, canon, chapters = [] } = await bible().getBook(BIBLE_VERSION_ID, usfm);
    return { book: { id, title: bookTitle(title), canon } as IBibleBook, chapters: chapters.map((item) => item.id) };
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
};

/** HTML do capítulo como a API entrega (com subtítulos, sem notas), ou `null` se não existir. */
export const getBibleChapter = async (usfm: string, chapter: string) => {
  try {
    const passage = await bible().getPassage(
      BIBLE_VERSION_ID,
      `${usfm}.${chapter}`,
      "html",
      true,
      false,
      // Sem a transformação do SDK, que no servidor exige jsdom.
      false,
    );
    // O texto da API às vezes cola a palavra seguinte ao SENHOR ("Senhor</span>para", Sl 23.6).
    return passage.content.replace(/(<span class="nd">[^<]*<\/span>)(?=[A-Za-zÀ-ÿ0-9])/g, "$1 ");
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
};

/** Atribuição exigida pela licença da versão (primeiro parágrafo do copyright, em português). */
export const getBibleCopyright = async () => {
  const { copyright } = await bible().getVersion(BIBLE_VERSION_ID);
  return copyright?.split("\n").slice(0, 3).join("\n") ?? null;
};

/**
 * Links antigos usavam o número do livro (1 = Gênesis … 66 = Apocalipse). Devolve o
 * código USFM correspondente, ou `null` se o parâmetro já não é numérico.
 */
export const getLegacyBookId = async (param: string) => {
  if (!/^\d+$/.test(param)) return null;
  const books = await getBibleBooks();
  return books[Number(param) - 1]?.id ?? null;
};

/** O texto da Bíblia não muda: as páginas geradas valem por 30 dias. */
export const BIBLE_REVALIDATE = 60 * 60 * 24 * 30;
