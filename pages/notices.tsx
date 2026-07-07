import type { NextPage } from 'next'
import { Container, Header, NoticeItem } from '../styles/Notices'
import Website from '../layout/container/Website'
import DividerMobile, { EDividerColors } from "../components/DividerMobile";
import HeaderComp from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import React, { useContext, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { useAppNavigation } from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";
import HeaderContainer from "../components/HeaderContainer";
import { NoticesContext } from "../contexts/notices";
import { DateUtils } from '../utils/Date';
import EmptyState from '../components/EmptyState';

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
          <HeaderComp goBack={() => goBack({})} toggleMenu={toggleMenu} />
        </HeaderContainer>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <HeaderPage title={<>Avisos</>} />
        <DividerMobile color={EDividerColors.white} />
        <Container>

          {!notices.length && (
            <EmptyState />
          )}

          {notices.map(notice => (
            <>
              <Header>
                <div>
                  {DateUtils.formatDateTimeWithWeekDay(notice.notice[0].publishDate)}
                </div>
              </Header>
              {notice.notice.map(item => (
                <NoticeItem key={item.uuid} $addAnimation={!item.seem}>
                  <p>
                    {item.notice}
                  </p>
                  <span>
                    {DateUtils.formatTime(item.publishDate)} <FiCheck />
                  </span>
                </NoticeItem>
              ))}
            </>
          ))}
        </Container>
      </>
    </Website>
  )
}

export default Notices
