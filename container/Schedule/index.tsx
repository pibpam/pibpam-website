import React, { useRef, useState } from 'react';
import { ISchedule } from '../../pages/schedule';
import { IScheduleDate } from '../../interfaces/Schedule';
import useMenu from '../../hooks/useMenu';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import useHeader from '../../hooks/useHeader';
import Website from '../../layout/container/Website';
import HeaderContainer from '../../components/HeaderContainer';
import Header from '../../components/Header';
import HeaderPage from '../../components/HeaderPage';
import DividerMobile from '../../components/DividerMobile';
import { EDividerColors } from '../../components/Divider';
import Title from '../../components/Title';
import ScheduleEvent from '../../components/ScheduleEvent';
import ProgramCard from '../../components/ProgramCard';
import FooterPage from '../../components/FooterPage';
import { FiBookOpen, FiPlay } from 'react-icons/fi';
import Modal from '../../components/Modal';
import DetailsSchedule from './Details';
import { Container, ContainerModal, Content, Grid } from './styles';


const ScheduleContainer: React.FC<ISchedule> = ({ highlighted, schedules, churchSchedules, uuid}) => {
  const { open, toggleMenu } = useMenu()
  const { goTo: goToHook } = useAppNavigation()
  const { scrollActive, changeScroll } = useHeader()
  const [selectedEvent, setSelectedEvent] = useState<IScheduleDate | undefined>([...highlighted, ...schedules].find(item => item.uuid === uuid))
  const waitToClick = useRef(false)

  const goTo = async (pathname: string) => {
    await goToHook({ pathname, showLoading: true })
  }

  const handleOpen = (data?: IScheduleDate) => {
    if (waitToClick.current && data) {
      return
    }

    waitToClick.current = true
    setSelectedEvent(data)

    if (!data) {
      setTimeout(() => {
        waitToClick.current = false
      }, 1000)
    }
  }

  return (
    <Website title={"Agenda"} changeScroll={changeScroll} openMenu={open} toggleMenu={toggleMenu}>
      <>
        <HeaderContainer active={scrollActive}>
          <Header toggleMenu={toggleMenu} />
        </HeaderContainer>
        <HeaderPage
          title={"Agenda"}
        />
        <DividerMobile color={EDividerColors.white} />

        {/* {churchSchedules && !!churchSchedules.length && (
          <>
            <Title>Cultos e Exposições</Title>

            <div className={styles.content}>
              {churchSchedules.map(item => <ScheduleItem key={item.uuid} data={item} />)}
            </div>

            <Title>Ascensão</Title>
            <div className={styles.content}>
              <ScheduleItem data={{
                uuid: '',
                created_at: '',
                text: 'Escola Bíblica',
                day: 'Quarta-feira',
                time: '19:30'
              }} />

              <ScheduleItem data={{
                uuid: '',
                created_at: '',
                text: 'Exposição Bíblica',
                day: 'Domingo',
                time: '19:30'
              }} />
            </div>

          </>
        )} */}

        {!!highlighted.length && (
          <>
            <Title>Destaques</Title>
            <Content>
              {
                highlighted.map(item => (
                  <ScheduleEvent key={item.uuid} schedule={item}
                    onClick={() => handleOpen(item)} />
                ))
              }
            </Content>
          </>
        )}

        {!!schedules.length && (
          <>
            <Title>Próximas Agendas</Title>
            <Container>
              <Grid>
                {schedules.map(item => (
                  <ProgramCard schedule={item} key={item.uuid}
                    onClick={() => handleOpen(item)} />
                ))}
              </Grid>
            </Container>
          </>)}
        <FooterPage
          options={[
            {
              text: "Cultos",
              icon: <FiPlay />,
              action: () => goTo("/events")
            },
            {
              text: "Devocionais",
              icon: <FiBookOpen />,
              action: () => goTo("/devotionals")
            }
          ]}
        />

        <Modal blockClick isOpen={!!selectedEvent} onClose={() => handleOpen(undefined)} >
          <ContainerModal>
            {selectedEvent && (
              <DetailsSchedule data={selectedEvent} />
            )}
          </ContainerModal>
        </Modal>
      </>
    </Website>
  )
}

export default ScheduleContainer;