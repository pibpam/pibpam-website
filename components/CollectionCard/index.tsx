import React from "react";
import { DateUtils } from "../../utils/Date";
import { ICollection } from "../../interfaces/Collection";
import { Backdrop, Container, Content, TagDate, Thumb } from "./styles";

interface ICollectionCard {
  onClick: () => void
  data: ICollection
}

const CollectionCard: React.FC<ICollectionCard> = ({ onClick, data }) => {
  return (
    <Container onClick={onClick}>
      <TagDate>
        {DateUtils.formatDateDefault(data.collectionDate)}
      </TagDate>

      <Thumb>
        <Content>
          <p>{data.title}</p>
          {data.photos && (
            <p>{data.photos.length} Fotos</p>
          )}
        </Content>

        <Backdrop style={{ background: "url('" + data.image + "') center/cover" }}>
        </Backdrop>
      </Thumb>
    </Container>
  )
}

export default CollectionCard
