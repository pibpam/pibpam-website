import React from "react";
import {FiAlertOctagon} from "react-icons/fi";
import { Backdrop, Container, Content, Thumb } from "./styles"

interface IEmptyState {
    description?: string
}

const EmptyState: React.FC<IEmptyState> = ({description = "Não encontramos nada por aqui!"}) => {
    return (
        <Container>
            <Thumb>
                <Content>
                    <p><FiAlertOctagon/> Ops!</p>
                    <p>{description}</p>
                </Content>
            </Thumb>
            <Backdrop></Backdrop>
        </Container>
    )
}

export default EmptyState
