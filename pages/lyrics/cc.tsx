import type { NextPage } from 'next'
import styles from '../../styles/Lyrics.module.scss'
import Website from '../../layout/container/Website'
import DividerMobile, { EDividerColors } from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { ILyric } from '../../interfaces/Lyric';
import { Api } from '../../services/api';
import { FiBook, FiChevronRight } from 'react-icons/fi';
import FooterPage from '../../components/FooterPage';

interface ILyricsList {
  lyrics: ILyric[]
}

const LyricsList: NextPage<ILyricsList> = ({ lyrics }) => {
  const { open, toggleMenu } = useMenu()
  const { goTo: goToHook, goBack } = useAppNavigation()

  const goTo = async (pathname: string) => {
    await goToHook({ pathname, showLoading: true })
  }

  return (
    <Website title={`Cantor Cristão`} hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
      <>
        <div className={styles.header_container}>
          <Header goBack={() => goBack({})} title={`Cantor Cristão`} toggleMenu={toggleMenu} />
        </div>
        <DividerMobile color={EDividerColors.white} />
        <div className={styles.container_books}>
          {lyrics && lyrics.map(item => (
            <button
              key={item.number}
              onClick={() => goTo("/lyrics/cc/lyrics/" + item.number)}
            >
              <span>{item.number}</span> {item.name} <FiChevronRight />
            </button>
          ))}
        </div>
        <FooterPage
          options={[
            {
              text: "Bíblia",
              icon: <FiBook />,
              action: () => goTo("/bible")
            },
          ]}
        />
      </>
    </Website>
  )
}

export async function getStaticProps() {
  const api = new Api()
  const lyrics = await api.getAllLyrics()
  return { props: { lyrics } }
}

export default LyricsList
