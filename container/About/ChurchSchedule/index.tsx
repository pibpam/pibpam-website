import React from "react";
import { FiArrowRight } from "react-icons/fi";
import ScheduleItem from "../../../components/ScheduleItem";
import { IChurchSchedule } from "../../../interfaces/Church";
import { Container, SeeAllButton } from "./styles";

interface IChurchScheduleProps {
  schedules: IChurchSchedule[];
  onSeeAll: () => void;
}

const ChurchSchedule: React.FC<IChurchScheduleProps> = ({ schedules, onSeeAll }) => {
  return (
    <Container>
      {schedules.map((item) => (
        <ScheduleItem key={item.uuid} data={item} />
      ))}
      <SeeAllButton onClick={onSeeAll}>
        Ver agenda completa <FiArrowRight />
      </SeeAllButton>
    </Container>
  );
};

export default ChurchSchedule;
