import styled from 'styled-components';
import theme from '../../../styles/theme';

// Fundo suave em degradê (o mesmo da Home, parado); as telas colocam cartões brancos sobre ele.
// No tema escuro (Bíblia), fundo pine e texto pelos tokens de [data-theme="dark"].
export const Container = styled.main<{bottom?: number, $dark?: boolean}>`
  position: relative;
  min-height: 100vh;
  padding-bottom: ${({ bottom }) => bottom || 0}px;
  background: ${({ $dark }) => ($dark ? theme.colors.pine : theme.gradients.screen)};
  ${({ $dark }) => $dark && 'color: var(--ink);'}
`;
