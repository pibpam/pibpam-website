import type { NextPage } from 'next'
import { Container } from '@/components/ui/Container'
import Website from '../layout/container/Website'
import AppHeader from "../components/AppHeader";
import ListLink from "../components/ListLink";
import { useAppNavigation } from "../hooks/useAppNavigation";

const Lyrics: NextPage = () => {
  const { goTo } = useAppNavigation()

  const open = (pathname: string) => goTo({ pathname, showLoading: true })

  return (
    <Website title={"Hinários"} hasTabNavigator={false}>
      <>
        <AppHeader title="Hinários" />
        <Container className="pt-6 pb-16">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li><ListLink label="Cantor Cristão" onClick={() => open("/lyrics/cc")} /></li>
            <li><ListLink label="Hinário para o Culto Cristão" onClick={() => open("/lyrics/hcc")} /></li>
          </ul>
        </Container>
      </>
    </Website>
  )
}

export default Lyrics
