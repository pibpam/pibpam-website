import React from "react";
import { FiCheckCircle, FiX, FiXCircle } from "react-icons/fi";
import { CloseButton, Container, Content, Icon, Message, Title } from "./styles";

export type CheckoutStatus = "success" | "failure";

interface ICheckoutStatusBanner {
  status: CheckoutStatus;
  onClose: () => void;
}

const CONTENT: Record<CheckoutStatus, { title: string; message: string }> = {
  success: {
    title: "Pagamento aprovado!",
    message: "Seu pagamento foi confirmado com sucesso.",
  },
  failure: {
    title: "Não foi possível verificar o pagamento",
    message:
      "Em caso de problemas, busque ajuda com a organização do evento.",
  },
};

const CheckoutStatusBanner: React.FC<ICheckoutStatusBanner> = ({ status, onClose }) => {
  const { title, message } = CONTENT[status];

  return (
    <Container $status={status} role="alert">
      <Icon>
        {status === "success" ? <FiCheckCircle /> : <FiXCircle />}
      </Icon>
      <Content>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>
      <CloseButton type="button" onClick={onClose} aria-label="Fechar">
        <FiX />
      </CloseButton>
    </Container>
  );
};

export default CheckoutStatusBanner;
