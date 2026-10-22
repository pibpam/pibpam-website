import styled, { keyframes } from "styled-components";
import theme from "../../styles/theme";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

// Desloca o degradê (3x mais alto que a tela) para o fundo "respirar" entre teal e lima.
const drift = keyframes`
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 0% 100%;
  }
`;

export const Container = styled.div`
  padding: 110px 24px 140px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};
  min-height: 100vh;
  background: ${theme.gradients.screen};
  background-size: 100% 300%;
  animation: ${drift} 14s ease-in-out infinite alternate;

  @media (prefers-reduced-motion: reduce) {
    &,
    * {
      animation: none !important;
    }
  }
`;

export const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  animation: ${fadeUp} 0.5s ease-out both;

  > h1 {
    font-size: 28px;
    color: ${theme.colors.gray700};
  }

  > p {
    font-size: 15px;
    color: ${theme.colors.gray650};
  }
`;

// Grade de 4 colunas com linhas de altura fixa: cada célula ocupa um retângulo
// (colunas x linhas) e o encaixe denso preenche os espaços, no estilo "tetris".
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 92px;
  grid-auto-flow: dense;
  gap: ${theme.spacing.md};
`;

export const Cell = styled.div<{ $cols: number; $rows?: number; $delay: number }>`
  grid-column: span ${({ $cols }) => $cols};
  grid-row: span ${({ $rows }) => $rows || 1};
  display: flex;
  min-width: 0;
  animation: ${fadeUp} 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: ${({ $delay }) => $delay}ms;
`;
