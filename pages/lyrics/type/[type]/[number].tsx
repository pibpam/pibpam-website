import type { NextPage } from 'next'
import { Container } from '@/components/ui/Container'
import Website from '../../../../layout/container/Website'
import AppHeader from "../../../../components/AppHeader";
import { Api } from '../../../../services/api';
import { ILyric } from '../../../../interfaces/Lyric';
import { LYRICS_REVALIDATE } from '../../../../utils/revalidate';

interface ILyricPage {
  lyric: ILyric
  type: string
}

const LyricPage: NextPage<ILyricPage> = ({ lyric, type }) => {
  return (
    <Website title={`${lyric.name}`} hasTabNavigator={false}>
      <>
        <AppHeader title={`${type.toUpperCase()} - ${lyric.number}`} />
        <Container className="pt-6 pb-16">
          <div className="mx-auto max-w-[700px]">
            <h1 className="text-2xl font-extrabold tracking-tight text-balance">
              <span className="mr-2 text-brand-strong tabular-nums">{lyric.number}</span>
              {lyric.name}
            </h1>
            {lyric.author && <p className="mt-2 text-ink-muted">{lyric.author}</p>}
            <div
              className="mt-6 text-lg leading-8 [&_p]:mb-6"
              dangerouslySetInnerHTML={{ __html: lyric.lyric }}
            />
          </div>
        </Container>
      </>
    </Website>
  )
}

// Os hinos são gerados sob demanda (e guardados em cache), não no build.
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

interface IParams {
  params: {
    type: string
    number: string
  }
}

export async function getStaticProps({ params }: IParams) {
  // A API responde 200 a qualquer URL (hinário desconhecido cai no CC; número inexistente vem
  // vazio): sem validar aqui, URLs inválidas viram páginas em vez de 404.
  if (!['cc', 'hcc'].includes(params.type) || !/^\d+$/.test(params.number)) {
    return { notFound: true }
  }

  const api = new Api()
  const lyric = await api.getLyric(Number(params.number), params.type)
  if (!lyric) {
    return { notFound: true, revalidate: LYRICS_REVALIDATE }
  }

  return { props: { lyric, type: params.type }, revalidate: LYRICS_REVALIDATE }
}

export default LyricPage
