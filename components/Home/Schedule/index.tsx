import React from "react";
import BlockHeader from "../BlockHeader";
import styles from "../../../styles/components/Home/Schedule.module.scss"
import {FiArrowLeft, FiArrowRight, FiCalendar} from "react-icons/fi";
import Carousel from "../../Carousel";
import ProgramCard from "../../ProgramCard";
import {IScheduleDate} from "../../../interfaces/Schedule";

interface ISchedule {
    goTo: (pathname: string) => void
    schedules: IScheduleDate[]
}

const Schedule: React.FC<ISchedule> = ({goTo, schedules}) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <BlockHeader
                    icon={<FiCalendar/>}
                    title="Programação da Semana"
                />
                <div className={styles.caroussel_controlls}>
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
                </div>
            </div>
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
        </div>
    )
}

export default Schedule
