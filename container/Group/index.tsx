import React, { useEffect, useRef, useState } from 'react';
import useMenu from '../../hooks/useMenu';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import useHeader from '../../hooks/useHeader';
import Website from '../../layout/container/Website';
import HeaderContainer from '../../components/HeaderContainer';
import Header from '../../components/Header';
import HeaderPage from '../../components/HeaderPage';
import DividerMobile, { EDividerColors } from '../../components/DividerMobile';
import EmptyState from '../../components/EmptyState';
import FooterPage from '../../components/FooterPage';
import { FiBookOpen, FiCalendar, FiClock, FiInfo, FiMapPin } from 'react-icons/fi';
import { IGroupPage } from '../../pages/groups';
import { Begin, Container, ContainerModal, Description, Grid, Location } from './styles';
import GroupItem from '../../components/GroupItem';
import Modal from '../../components/Modal';
import { IGroup } from '../../interfaces/Group';
import Title from '../../components/Title';
import YTPlayer from '../../components/YTPlayer';
import usePostMessage from '../../hooks/usePostMessage';
import useOpenMap from '../../hooks/useOpenMap';
import { AlertMultiline, DateTime } from '../Schedule/Details/styles';

const Group: React.FC<IGroupPage> = ({ data }) => {
  const { open, toggleMenu } = useMenu()
  const { goTo: goToHook, goBack } = useAppNavigation()
  const { scrollActive, changeScroll } = useHeader()
  const [mapUrl, setMapUrl] = useState('')
  const { openLink } = usePostMessage()
  const { getHref } = useOpenMap()
  const [selectedGroup, setSelectedGroup] = useState<undefined | IGroup>(undefined)

  const waitToClick = useRef(false)

  useEffect(() => {
    setMapUrl(selectedGroup?.addressRedirect ? getHref(selectedGroup?.addressRedirect) : "")
  }, [selectedGroup?.addressRedirect, getHref])

  const goTo = async (pathname: string) => {
    await goToHook({ pathname, showLoading: true })
  }

  const handleOpen = (data?: IGroup) => {
    if (waitToClick.current && data) {
      return
    }

    waitToClick.current = true
    setSelectedGroup(data)

    if (!data) {
      setTimeout(() => {
        waitToClick.current = false
      }, 1000)
    }
  }

  return (
    <Website title={"Pequenos Grupos"} changeScroll={changeScroll} hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
      <>
        <HeaderContainer active={scrollActive}>
          <Header toggleMenu={toggleMenu} goBack={() => goBack({ fallback: '/' })} />
        </HeaderContainer>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <HeaderPage title='Pequenos Grupos' />
        <DividerMobile color={EDividerColors.white} />
        <Container>
          <Grid>
            {
              data.map(item => (<GroupItem onClick={() => { selectedGroup ? () => { } : handleOpen(item) }} group={item} key={item.uuid} />))
            }
            {!data.length && (
              <EmptyState />
            )}
          </Grid>
        </Container>
        <FooterPage
          options={[
            {
              text: "Devocionais",
              icon: <FiBookOpen />,
              action: () => goTo("/devotionals")
            },
            {
              text: "Agenda",
              icon: <FiCalendar />,
              action: () => goTo("/schedule")
            }
          ]}
        />
        <Modal blockClick isOpen={!!selectedGroup} onClose={() => handleOpen(undefined)} >
          <ContainerModal>
            {selectedGroup && (
              <>
                <Begin>
                  <h1>{selectedGroup?.title}</h1>
                  <h2>{selectedGroup?.shortDescription}</h2>
                  <DateTime>
                    <div><FiCalendar />{selectedGroup.dayDescription}</div>
                    <div><FiClock />{selectedGroup.timeDescription}</div>
                  </DateTime>
                  {selectedGroup?.address && (
                    <Location>
                      <FiMapPin />
                      <div>
                        <div>{selectedGroup?.address}</div>
                        <button onClick={() => openLink(mapUrl)}>Como chegar</button>
                      </div>
                    </Location>
                  )}
                </Begin>
                {(selectedGroup?.description || selectedGroup?.info || selectedGroup?.promotionalVideo) && (
                  <>
                    <Title>Descrição</Title>
                    <Description>
                      <p dangerouslySetInnerHTML={{ __html: selectedGroup?.description || "" }}></p>

                      {!!selectedGroup?.promotionalVideo && (
                        <YTPlayer videoId={selectedGroup?.promotionalVideo} />
                      )}

                      {selectedGroup?.info && (
                        <AlertMultiline>
                          <FiInfo />
                          <div>
                            <div>Mais informações:</div>
                            <div>{selectedGroup?.info}</div>
                          </div>
                        </AlertMultiline>
                      )}

                      {selectedGroup?.lider && (
                        <AlertMultiline>
                          <FiInfo />
                          <div>
                            <div>Líder(es):</div>
                            <div>{selectedGroup?.lider}</div>
                          </div>
                        </AlertMultiline>
                      )}
                    </Description>
                  </>
                )}
              </>
            )}
          </ContainerModal>
        </Modal>
      </>
    </Website>
  )
}

export default Group;