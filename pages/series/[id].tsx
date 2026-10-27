import type { GetStaticPaths, NextPage } from 'next'
import Image from 'next/image'
import { FiList } from "react-icons/fi";
import { Container } from '@/components/ui/Container'
import Website from '../../layout/container/Website'
import AppHeader from "../../components/AppHeader";
import AppVideoCard from "../../components/AppVideoCard";
import AppShareButton from '../../components/AppShareButton';
import { Api } from "../../services/api";
import { ISeries } from "../../interfaces/Series";

interface ISeriesDetailPage {
  data: ISeries
}

interface IParams {
  params: {
    id: string
  }
}

const SeriesDetail: NextPage<ISeriesDetailPage> = ({ data }) => {
  const count = data.series_contents.length

  return (
    <Website title={`${data.title}`} hasTabNavigator={false}>
      <>
        <AppHeader title="Série" />
        <Container className="pt-5 pb-16">
          {data.image && (
            <div className="relative aspect-video overflow-hidden rounded-md bg-pine-soft">
              <Image src={data.image} alt="" fill priority sizes="100vw" className="object-cover" />
            </div>
          )}
          <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-balance">{data.title}</h1>
          {data.description && (
            <p className="mt-2 text-lg leading-relaxed whitespace-pre-line text-ink-muted">{data.description}</p>
          )}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 font-semibold text-brand-strong">
              <FiList aria-hidden /> {count} {count === 1 ? "mensagem" : "mensagens"}
            </span>
            <AppShareButton url={`https://pibpam.org/series/${data.uuid}`} message={`${data.title}, ${data.description}.`} />
          </div>

          <ul className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.series_contents.map(item => (
              <li key={item.content.uuid}>
                <AppVideoCard content={item.content} />
              </li>
            ))}
          </ul>
        </Container>
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
  const data = await api.getOneSeries(params.id)
  if (!data) {
    return {
      notFound: true,
    };
  }
  return { props: { data } }
}

export default SeriesDetail
