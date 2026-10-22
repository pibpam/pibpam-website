import React from "react";
import { FiClipboard, FiClock, FiMessageCircle, FiUserCheck, FiX } from "react-icons/fi";
import Modal from "../../../components/Modal";
import { CloseButton, Container, Item, List, Title } from "./styles";

interface IMemberInfoSheet {
  open: boolean;
  onClose: () => void;
}

const MemberInfoSheet: React.FC<IMemberInfoSheet> = ({ open, onClose }) => {

  return (
    <Modal isOpen={open} onClose={onClose}>
      <Container>
        <CloseButton type="button" onClick={onClose} aria-label="Fechar">
          <FiX />
        </CloseButton>
        <Title>Como funciona o vínculo de membro</Title>

        <List>
          <Item>
            <FiUserCheck />
            <p>O vínculo é feito manualmente pela administração da igreja.</p>
          </Item>
          <Item>
            <FiClipboard />
            <p>É necessário que a pessoa esteja no rol de membresia da igreja.</p>
          </Item>
          <Item>
            <FiClock />
            <p>O processo pode demorar um tempo — em geral, até 2 dias.</p>
          </Item>
          <Item>
            <FiMessageCircle />
            <p>
              Se o vínculo não for feito e você já for membro, pode ser
              necessário falar com a administração para adequar o seu
              cadastro.
            </p>
          </Item>
        </List>
      </Container>
    </Modal>
  );
};

export default MemberInfoSheet;
