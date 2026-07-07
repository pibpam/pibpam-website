import React from "react";
import {FiCalendar, FiClock, FiUsers} from "react-icons/fi";
import {IChurchSchedule} from "../../interfaces/Church";
import { Container, Left, Right } from "./styles"

interface IScheduleItem {
    data: IChurchSchedule
}

const ScheduleItem: React.FC<IScheduleItem> = ({data}) => {
    return (
        <Container>
            <Left>
                <FiUsers/>
                <div>{data.text}</div>
            </Left>
            <Right>
                <span><FiCalendar/>{data.day}</span>
                <span><FiClock/>{data.time}</span>
            </Right>
        </Container>
    )
}

export default ScheduleItem
