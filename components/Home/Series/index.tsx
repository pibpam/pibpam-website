import React from "react";
import styles from "../../../styles/components/Home/Series.module.scss";
import BlockHeader from "../BlockHeader";
import {FiFilm} from "react-icons/fi";
import Carousel from "../../Carousel";
import SeriesCard from "../../SeriesCard";
import {ISeries} from "../../../interfaces/Series";

interface ISeriesComponent {
    series: ISeries[]
    goTo: (pathname: string) => void
}

const Series: React.FC<ISeriesComponent> = ({series, goTo}) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <BlockHeader
                    icon={<FiFilm color={"#383838"}/>}
                    title="Séries de Ministrações"
                />
                <div className={styles.caroussel_controlls}>
                    <p>
                        Nossas séries, são sequências de estudos sobre determinados assuntos. <a onClick={() => goTo("/series")}>Ver tudo.</a>
                    </p>
                </div>
            </div>
            <div>
                <Carousel>
                    <>
                        {series.map(item =>
                            <div key={item.uuid} className={styles.card_container}>
                                <SeriesCard onClick={() => goTo("/series/" + item.uuid)} data={item}/>
                            </div>
                        )}
                    </>
                </Carousel>
            </div>
        </div>
    )
}

export default Series
