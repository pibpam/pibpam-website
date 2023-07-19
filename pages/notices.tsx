import type { NextPage } from 'next'
import styles from '../styles/Notices.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, { EDividerColors } from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import React, { useContext, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { useAppNavigation } from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";
import HeaderContainer from "../components/HeaderContainer";
import { NoticesContext } from "../contexts/notices";
import { DateUtils } from '../utils/Date';

const Notices: NextPage = () => {
  const { open, toggleMenu } = useMenu()
  const { goBack } = useAppNavigation()
  const { scrollActive, changeScroll } = useHeader()
  const { checkAllSeem, notices } = useContext(NoticesContext)

  useEffect(() => {
    setTimeout(() => {
      checkAllSeem()
    }, 5000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Website title={"Avisos"} changeScroll={changeScroll} openMenu={open} toggleMenu={toggleMenu}>
      <>
        <HeaderContainer active={scrollActive}>
          <Header goBack={() => goBack({})} toggleMenu={toggleMenu} />
        </HeaderContainer>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <HeaderPage title={<>Avisos</>} />
        <DividerMobile color={EDividerColors.white} />
        {/* <div className={styles.container}>
          {notices.map(notice => (
            <>
              <div className={styles.header}>
                <div>
                  {DateUtils.formatDateTimeWithWeekDay(notice.date)}
                </div>
              </div>
              {notice.notice.map(item => (
                <div key={item.uuid} className={`${styles.noticeItem} ${!item.seem && styles.addAnimation}`}>
                  <p>
                    {item.notice}
                  </p>
                  <span>
                    {DateUtils.formatTime(item.publishDate)} <FiCheck />
                  </span>
                </div>
              ))}
            </>
          ))}
        </div> */}
      </>
    </Website>
  )
}

export default Notices
