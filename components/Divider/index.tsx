import React from 'react';

import Divisor2 from '../svgs/divisor2.svg'
import Divisor1 from '../svgs/divisor1.svg'
import { Container } from './styles'

export enum EDividerColors {
  white = '#fff',
  yellow = '#B5DA35'
}

interface IDividerProps {
  color?: EDividerColors
}

const Divider: React.FC<IDividerProps> = ({ color }: IDividerProps) => {
  return (
    <Container $color={color} >
      <Divisor2 />
      <Divisor1 />
    </Container>
  );
}

export default Divider;
