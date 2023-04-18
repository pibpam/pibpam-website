import React, { useMemo } from 'react';
import styles from '../styles/components/DividerMobile.module.scss'

import Divisor2 from "./svgs/divisor2.svg";

export enum EDividerColors {
  white = '#fff',
  yellow = '#B5DA35'
}

interface IDividerProps {
  color?: EDividerColors
}

const DividerMobile: React.FC<IDividerProps> = ({ color }: IDividerProps) => {

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
    </div>
  );
}

export default DividerMobile;