import React, {ButtonHTMLAttributes} from 'react';
import styles from '../../styles/components/ShareButton.module.scss';
import {FiShare2} from "react-icons/fi";
import usePostMessage from "../../hooks/usePostMessage";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    url: string,
    message: string
}

const ShareButton: React.FC<IButtonProps> = ({url, message}: IButtonProps) => {
    const {share} = usePostMessage()
    return (
        <button
            onClick={() => share(message, url)}
            className={styles.container}>
            <FiShare2/> Compartilhar
        </button>
    );
}

export default ShareButton;
