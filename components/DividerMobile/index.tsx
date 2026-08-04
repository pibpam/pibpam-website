import React from 'react';

import Divisor2 from "../svgs/divisor2.svg";
import { Container } from './styles'

export enum EDividerColors {
  white = '#fff',
  yellow = '#B5DA35'
}

interface IDividerProps {
  color?: EDividerColors
}

const DividerMobile: React.FC<IDividerProps> = ({ color }: IDividerProps) => {
  return (
    <Container $color={color} >
      <Divisor2 preserveAspectRatio="xMidYMid slice" />
    </Container>
  );
}

export default DividerMobile;
