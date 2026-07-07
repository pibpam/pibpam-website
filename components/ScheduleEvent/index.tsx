import React from "react";
import {FiCalendar, FiClock, FiExternalLink} from "react-icons/fi";
import {IScheduleDate} from "../../interfaces/Schedule";
import {DateUtils} from "../../utils/Date";
import { Backdrop, Container, Content, ExternalLink, Thumb } from "./styles"

interface IScheduleEvent {
    onClick: () => void
    schedule: IScheduleDate
}

const ScheduleEvent: React.FC<IScheduleEvent> = ({onClick, schedule}) => {
    return (
        <Container onClick={onClick}>
            <ExternalLink><FiExternalLink/></ExternalLink>
            <Thumb>
                <Content>
                    <h4>{schedule.schedule.title}</h4>
                    <p>{schedule.schedule.shortDescription}</p>
                    <div>
                        <div>{schedule.schedule.publicSchedule  && (<>Público: {schedule.schedule.publicSchedule}</>)} </div>
                        <div>
                            <span><FiCalendar/> {DateUtils.formatDateDayAndMonth(schedule.scheduleDate)}</span>
                            <span><FiClock/> {DateUtils.formatTime(schedule.scheduleDate)}</span>
                        </div>
                    </div>
                </Content>
                <Backdrop
                     style={{background: "url('" + schedule.schedule.image + "') center/cover"}}/>
            </Thumb>
        </Container>
    )
}

export default ScheduleEvent
