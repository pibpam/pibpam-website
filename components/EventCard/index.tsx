import React from "react";
import { IContent } from "../../interfaces/Contens";
import { DateUtils } from "../../utils/Date";
import { Backdrop, Container, Content, TagDate, Thumb } from "./styles";

interface IEventCard {
  onClick: () => void
  data: IContent
  hideDate?: boolean
}

const EventCard: React.FC<IEventCard> = ({ onClick, data, hideDate = false }) => {
  return (
    <Container onClick={onClick}>
      {!hideDate && (
        <TagDate>
          {DateUtils.formatDateDefault(data.contentDate)}
        </TagDate>
      )}
      <Thumb>
        <Content>
          <p>{data.name}</p>
          {data.author && (
            <p>{data.author.name}</p>
          )}
        </Content>

        <Backdrop style={{ background: "url('" + data.image + "') center/cover" }}>
        </Backdrop>
      </Thumb>
    </Container>
  )
}

export default EventCard
