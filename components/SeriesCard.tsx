import React from 'react';
import {FiPlay} from 'react-icons/fi';
import styles from '../styles/components/SeriesCard.module.scss'
import {ISeries} from "../interfaces/Series";

interface ISeriesCard {
    data: ISeries
    onClick: () => void
}

const SeriesCard: React.FC<ISeriesCard> = ({data, onClick}) => {
    return (
        <div onClick={onClick} className={styles.seriesCardContainer}
             style={{background: "url('" + data.image + "') center/cover"}}>
            <div>
                <div><FiPlay/> <span>Vídeo</span></div>
                <h4>{data.title}</h4>
                {/*<p>Marco Oliveira</p>*/}
                <div>
                    {/*<div>Público: Adolescentes</div>*/}
                    <div>{data.series_contents.length} episódios</div>
                </div>
            </div>
        </div>
    );
}

export default SeriesCard;
