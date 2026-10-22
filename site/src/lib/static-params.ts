/**
 * Com Cache Components, generateStaticParams precisa devolver ao menos um
 * item. Se a API estiver fora do ar no build, usamos um id que resulta em 404
 * e as páginas reais são geradas sob demanda na primeira visita.
 */
export const PLACEHOLDER_ID = "00000000-0000-0000-0000-000000000000";

export const atLeastOne = <T extends { id: string }>(params: T[]) =>
  params.length > 0 ? params : [{ id: PLACEHOLDER_ID }];
