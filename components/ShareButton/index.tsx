import React, {ButtonHTMLAttributes} from 'react';
import {FiShare2} from "react-icons/fi";
import usePostMessage from "../../hooks/usePostMessage";
import { Container } from "./styles"

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    url: string,
    message: string,
    large?: boolean
}

const ShareButton: React.FC<IButtonProps> = ({url, message, large}: IButtonProps) => {
    const {share} = usePostMessage()
    return (
        <Container $large={large} onClick={() => share(message, url)}>
            <FiShare2/> Compartilhar
        </Container>
    );
}

export default ShareButton;
