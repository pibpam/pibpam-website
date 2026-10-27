import styled from 'styled-components';
import theme from '../../../styles/theme';

// Fundo suave em degradê (o mesmo da Home, parado); as telas colocam cartões brancos sobre ele.
export const Container = styled.main<{bottom?: number}>`
  position: relative;
  min-height: 100vh;
  padding-bottom: ${({ bottom }) => bottom || 0}px;
  background: ${theme.gradients.screen};
`;
