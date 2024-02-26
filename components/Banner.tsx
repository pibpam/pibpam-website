import React from 'react';
import styles from '../styles/components/Banner.module.scss'
import { IBanner } from "../interfaces/Banner";
import { FiExternalLink, FiInfo } from "react-icons/fi";

interface ISeriesCard {
  data: IBanner
  onClick: () => void
}

const Banner: React.FC<ISeriesCard> = ({ data, onClick }) => {
  return (
    <div onClick={onClick} className={styles.container}
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
    </div>
  );
}

export default Banner;
