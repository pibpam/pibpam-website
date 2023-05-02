import React from "react";
import BlockHeader from "../BlockHeader";
import styles from "../../../styles/components/Home/Schedule.module.scss"
import {FiArrowLeft, FiArrowRight, FiCalendar} from "react-icons/fi";
import Carousel from "../../Carousel";
import ProgramCard from "../../ProgramCard";

interface ISchedule {
    goTo: (pathname: string) => void
}

const Schedule: React.FC<ISchedule> = ({goTo}) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <BlockHeader
                    icon={<FiCalendar/>}
                    title="Programação da Semana"
                />
                <div className={styles.caroussel_controlls}>
                    <p>
                        Selecione o evento para mais detalhes. <a>Ver tudo.</a>
                    </p>
                    <div>
                        <button>
                            <FiArrowLeft/>
                        </button>
                        <button>
                            <FiArrowRight/>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <Carousel>
                    <>
                        {/*<ProgramCard onClick={() => goTo("/schedule/123")}/>*/}
                        {/*<ProgramCard onClick={() => goTo("/schedule/123")}/>*/}
                        {/*<ProgramCard onClick={() => goTo("/schedule/123")}/>*/}
                        {/*<ProgramCard onClick={() => goTo("/schedule/123")}/>*/}
                        {/*<ProgramCard onClick={() => goTo("/schedule/123")}/>*/}
                    </>
                </Carousel>
            </div>
        </div>
    )
}

export default Schedule
