import type { NextPage } from 'next'
import Website from '../layout/container/Website'
import Header from "../components/Header";
import React from "react";

import HeaderContainer from "../components/HeaderContainer";
import useMenu from "../hooks/useMenu";
import { useAppNavigation } from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";
import HeaderPage from "../components/HeaderPage";
import DividerMobile, { EDividerColors } from "../components/DividerMobile";
import EmptyState from "../components/EmptyState";
import styles from "../styles/404.module.scss"

const NotFound: NextPage = () => {
  const { open, toggleMenu } = useMenu()
  const { goBack } = useAppNavigation()
  const { scrollActive, changeScroll } = useHeader()

  return (
    <Website title={"404"} changeScroll={changeScroll} openMenu={open} toggleMenu={toggleMenu}>
      <>
        <HeaderContainer active={scrollActive}>
          <Header goBack={() => goBack({})} toggleMenu={toggleMenu} />
        </HeaderContainer>
        <HeaderPage title={"404"} />
        <DividerMobile color={EDividerColors.white} />
        <div className={styles.container}>
          <EmptyState description={"Ops! O que você procura não está mais aqui!"} />
        </div>
      </>
    </Website>
  )
}

export default NotFound
