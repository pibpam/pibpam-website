import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { PiBroadcast } from "react-icons/pi";
import { IBroadcast } from "../../../interfaces/Broadcast";
import { Container, Status, Text } from "./styles";

interface ILiveCardProps {
  live: IBroadcast;
  onClick: () => void;
}

const LiveCard: React.FC<ILiveCardProps> = ({ live, onClick }) => (
  <Container type="button" onClick={onClick}>
    <PiBroadcast />
    <Text>
      <Status>Ao vivo agora</Status>
      <strong>{live.title}</strong>
      <span>Toque para assistir</span>
    </Text>
    <FiChevronRight />
  </Container>
);

export default LiveCard;
