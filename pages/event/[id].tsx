import type { GetStaticPaths, NextPage } from 'next'
import Website from '../../layout/container/Website'
import DividerMobile, { EDividerColors } from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import { Api } from "../../services/api";
import { IContent } from "../../interfaces/Contens";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import useHeader from "../../hooks/useHeader";
import HeaderContainer from "../../components/HeaderContainer";
import ContentPage from '../../components/ContentPage';
import FooterPage from '../../components/FooterPage';
import { FiBookOpen, FiList } from 'react-icons/fi';

interface IEventPage {
  data: IContent
}

interface IParams {
  params: {
    id: string
  }
}

const Event: NextPage<IEventPage> = ({ data }) => {
  const { open, toggleMenu } = useMenu()
  const { goBack, goTo: goToHook } = useAppNavigation()
  const { scrollActive, changeScroll } = useHeader()

  const goTo = async (pathname: string) => {
    await goToHook({ pathname, showLoading: true })
  }

  return (
    <Website title={`${data.name} - ${data.author?.name}`} img={data.image} changeScroll={changeScroll} hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
      <>
        <HeaderContainer active={scrollActive} >
          <Header goBack={() => goBack({})} toggleMenu={toggleMenu} />
        </HeaderContainer>
        <HeaderPage background={data.image} />
        <DividerMobile color={EDividerColors.white} />
        <ContentPage content={data} />
        <FooterPage
          options={
            data.series_contents?.map(item => ({
              text: `${item.series.title}`,
              title: 'Assista a série completa',
              icon: <FiList />,
              action: () => goTo(`/series/${item.series.uuid}`)
            }))
          }
        />
      </>
    </Website>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }: IParams) {
  const api = new Api()
  const data = await api.getContent(params.id)

  if (!data) {
    return {
      notFound: true,
    };
  }
  return { props: { data } }
}

export default Event
