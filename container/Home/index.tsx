import React, { FC, useContext } from "react";
import {
  PiBookBookmark,
  PiBookOpenText,
  PiCake,
  PiCalendarBlank,
  PiChurch,
  PiFilmSlate,
  PiMusicNotes,
  PiPlayCircle,
  PiSignIn,
  PiUsers,
} from "react-icons/pi";
import Website from "../../layout/container/Website";
import HeaderContainer from "../../components/HeaderContainer";
import Header from "../../components/Header";
import ShortcutCard from "../../components/ShortcutCard";
import useMenu from "../../hooks/useMenu";
import useHeader from "../../hooks/useHeader";
import usePostMessage from "../../hooks/usePostMessage";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { UserContext } from "../../contexts/user";
import { LivesContext } from "../../contexts/lives";
import LiveCard from "./LiveCard";
import * as S from "./styles";

const CHURCH_ABOUT_URL = "https://pibpam.org/sobre";

const Home: FC = () => {
  const { open, toggleMenu } = useMenu();
  const { scrollActive, changeScroll } = useHeader();
  const { goTo: goToHook } = useAppNavigation();
  const { openLink } = usePostMessage();
  const { user } = useContext(UserContext);
  const { lives } = useContext(LivesContext);

  const live = lives?.[0];
  const firstName = (user?.member?.name || user?.name)?.split(" ")[0];
  const greetingName = firstName
    ? firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    : "";

  const goTo = (pathname: string) =>
    goToHook({ pathname, showLoading: true });

  return (
    <Website
      changeScroll={changeScroll}
      openMenu={open}
      toggleMenu={toggleMenu}
    >
      <>
        <HeaderContainer active={scrollActive}>
          <Header toggleMenu={toggleMenu} />
        </HeaderContainer>
        <S.Container>
          <S.Welcome>
            <h1>{greetingName ? `Olá, ${greetingName}!` : "Bem-vindo!"}</h1>
            <p>Primeira Igreja Batista em Pará de Minas</p>
          </S.Welcome>

          {live && (
            <LiveCard
              live={live}
              onClick={() => goTo("/broadcast/" + live.uuid)}
            />
          )}

          <S.Grid>
            {user?.id ? (
              <ShortcutCard
                horizontal
                icon={<PiUsers />}
                title="Área de Membros"
                description="Recursos para membresia e ministérios"
                onClick={() => goTo("/member")}
              />
            ) : (
              <ShortcutCard
                horizontal
                icon={<PiSignIn />}
                title="Entrar / Cadastrar"
                description="Acesse a área de membros"
                onClick={() => goTo("/login")}
              />
            )}
            <ShortcutCard
              external
              icon={<PiChurch />}
              title="Sobre a igreja"
              description="História, contatos e localização"
              onClick={() => openLink(CHURCH_ABOUT_URL)}
            />
            <ShortcutCard
              icon={<PiBookBookmark />}
              title="Plano de Leitura"
              description="Comentada e devocional"
              onClick={() => goTo("/reading-plan")}
            />
            <ShortcutCard
              icon={<PiPlayCircle />}
              title="Cultos"
              description="Assista aos cultos"
              onClick={() => goTo("/events")}
            />
            <ShortcutCard
              icon={<PiFilmSlate />}
              title="Séries"
              description="Séries de mensagens"
              onClick={() => goTo("/series")}
            />
            <ShortcutCard
              icon={<PiBookOpenText />}
              title="Bíblia"
              description="Leia a Palavra"
              onClick={() => goTo("/bible")}
            />
            <ShortcutCard
              icon={<PiMusicNotes />}
              title="Hinários"
              description="CC // HCC"
              onClick={() => goTo("/lyrics")}
            />
            <ShortcutCard
              icon={<PiCalendarBlank />}
              title="Agenda"
              description="Programação da igreja"
              onClick={() => goTo("/schedule")}
            />
            <ShortcutCard
              icon={<PiCake />}
              title="Aniversariantes"
              description="Quem faz aniversário no mês"
              onClick={() => goTo("/birthdays")}
            />
          </S.Grid>
        </S.Container>
      </>
    </Website>
  );
};

export default Home;
