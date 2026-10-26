import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { PiBookBookmark } from "react-icons/pi";
import { IPlanLatestDay } from "../../../interfaces/ReadingPlan";
import { Container, Text } from "./styles";

interface IReadingCardProps {
  readingPlan: IPlanLatestDay;
  onClick: () => void;
}

const ReadingCard: React.FC<IReadingCardProps> = ({ readingPlan, onClick }) => {
  const { day, items } = readingPlan;

  // A página é gerada estaticamente: só o cliente sabe se a leitura ainda é a de hoje.
  const [label, setLabel] = useState("Última leitura");

  useEffect(() => {
    // unlock_date é uma data pura (YYYY-MM-DD): comparar como texto evita deslocamento de fuso.
    if (day.unlock_date === format(new Date(), "yyyy-MM-dd")) {
      setLabel("Leitura de hoje");
    }
  }, [day.unlock_date]);

  const references = items
    .map((item) => item.reference)
    .filter(Boolean)
    .join(" · ");

  return (
    <Container type="button" onClick={onClick}>
      <span>
        <PiBookBookmark />
      </span>
      <Text>
        <small>{label}</small>
        <strong>{day.title}</strong>
        {references && <span>{references}</span>}
      </Text>
    </Container>
  );
};

export default ReadingCard;
