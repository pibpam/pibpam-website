import React from "react";
import styles from "../../../styles/components/Home/Series.module.scss";
import BlockHeader from "../BlockHeader";
import {FiFilm} from "react-icons/fi";
import Carousel from "../../Carousel";
import SeriesCard from "../../SeriesCard";

const Series: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <BlockHeader
                    icon={<FiFilm color={"#383838"}  />}
                    title="Séries de Ministrações"
                />
                <div className={styles.caroussel_controlls}>
                    <p>
                        Nossas séries, são sequências de estudos sobre determinas assuntos.
                    </p>
                </div>
            </div>
            <div>
                <Carousel>
                    <>
                        <SeriesCard/>
                        <SeriesCard/>
                        <SeriesCard/>
                        <SeriesCard/>
                        <SeriesCard/>
                    </>
                </Carousel>
            </div>
        </div>
    )
}

export default  Series