import React, { FC, useContext, useState } from "react";
import Website from "../../layout/container/Website";
import useMenu from "../../hooks/useMenu";
import useHeader from "../../hooks/useHeader";
import HeaderContainer from "../../components/HeaderContainer";
import Header from "../../components/Header";
import { UserContext } from "../../contexts/user";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import * as S from "./styles";
import InfoSheet from "./InfoSheet";
import Spinner from "../../components/Spinner";
import { PiCake, PiCalendar, PiTicket, PiUsers } from "react-icons/pi";
import { FiArrowRight, FiInfo } from "react-icons/fi";

const Member: FC = () => {
  const { open, toggleMenu } = useMenu();
  const { scrollActive, changeScroll } = useHeader();
  const { goTo } = useAppNavigation();
  const [infoSheetOpen, setInfoSheetOpen] = useState(false);

  const { user, logout, isLoadingUser } = useContext(UserContext);

  const hasMember = !!user?.member;

  const handleLogout = () => {
    goTo({ pathname: "/login", showLoading: true, resetHistory: true });
    logout();
  };

  const nameFormatted = (user?.member?.name || user?.name)
    ?.split(" ")[0]
    .toLowerCase();
  const nameCapitalized = nameFormatted
    ? nameFormatted.charAt(0).toUpperCase() + nameFormatted.slice(1)
    : "";

  return (
    <Website
      hasTabNavigator={false}
      title={"Área de membros"}
      changeScroll={changeScroll}
      openMenu={open}
      toggleMenu={toggleMenu}
    >
      <>
        <HeaderContainer active={scrollActive}>
          <Header toggleMenu={toggleMenu} />
        </HeaderContainer>
        <S.Container>
          <h1>Olá, {nameCapitalized}!</h1>
          <p>
            Que bom ter você por aqui! Preparamos recursos para toda a
            igreja, e alguns especiais para quem já é membro ativo.
          </p>

          {isLoadingUser ? (
            <S.Loading>
              <Spinner />
            </S.Loading>
          ) : (
            <>
              {!hasMember && (
                <S.Alert>
                  <FiInfo />
                  <S.AlertContent>
                    <strong>Cadastro de membro em análise</strong>
                    <p>
                      Você já pode usar os recursos abertos a todos abaixo. Os
                      exclusivos para membros liberam assim que a
                      administração confirmar seu cadastro.
                    </p>
                    <S.AlertLink
                      type="button"
                      onClick={() => setInfoSheetOpen(true)}
                    >
                      Como funciona o vínculo de membro?
                    </S.AlertLink>
                  </S.AlertContent>
                </S.Alert>
              )}

              <S.Cards>
                <S.Card
                  type="button"
                  onClick={() =>
                    goTo({ pathname: "/member/inscricoes", showLoading: true })
                  }
                >
                  <PiTicket />
                  <S.CardText>
                    <strong>Inscrições</strong>
                    <span>Eventos e acompanhamento das suas inscrições</span>
                  </S.CardText>
                  <FiArrowRight />
                </S.Card>

                <S.Card
                  type="button"
                  onClick={() => goTo({ pathname: "/birthdays" })}
                >
                  <PiCake />
                  <S.CardText>
                    <strong>Aniversariantes</strong>
                    <span>Veja quem faz aniversário este mês</span>
                  </S.CardText>
                  <FiArrowRight />
                </S.Card>

                <S.Card
                  type="button"
                  disabled={!hasMember}
                  onClick={() => goTo({ pathname: "/member/rotation" })}
                >
                  <PiCalendar />
                  <S.CardText>
                    <strong>Escalas</strong>
                    <span>
                      Veja, acompanhe e preencha as escalas dos ministérios
                      que você participa
                    </span>
                  </S.CardText>
                  <FiArrowRight />
                </S.Card>

                <S.Card
                  type="button"
                  disabled={!hasMember}
                  onClick={() => goTo({ pathname: "/member/cohorts" })}
                >
                  <PiUsers />
                  <S.CardText>
                    <strong>Turmas</strong>
                    <span>
                      Selecione uma turma para ver as aulas e lançar presença
                    </span>
                  </S.CardText>
                  <FiArrowRight />
                </S.Card>
              </S.Cards>
            </>
          )}

          <S.SignOutButton onClick={handleLogout}>Sair</S.SignOutButton>
        </S.Container>

        <InfoSheet
          open={infoSheetOpen}
          onClose={() => setInfoSheetOpen(false)}
        />
      </>
    </Website>
  );
};

export default Member;
