import type { NextPage } from 'next'
import { Container } from '@/components/ui/Container'
import Website from '../layout/container/Website'
import AppHeader from "../components/AppHeader";
import AppBackdrop from "../components/AppBackdrop";
import AppButton from "../components/AppButton";
import LivePage from "../components/LivePage";
import { Api } from "../services/api";
import { IBroadcast } from "../interfaces/Broadcast";

interface ILive {
  lives: IBroadcast[]
}

const Live: NextPage<ILive> = ({ lives }) => {
  const live = lives[0]

  return (
    <Website title={live ? `Ao vivo - ${live.title}` : "Ao vivo"}>
      <>
        <AppHeader title="Ao vivo" tone="dark" />
        <div className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-pine pb-28 text-ink-inverse">
          <AppBackdrop />
          {live ? (
            <LivePage content={live} tone="dark" />
          ) : (
            <Container className="flex flex-col items-start gap-5 pt-12">
              <h1 className="text-3xl font-extrabold tracking-tight text-balance">Nenhuma transmissão no momento</h1>
              <p className="text-lg leading-relaxed text-ink-inverse-muted">
                Quando houver culto ao vivo, ele aparece aqui. Enquanto isso, assista aos cultos anteriores.
              </p>
              <AppButton variant="accent" href="/events">Ver cultos</AppButton>
            </Container>
          )}
        </div>
      </>
    </Website>
  )
}

export async function getServerSideProps() {
  const api = new Api()
  const lives = await api.getLives()
  return { props: { lives } }
}

export default Live
