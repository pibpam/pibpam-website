import type { NextPage } from 'next'
import Website from '../../layout/container/Website'
import DividerMobile, { EDividerColors } from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import { Api } from "../../services/api";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import useHeader from "../../hooks/useHeader";
import HeaderContainer from "../../components/HeaderContainer";
import LivePage from '../../components/LivePage';
import { IBroadcast } from '../../interfaces/Broadcast';

interface IBroadcastPage {
  data: IBroadcast
}

interface IParams {
  params: {
    id: string
  }
}

const Broadcast: NextPage<IBroadcastPage> = ({ data }) => {
  const { open, toggleMenu } = useMenu()
  const { goBack } = useAppNavigation()
  const { scrollActive, changeScroll } = useHeader()

  return (
    <Website title={`${data.title} - ${data.author?.name}`} img={data.image} changeScroll={changeScroll} hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
      <>
        <HeaderContainer active={scrollActive} >
          <Header goBack={() => goBack({})} toggleMenu={toggleMenu} />
        </HeaderContainer>
        <HeaderPage background={data.image} />
        <DividerMobile color={EDividerColors.white} />
        <LivePage content={data} />
      </>
    </Website>
  )
}

export async function getServerSideProps({ params }: IParams) {
  const api = new Api()
  const data = await api.getBroadcast(params.id)
  if (!data) {
    return {
      notFound: true,
    };
  }
  return { props: { data } }
}

export default Broadcast
