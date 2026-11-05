// Tempo de vida (em segundos) das páginas geradas com getStaticProps. O conteúdo se atualiza
// por aqui, não por deploy: sem `revalidate` a página fica congelada até o próximo build.
// A Bíblia tem o próprio valor (BIBLE_REVALIDATE, em services/youversion.ts).

/** Cultos, séries, agenda, grupos e ministérios: o que a igreja publica durante a semana. */
export const CONTENT_REVALIDATE = 60 * 10;

/** A lista de aniversariantes só muda quando um membro é editado ou o mês vira. */
export const BIRTHDAYS_REVALIDATE = 60 * 60;

/** Os hinários quase não mudam. */
export const LYRICS_REVALIDATE = 60 * 60 * 24 * 7;
