import type { NextPage } from 'next'
import styles from '../../../../styles/Lyrics.module.scss'
import Website from '../../../../layout/container/Website'
import DividerMobile, { EDividerColors } from "../../../../components/DividerMobile";
import Header from "../../../../components/Header";
import useMenu from "../../../../hooks/useMenu";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import { Api } from '../../../../services/api';
import { ILyric } from '../../../../interfaces/Lyric';

interface IBible {
  lyric: ILyric
  type: string
}

const BibleVerses: NextPage<IBible> = ({ lyric, type }) => {
  const { open, toggleMenu } = useMenu()
  const { goBack } = useAppNavigation()

  return (
    <Website title={`${lyric.name}`} hasTabNavigator={false} openMenu={open}
      toggleMenu={toggleMenu}>
      <>
        <div className={styles.header_container}>
          <Header goBack={() => goBack({})} title={`${type.toUpperCase()} - ${lyric.number}`}
            toggleMenu={toggleMenu} />
        </div>
        <DividerMobile color={EDividerColors.white} />
        <div className={styles.container_lyric}>
          <h4> <span>{lyric.number}</span> {lyric.name}</h4>
          <h5>{lyric.author}</h5>
          <div dangerouslySetInnerHTML={{ __html: lyric.lyric }} ></div>
        </div>
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

export default BibleVerses
