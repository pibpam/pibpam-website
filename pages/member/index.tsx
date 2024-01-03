import type { NextPage } from 'next'
import React, { useContext } from "react";
import Website from '../../layout/container/Website';
import useMenu from '../../hooks/useMenu';
import useHeader from '../../hooks/useHeader';
import HeaderContainer from '../../components/HeaderContainer';
import Header from '../../components/Header';
import { UserContext } from '../../contexts/user';
import { FiBook, FiCalendar } from 'react-icons/fi';
import styles from "../../styles/Member.module.scss"
import { useAppNavigation } from '../../hooks/useAppNavigation';


const Member: NextPage = () => {
  const { open, toggleMenu } = useMenu()
  const { scrollActive, changeScroll } = useHeader()
  const {goTo} = useAppNavigation()

  const {user} = useContext(UserContext)

  return (
    <Website hasTabNavigator={false} title={"Área de membros"} changeScroll={changeScroll} openMenu={open} toggleMenu={toggleMenu}>
      <>
        <HeaderContainer active={scrollActive}>
          <Header toggleMenu={toggleMenu} />
        </HeaderContainer>
        <div className={styles.container}>
          <h1>Olá, {user?.member?.name?.split(" ")[0]}</h1>
          <p>
            Nesta área você irá encontrar recursos destinados a membresia da sua igreja. 
          </p>
          <div className={styles.buttons}  >
            <button onClick={() => goTo({ pathname: '/member/rotation' })} >
              <FiCalendar/>
              <span>Escalas</span>
            </button>

            <button>
              <FiBook />
              <span>Planos de Leituras</span>
            </button>
          </div>
        </div>
      </>
    </Website>
  )
}

export default Member
