import type { NextPage } from 'next'
import styles from '../styles/Birthdays.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, { EDividerColors } from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import React from "react";
import { useAppNavigation } from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";
import HeaderContainer from "../components/HeaderContainer";
import { DateUtils } from '../utils/Date';
import { Api } from '../services/api';
import { IMemberBasic } from '../interfaces/Member';
import StringUtils from '../utils/StringUtils';

interface IBirthdays {
  data: IMemberBasic[]
}

const Birthdays: NextPage<IBirthdays> = ({ data }) => {
  const { open, toggleMenu } = useMenu()
  const { goBack } = useAppNavigation()
  const { scrollActive, changeScroll } = useHeader()

  return (
    <Website title={"Aniversariantes"} changeScroll={changeScroll} openMenu={open} toggleMenu={toggleMenu}>
      <>
        <HeaderContainer active={scrollActive}>
          <Header goBack={() => goBack({})} toggleMenu={toggleMenu} />
        </HeaderContainer>
        <HeaderPage title={<>Aniversariantes</>} />
        <DividerMobile color={EDividerColors.white} />
        <div className={styles.container}>
          <h2>{StringUtils.capitalizeFirstLetter(DateUtils.getMonthStr(new Date().toISOString()))}</h2>

          {data.map(member => (
            <div className={styles.item} key={member.name}>
              <div>
                {member.birthday}
              </div>
              <div>
                {member.name}
              </div>
            </div>
          ))}
        </div>
      </>
    </Website>
  )
}

export async function getStaticProps() {
  const api = new Api()
  const data = await api.getMonthBithDateMembers()
  return { props: { data } }
}


export default Birthdays
