import React, {ReactElement} from "react";
import { Container } from "./styles"

interface ITitle {
    children?: ReactElement | string
}

const Title: React.FC<ITitle> = ({children}) => {
    return (
        <Container>
            <div>{children}</div>
        </Container>
    )
}

export default Title