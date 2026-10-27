import type { GetStaticPaths, NextPage } from 'next'
import { FiList } from 'react-icons/fi'
import { Container } from '@/components/ui/Container'
import Website from '../../layout/container/Website'
import AppHeader from "../../components/AppHeader";
import AppButton from "../../components/AppButton";
import ContentPage from '../../components/ContentPage';
import { Api } from "../../services/api";
import { IContent } from "../../interfaces/Contens";

interface IEventPage {
  data: IContent
}

interface IParams {
  params: {
    id: string
  }
}

const Event: NextPage<IEventPage> = ({ data }) => {
  return (
    <Website title={`${data.name} - ${data.author?.name}`} img={data.image} hasTabNavigator={false}>
      <>
        <AppHeader title="Culto" />
        <ContentPage content={data} />
        {!!data.series_contents?.length && (
          <Container className="-mt-8 pb-16">
            <h2 className="mb-3 text-lg font-extrabold tracking-tight">Assista a série completa</h2>
            <div className="flex flex-col items-start gap-2">
              {data.series_contents.map(item => (
                <AppButton key={item.series.uuid} variant="outline" icon={<FiList aria-hidden />}
                  href={`/series/${item.series.uuid}`}>
                  {item.series.title}
                </AppButton>
              ))}
            </div>
          </Container>
        )}
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
