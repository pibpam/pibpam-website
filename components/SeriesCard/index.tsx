import React from 'react';
import {FiPlay} from 'react-icons/fi';
import {ISeries} from "../../interfaces/Series";
import { Container } from './styles';

interface ISeriesCard {
    data: ISeries
    onClick: () => void
}

const SeriesCard: React.FC<ISeriesCard> = ({data, onClick}) => {
    return (
        <Container onClick={onClick}
             style={{background: "url('" + data.image + "') center/cover"}}>
            <div>
                <div><FiPlay/> <span>Vídeo</span></div>
                <h4>{data.title}</h4>
                <div>
                    <div>{data.series_contents.length} {data.series_contents.length > 1 ? "episódios" : "episódio"}</div>
                </div>
            </div>
        </Container>
    );
}

export default SeriesCard;
