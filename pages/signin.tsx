import type { NextPage } from 'next'
import styles from '../styles/Signin.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, { EDividerColors } from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import React from "react";
import { useAppNavigation } from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";
import HeaderContainer from "../components/HeaderContainer";

const SignIn: NextPage = () => {
  const { open, toggleMenu } = useMenu()
  const { goBack } = useAppNavigation()
  const { scrollActive, changeScroll } = useHeader()

  return (
    <Website title={"Login"} changeScroll={changeScroll} openMenu={open} hasTabNavigator={false} toggleMenu={toggleMenu}>
      <>
        <HeaderContainer active={scrollActive}>
          <Header goBack={() => goBack({})} toggleMenu={toggleMenu} />
        </HeaderContainer>
        <div className={styles.container}>
          <h2>Entre</h2>
          <p>Fazendo o seu login você terá acesso a mais recuros.</p>
<form action="">
  <input type="text" />
  <input type="password" />
</form>

<div>
  <a href="">Esqueci a minha senha</a>
  <a href="">Criar uma conta</a>
</div>
      
        </div>
        <DividerMobile color={EDividerColors.yellow} />
      </>
    </Website>
  )
}


export default SignIn
