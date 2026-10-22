import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { PiCake } from "react-icons/pi";
import { IMemberBasic } from "../../../interfaces/Member";
import { Container, Icon, Text } from "./styles";

const MAX_NAMES = 2;

interface IBirthdayCardProps {
  // Aniversariantes do dia.
  birthdays: IMemberBasic[];
  onClick: () => void;
}

// A API devolve os nomes em caixa alta ("HERNANDO DUARTE").
const firstName = (name: string) => {
  const first = name.trim().split(" ")[0];
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
};

const BirthdayCard: React.FC<IBirthdayCardProps> = ({ birthdays, onClick }) => {
  const names = birthdays.slice(0, MAX_NAMES).map((member) => firstName(member.name));
  const extra = birthdays.length - names.length;
  const summary = extra > 0 ? `${names.join(", ")} e mais ${extra}` : names.join(" e ");

  return (
    <Container type="button" onClick={onClick}>
      <Icon>
        <PiCake />
      </Icon>
      <Text>
        <strong>Hoje tem aniversário!</strong>
        <span>Parabéns, {summary}</span>
      </Text>
      <FiChevronRight />
    </Container>
  );
};

export default BirthdayCard;
