import React from "react";
import {FiPlayCircle} from "react-icons/fi";
import { Backdrop, Container, Content } from "./styles"

interface IThumbVideo {
    title: string
    subtitle?: string
    background?: string
    onClick: () => void
}

const ThumbVideo: React.FC<IThumbVideo> = ({title, subtitle, background, onClick}) => {
    return (
        <Container onClick={onClick}>
            <Content>
                <p>{title}</p>
                <p>{subtitle}</p>
            </Content>

            <Backdrop style={{background: "url('" + background + "') center/cover"}}>
                <FiPlayCircle/>
            </Backdrop>
        </Container>
    )
}

export default ThumbVideo
