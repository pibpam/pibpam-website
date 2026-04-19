import React, { FC, useContext } from "react";
import Website from "../../layout/container/Website";
import useMenu from "../../hooks/useMenu";
import useHeader from "../../hooks/useHeader";
import HeaderContainer from "../../components/HeaderContainer";
import Header from "../../components/Header";
import { UserContext } from "../../contexts/user";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import * as S from "./styles";
import { PiCalendar, PiUsers } from "react-icons/pi";

const Member: FC = () => {
  const { open, toggleMenu } = useMenu();
  const { scrollActive, changeScroll } = useHeader();
  const { goTo } = useAppNavigation();

  const { user, logout } = useContext(UserContext);

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
            Nesta área você irá encontrar recursos destinados a membresia da sua
            igreja.
          </p>

          {!hasMember && (
            <S.Alert>
              <h1>Atenção</h1>
              <p>
                Seu cadastro de membro ainda não foi ativado. Aguarde a
                confirmação da administração.
              </p>
            </S.Alert>
          )}

          <S.Content>
            <S.Buttons>
              <button
                disabled={!hasMember}
                onClick={() => goTo({ pathname: "/member/rotation" })}
              >
                <PiCalendar />
                <span>Escalas</span>
              </button>

              <button
                disabled={!hasMember}
                onClick={() => goTo({ pathname: "/member/cohorts" })}
              >
                <PiUsers />
                <span>Turmas</span>
              </button>
            </S.Buttons>
          </S.Content>

          <S.SignOutButton onClick={handleLogout}>Sair</S.SignOutButton>
        </S.Container>
      </>
    </Website>
  );
};

export default Member;
