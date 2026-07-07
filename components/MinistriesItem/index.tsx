import React from "react";
import {FiExternalLink} from "react-icons/fi";
import {ITeam} from "../../interfaces/Team";
import { Container, Photo, Info, Link } from "./styles"

interface IMinistriesItem {
    onClick: () => void
    data: ITeam
}

const MinistriesItem: React.FC<IMinistriesItem> = ({onClick, data}) => {
    return (
        <Container onClick={onClick}>
            <Photo style={{background: "url('" + data.image + "') center/cover"}}></Photo>
            <Info>
                <div>{data.name}</div>
                <div>{data.shortDescription}</div>
            </Info>
            <Link>
                <FiExternalLink/>
            </Link>
        </Container>
    )
}

export default MinistriesItem
