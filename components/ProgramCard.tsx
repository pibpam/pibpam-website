import React from 'react';
import { FiCalendar, FiClock, FiExternalLink, FiUsers } from 'react-icons/fi';

import styles from '../styles/components/ProgramCard.module.scss'

interface IProgramCard {
    onClick: () => void
}

const ProgramCard: React.FC<IProgramCard> = ({onClick}) => {
  return (
    <div onClick={onClick} className={styles.programCardContainer} >
      <div>
        <div>Pequeno Grupo Multiplicador</div>
        <div><FiUsers /></div>
      </div>
      <div>
        <div>
          <div><FiCalendar />10/08</div>
          <div><FiClock />19:30</div>
        </div>
        <FiExternalLink />
      </div>
    </div>
  );
}

export default ProgramCard;