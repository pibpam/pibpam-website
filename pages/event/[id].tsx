import type { GetStaticPaths, NextPage } from 'next'
import { FiList } from 'react-icons/fi'
import { Container } from '@/components/ui/Container'
import Website from '../../layout/container/Website'
import AppHeader from "../../components/AppHeader";
import AppButton from "../../components/AppButton";
import SectionTitle from "../../components/SectionTitle";
import Reveal from "../../components/Reveal";
import ContentPage from '../../components/ContentPage';
import { Api } from "../../services/api";
import { IContent } from "../../interfaces/Contens";
import { CONTENT_REVALIDATE } from "../../utils/revalidate";

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
          <Container className="pb-16">
            <Reveal index={4}>
            <SectionTitle>Assista a série completa</SectionTitle>
            <div className="flex flex-col items-start gap-2">
              {data.series_contents.map(item => (
                <AppButton key={item.series.uuid} variant="outline" icon={<FiList aria-hidden />}
                  href={`/series/${item.series.uuid}`}>
                  {item.series.title}
                </AppButton>
              ))}
            </div>
            </Reveal>
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
      revalidate: CONTENT_REVALIDATE,
    };
  }
  return { props: { data }, revalidate: CONTENT_REVALIDATE }
}

export default Event
