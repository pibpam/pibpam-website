import React, { useContext, useEffect, useState } from "react";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { Container, Icon, Message, CloseButton } from "./styles";
import { PostMessageContext } from "../../contexts/postMessage";

interface IToastProps {
  message: string;
  onClose: () => void;
  // Tempo em ms até o toast fechar sozinho.
  duration?: number;
}

const Toast: React.FC<IToastProps> = ({ message, onClose, duration = 5000 }) => {
  const { deviceInfo } = useContext(PostMessageContext);
  const [closing, setClosing] = useState(false);
  // Espaço para a barra de navegação (fixa) do app não cobrir o toast.
  const bottom = (deviceInfo?.bottom || 0) + 16;

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 200);
  };

  useEffect(() => {
    setClosing(false);
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, duration]);

  return (
    <Container $closing={closing} $bottom={bottom} role="alert">
      <Icon>
        <FiAlertCircle />
      </Icon>
      <Message>{message}</Message>
      <CloseButton type="button" onClick={handleClose} aria-label="Fechar">
        <FiX />
      </CloseButton>
    </Container>
  );
};

export default Toast;
