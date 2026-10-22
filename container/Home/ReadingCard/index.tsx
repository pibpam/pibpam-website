import React, { useEffect, useState } from "react";
import { PiBookBookmark } from "react-icons/pi";
import { IReadingPlan } from "../../../interfaces/ReadingPlan";
import { DateUtils } from "../../../utils/Date";
import { Container, Text } from "./styles";

interface IReadingCardProps {
  readingPlan: IReadingPlan;
  onClick: () => void;
}

const ReadingCard: React.FC<IReadingCardProps> = ({ readingPlan, onClick }) => {
  // A página é gerada estaticamente: só o cliente sabe se a leitura ainda é a de hoje.
  const [label, setLabel] = useState("Última leitura");

  useEffect(() => {
    if (DateUtils.isToday(readingPlan.created_at)) {
      setLabel("Leitura de hoje");
    }
  }, [readingPlan.created_at]);

  return (
    <Container type="button" onClick={onClick}>
      <span>
        <PiBookBookmark />
      </span>
      <Text>
        <small>{label}</small>
        <strong>{readingPlan.title}</strong>
        <span>{readingPlan.description}</span>
      </Text>
    </Container>
  );
};

export default ReadingCard;
