import React, { useMemo } from 'react';
import styles from '../styles/components/Divider.module.scss'

import Divisor2 from '../components/svgs/divisor2.svg'
import Divisor1 from '../components/svgs/divisor1.svg'

export enum EDividerColors {
  white = '#fff',
  yellow = '#B5DA35'
}

interface IDividerProps {
  color?: EDividerColors
}

const Divider: React.FC<IDividerProps> = ({ color }: IDividerProps) => {

  const styleDivider = useMemo(() => {
    if (color === EDividerColors.white) {
      return styles.divisor__white
    }
    if (color === EDividerColors.yellow) {
      return styles.divisor__yellow
    }
    return null
  }, [color])

  return (
    <div className={`${styles.container} ${styleDivider}`} >
      <Divisor2 />
      <Divisor1 />
    </div>
  );
}

export default Divider;