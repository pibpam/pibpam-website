import React from "react";
import BlockHeader from "../BlockHeader";
import {FiFilm} from "react-icons/fi";
import Carousel from "../../Carousel";
import SeriesCard from "../../SeriesCard";
import {ISeries} from "../../../interfaces/Series";
import theme from "../../../styles/theme";
import { CardContainer, CarousselControlls, Container, Content } from "./styles"

interface ISeriesComponent {
    series: ISeries[]
    goTo: (pathname: string) => void
}

const Series: React.FC<ISeriesComponent> = ({series, goTo}) => {
    return (
        <Container>
            <Content>
                <BlockHeader
                    icon={<FiFilm color={theme.colors.gray750}/>}
                    title="Séries de Ministrações"
                />
                <CarousselControlls>
                    <p>
                        Nossas séries, são sequências de estudos sobre determinados assuntos. <a onClick={() => goTo("/series")}>Ver tudo.</a>
                    </p>
                </CarousselControlls>
            </Content>
            <div>
                <Carousel>
                    <>
                        {series.map(item =>
                            <CardContainer key={item.uuid}>
                                <SeriesCard onClick={() => goTo("/series/" + item.uuid)} data={item}/>
                            </CardContainer>
                        )}
                    </>
                </Carousel>
            </div>
        </Container>
    )
}

export default Series
