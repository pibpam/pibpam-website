import React from "react";
import BlockHeader from "../BlockHeader";
import {FiArrowLeft, FiArrowRight, FiCalendar} from "react-icons/fi";
import Carousel from "../../Carousel";
import ProgramCard from "../../ProgramCard";
import {IScheduleDate} from "../../../interfaces/Schedule";
import { CarousselControlls, Container, Content } from "./styles"

interface ISchedule {
    goTo: (pathname: string) => void
    schedules: IScheduleDate[]
}

const Schedule: React.FC<ISchedule> = ({goTo, schedules}) => {
    return (
        <Container>
            <Content>
                <BlockHeader
                    icon={<FiCalendar/>}
                    title="Programação da Semana"
                />
                <CarousselControlls>
                    <p>
                        Selecione o evento para mais detalhes. <a onClick={() => goTo("/schedule")} >Ver tudo.</a>
                    </p>
                    {/*<div>*/}
                    {/*    <button>*/}
                    {/*        <FiArrowLeft/>*/}
                    {/*    </button>*/}
                    {/*    <button>*/}
                    {/*        <FiArrowRight/>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </CarousselControlls>
            </Content>
            <div>
                <Carousel>
                    <>
                        {schedules.map(item => (
                            <ProgramCard
                                key={item.uuid}
                                schedule={item}
                                onClick={() => goTo("/schedule/" + item.uuid)}
                            />
                        ))}
                    </>
                </Carousel>
            </div>
        </Container>
    )
}

export default Schedule
