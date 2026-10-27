import type { NextPage } from 'next'
import { Container } from '@/components/ui/Container'
import Website from '../../../../layout/container/Website'
import AppHeader from "../../../../components/AppHeader";
import { Api } from '../../../../services/api';
import { ILyric } from '../../../../interfaces/Lyric';

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

export async function getStaticPaths() {
  const api = new Api()
  const lyricsCC = await api.getAllLyrics('cc')
  const lyricsHCC = await api.getAllLyrics('hcc')
  const data = [] as { type: string, number: string }[]

  lyricsCC.forEach(book => {
    data.push({
      type: 'cc',
      number: book.number.toString()
    })
  })

  lyricsHCC.forEach(book => {
    data.push({
      type: 'hcc',
      number: book.number.toString()
    })
  })

  return {
    paths: data.map(item => ({ params: { ...item } })),
    fallback: false,
  }
}

interface IParams {
  params: {
    type: string
    number: number
  }
}

export async function getStaticProps({ params }: IParams) {
  const api = new Api()
  const lyric = await api.getLyric(params.number, params.type)

  return { props: { lyric, type: params.type } }
}

export default LyricPage
