import React from "react";
import { PiPlayFill } from "react-icons/pi";
import { Badge, Container, Play, Subtitle, Title } from "./styles";

interface IMediaCardProps {
  badge: string;
  title: string;
  subtitle?: string;
  image?: string;
  // Transmissão em andamento: destaca o card (borda, selo e botão pulsando).
  live?: boolean;
  onClick: () => void;
}

const MediaCard: React.FC<IMediaCardProps> = ({
  badge,
  title,
  subtitle,
  image,
  live = false,
  onClick,
}) => (
  <Container
    type="button"
    $live={live}
    style={image ? { backgroundImage: `url('${image}')` } : undefined}
    onClick={onClick}
  >
    <Play $live={live}>
      <PiPlayFill />
    </Play>
    <Badge $live={live}>{badge}</Badge>
    <Title>{title}</Title>
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
  </Container>
);

export default MediaCard;
