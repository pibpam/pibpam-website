import React from 'react';
import { IBanner } from "../../interfaces/Banner";
import { FiExternalLink, FiInfo } from "react-icons/fi";
import { Container } from './styles'

interface ISeriesCard {
  data: IBanner
  onClick: () => void
}

const Banner: React.FC<ISeriesCard> = ({ data, onClick }) => {
  return (
    <Container onClick={onClick}
      style={{ background: "url('" + data.image + "') center/cover" }}>
      <div>
        {data.category && !data.url && (
          <div><FiInfo /> {data.category}</div>
        )}
        {data.url && (
          <div><FiExternalLink /> </div>
        )}
        <h4>{data.title}</h4>
        <p>{data.subtitle}</p>
      </div>
    </Container>
  );
}

export default Banner;
