import type { NextPage } from 'next'
import { ContainerBooks, HeaderWrap } from '../../styles/Lyrics'
import Website from '../../layout/container/Website'
import DividerMobile, { EDividerColors } from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { ILyric } from '../../interfaces/Lyric';
import { Api } from '../../services/api';
import { FiBook, FiChevronRight } from 'react-icons/fi';
import FooterPage from '../../components/FooterPage';
import { type } from 'os';

interface ILyricsList {
  lyrics: ILyric[],
  type: string
}

const LyricsList: NextPage<ILyricsList> = ({ lyrics, type }) => {
  const { open, toggleMenu } = useMenu()
  const { goTo: goToHook, goBack } = useAppNavigation()

  const goTo = async (pathname: string) => {
    await goToHook({ pathname, showLoading: true })
  }

  return (
    <Website title={type} hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
      <>
        <HeaderWrap>
          <Header goBack={() => goBack({})} title={type} toggleMenu={toggleMenu} />
        </HeaderWrap>
        <DividerMobile color={EDividerColors.white} />
        <ContainerBooks>
          {lyrics && lyrics.map(item => (
            <button
              key={item.number}
              onClick={() => goTo("/lyrics/type/" + type.toLowerCase() + "/" + item.number)}
            >
              <span>{item.number}</span> {item.name} <FiChevronRight />
            </button>
          ))}
        </ContainerBooks>
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

export async function getStaticPaths() {
  const data = [{ type: 'cc' }, { type: 'hcc' }] as { type: string }[]
  return {
    paths: data.map(item => ({ params: { ...item } })),
    fallback: false,
  }
}

interface IParams {
  params: {
    type: string
  }
}

export async function getStaticProps({ params }: IParams) {
  const api = new Api()
  const lyrics = await api.getAllLyrics(params.type)
  return { props: { lyrics, type: params.type.toUpperCase() } }
}

export default LyricsList
