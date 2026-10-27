import type { NextPage } from 'next'
import { Container } from '@/components/ui/Container'
import Website from '../layout/container/Website'
import AppHeader from "../components/AppHeader";
import Reveal from "../components/Reveal";
import ListLink from "../components/ListLink";
import { useAppNavigation } from "../hooks/useAppNavigation";

const Lyrics: NextPage = () => {
  const { goTo } = useAppNavigation()

  const open = (pathname: string) => goTo({ pathname })

  return (
    <Website title={"Hinários"} hasTabNavigator={false}>
      <>
        <AppHeader title="Hinários" />
        <Container className="pt-6 pb-16">
          <ul className="grid gap-2 sm:grid-cols-2">
            <Reveal as="li" index={0}><ListLink label="Cantor Cristão" onClick={() => open("/lyrics/cc")} /></Reveal>
            <Reveal as="li" index={1}><ListLink label="Hinário para o Culto Cristão" onClick={() => open("/lyrics/hcc")} /></Reveal>
          </ul>
        </Container>
      </>
    </Website>
  )
}

export default Lyrics
