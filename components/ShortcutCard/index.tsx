import React from "react";
import { FiChevronRight, FiExternalLink } from "react-icons/fi";
import IconTile from "../IconTile";
import {
  Container,
  ShortcutCardSize,
  ShortcutCardTone,
  Text,
  Trailing,
} from "./styles";

interface IShortcutCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  // compact: ícone e título centralizados (célula 1x1); default: ícone no topo e texto
  // embaixo; wide: em linha, com seta, para atalhos de largura total.
  size?: ShortcutCardSize;
  tone?: ShortcutCardTone;
  // Sinaliza que o atalho abre fora do app (ex.: site da igreja).
  external?: boolean;
  onClick: () => void;
}

const ShortcutCard: React.FC<IShortcutCardProps> = ({
  icon,
  title,
  description,
  size = "default",
  tone = "default",
  external,
  onClick,
}) => (
  <Container type="button" $size={size} $tone={tone} onClick={onClick}>
    <IconTile variant="soft" size={size === "compact" ? 32 : 36}>
      {icon}
    </IconTile>
    <Text $size={size}>
      <strong>{title}</strong>
      {description && size !== "compact" && <span>{description}</span>}
    </Text>
    {(external || size === "wide") && (
      <Trailing aria-hidden $corner={size !== "wide"}>
        {external ? <FiExternalLink /> : <FiChevronRight />}
      </Trailing>
    )}
  </Container>
);

export default ShortcutCard;
