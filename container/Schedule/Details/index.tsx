import React, { useEffect, useState } from "react";
import { FiAlertOctagon, FiCalendar, FiClock, FiEdit3, FiInfo, FiMapPin, FiUsers } from "react-icons/fi";
import useMenu from '../../../hooks/useMenu';
import useHeader from '../../../hooks/useHeader';
import useOpenMap from '../../../hooks/useOpenMap';
import usePostMessage from '../../../hooks/usePostMessage';
import Website from '../../../layout/container/Website';
import { DateUtils } from '../../../utils/Date';
import ThirdButton from '../../../components/Button/Third';
import Title from '../../../components/Title';
import YTPlayer from '../../../components/YTPlayer';
import MinistriesItem from '../../../components/MinistriesItem';
import { IScheduleDate } from '../../../interfaces/Schedule';
import { Alert, AlertMultiline, Audience, Begin, Container, DateTime, Description, ImageHeader, Location, SubscriptionButton } from './styles';

interface ISchedule {
  data: IScheduleDate
}

const DetailsSchedule: React.FC<ISchedule> = ({ data }) => {
  const { open, toggleMenu } = useMenu()
  const { changeScroll } = useHeader()
  const { getHref } = useOpenMap()
  const [mapUrl, setMapUrl] = useState('')
  const { openLink } = usePostMessage()

  useEffect(() => {
    setMapUrl(data.schedule.addressRedirect ? getHref(data.schedule.addressRedirect) : "")
  }, [data.schedule.addressRedirect, getHref])

  const goToTeam = async () => {
    // await goToHook({pathname: "/ministry/" + data.schedule.team?.uuid, showLoading: true})
  }

  const goToEnrollmentLink = () => {
    if (data.schedule.enrollmentLink) {
      openLink(data.schedule.enrollmentLink)
    }
  }

  return (
    <Website title={`${data.schedule.title}`} img={data.schedule.image} changeScroll={changeScroll} hasTabNavigator={false} openMenu={open}
      toggleMenu={toggleMenu}>
      <>
        <Begin>
          {data.schedule.image && (
            <ImageHeader src={data.schedule.image} />
          )}
          <h1>{data.schedule.title}</h1>
          <h2>{data.schedule.shortDescription}</h2>
          <DateTime>
            <div><FiCalendar />{DateUtils.formatDateDefault(data.scheduleDate)}</div>
            <div><FiClock />{DateUtils.formatTimeH(data.scheduleDate)}</div>
          </DateTime>
          {data.schedule.address && (
            <Location>
              <FiMapPin />
              <div>
                <div>{data.schedule.address}</div>
                <button onClick={() => openLink(mapUrl)}>Como chegar</button>
              </div>
            </Location>
          )}
          {data.schedule.publicSchedule && (
            <Audience>
              <FiUsers />
              <div>
                <div>Público:</div>
                <div>{data.schedule.publicSchedule}</div>
              </div>
            </Audience>
          )}
          {data.schedule.vacancies && (
            <Alert>
              <FiAlertOctagon /> Vagas limitadas.
            </Alert>
          )}

          {data.schedule.enrollmentLink && (
            <SubscriptionButton>
              <ThirdButton onClick={goToEnrollmentLink}>
                <><FiEdit3 />inscrição</>
              </ThirdButton>
            </SubscriptionButton>
          )}
        </Begin>
        {(data.schedule.description || data.schedule.extraData || data.schedule.promotionalVideo) && (
          <>
            <Title>Descrição</Title>
            <Description>
              <p dangerouslySetInnerHTML={{ __html: data.schedule.description || "" }}></p>

              {!!data.schedule.promotionalVideo && (
                <YTPlayer videoId={data.schedule.promotionalVideo} />
              )}

              {data.schedule.extraData && (
                <AlertMultiline>
                  <FiInfo />
                  <div>
                    <div>Mais informações:</div>
                    <div>{data.schedule.extraData}</div>
                  </div>
                </AlertMultiline>
              )}
            </Description>
          </>
        )}

        {data.schedule.team && (
          <>
            <Title>Organizador</Title>
            <Container>
              <MinistriesItem data={data.schedule.team} onClick={goToTeam} />
            </Container>
          </>
        )}
      </>
    </Website>
  )
}


export default DetailsSchedule
