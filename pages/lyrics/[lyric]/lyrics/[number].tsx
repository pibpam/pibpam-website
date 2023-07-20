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
}

const BibleVerses: NextPage<IBible> = ({ lyric }) => {
  const { open, toggleMenu } = useMenu()
  const { goBack } = useAppNavigation()

  return (
    <Website title={`${lyric.name}`} hasTabNavigator={false} openMenu={open}
      toggleMenu={toggleMenu}>
      <>
        <div className={styles.header_container}>
          <Header goBack={() => goBack({})} title={`Cantor Cristão`}
            toggleMenu={toggleMenu} />
        </div>
        <DividerMobile color={EDividerColors.white} />
        <div className={styles.container_lyric}>
          <h4> <span>{lyric.number}</span> {lyric.name}</h4>
          <div dangerouslySetInnerHTML={{ __html: lyric.lyric }} ></div>
        </div>
      </>
    </Website>
  )
}

export async function getStaticPaths() {
  const api = new Api()
  const lyrics = await api.getAllLyrics()
  const data = [] as { lyric: string, number: string }[]

  lyrics.forEach(book => {
    data.push({
      lyric: 'cc',
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
    lyric: string
    number: number
  }
}

export async function getStaticProps({ params }: IParams) {
  const api = new Api()
  const lyric = await api.getLyric(params.number)

  return { props: { lyric } }
}

export default BibleVerses
