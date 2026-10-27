import type { NextPage } from 'next'
import { Container } from '@/components/ui/Container'
import Website from '../../layout/container/Website'
import AppHeader from "../../components/AppHeader";
import Reveal from "../../components/Reveal";
import ListLink from "../../components/ListLink";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { ILyric } from '../../interfaces/Lyric';
import { Api } from '../../services/api';

interface ILyricsList {
  lyrics: ILyric[],
  type: string
}

const LyricsList: NextPage<ILyricsList> = ({ lyrics, type }) => {
  const { goTo } = useAppNavigation()

  return (
    <Website title={type} hasTabNavigator={false}>
      <>
        <AppHeader title={type} />
        <Container className="pt-6 pb-16">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {lyrics && lyrics.map((item, i) => (
              <Reveal as="li" index={i} key={item.number}>
                <ListLink
                  prefix={item.number}
                  label={item.name}
                  onClick={() => goTo({ pathname: "/lyrics/type/" + type.toLowerCase() + "/" + item.number })}
                />
              </Reveal>
            ))}
          </ul>
        </Container>
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
