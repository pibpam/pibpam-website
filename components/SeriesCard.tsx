import React from 'react';
import { FiPlay } from 'react-icons/fi';
import styles from '../styles/components/SeriesCard.module.scss'


const SeriesCard: React.FC = () => {
  return (
    <div className={styles.seriesCardContainer} >
      <div>
        <div><FiPlay /> <span>Vídeo</span> </div>
        <h4>Fogo No Hormônio</h4>
        <p>Marco Oliveira</p>
        <div>
          <div>Público: Adolescentes</div>
          <div>3 episódios</div>
        </div>
      </div>
    </div>
  );
}

export default SeriesCard;