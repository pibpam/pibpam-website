import type { GetServerSideProps, NextPage } from "next";
import Website from "../../layout/container/Website";
import Header from "../../components/Header";
import HeaderContainer from "../../components/HeaderContainer";
import InscriptionFlow from "../../components/Inscription";
import { Page, Wrapper } from "../../styles/Inscription";
import useMenu from "../../hooks/useMenu";
import useHeader from "../../hooks/useHeader";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { Api } from "../../services/api";
import { IEventDetail } from "../../interfaces/Event";

interface IInscriptionPage {
  event: IEventDetail;
}

const InscriptionPage: NextPage<IInscriptionPage> = ({ event }) => {
  const { open, toggleMenu } = useMenu();
  const { scrollActive, changeScroll } = useHeader();
  const { goBack } = useAppNavigation();

  return (
    <Website
      title={`Inscrição · ${event.name}`}
      hasTabNavigator={false}
      changeScroll={changeScroll}
      openMenu={open}
      toggleMenu={toggleMenu}
    >
      <>
        <HeaderContainer active={true}>
          <Header
            goBack={() => goBack({ fallback: "/inscricoes" })}
            toggleMenu={toggleMenu}
          />
        </HeaderContainer>
        <Page>
          <Wrapper>
            <InscriptionFlow event={event} />
          </Wrapper>
        </Page>
      </>
    </Website>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const uuid = params?.uuid;

  if (!uuid || typeof uuid !== "string") {
    return { notFound: true };
  }

  try {
    const api = new Api();
    const event = await api.getEvent(uuid);
    return { props: { event } };
  } catch (error: any) {
    // Evento inexistente ou ainda em rascunho → 404
    return { notFound: true };
  }
};

export default InscriptionPage;
