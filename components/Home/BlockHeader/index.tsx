import React, {ReactElement} from "react";
import { Container } from "./styles"

interface IBlockHeader {
    icon: ReactElement
    title: string
}
const BlockHeader: React.FC<IBlockHeader> = ({icon, title}) => {
    return (
        <Container>
            {icon}
            <h3>
                {title}
            </h3>
        </Container>
    )
}

export default BlockHeader
