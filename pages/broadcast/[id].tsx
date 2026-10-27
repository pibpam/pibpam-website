import type { NextPage } from 'next'
import Website from '../../layout/container/Website'
import AppHeader from "../../components/AppHeader";
import LivePage from '../../components/LivePage';
import { Api } from "../../services/api";
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
  return (
    <Website title={`${data.title} - ${data.author?.name}`} img={data.image} hasTabNavigator={false}>
      <>
        <AppHeader title="Transmissão" />
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
