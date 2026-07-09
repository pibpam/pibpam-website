import styled, { css } from 'styled-components'
import { FiChevronDown } from 'react-icons/fi'
import theme from '../../../styles/theme'

export const BatchesBox = styled.div`
  border: 1px solid ${theme.colors.tealBorderSoft};
  border-radius: ${theme.radius.xxl};
  padding: ${theme.spacing.base};
  background: ${theme.colors.white};
  margin-bottom: ${theme.spacing.base};
`

export const BatchList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

export const BatchItem = styled.div<{ $status: 'active' | 'closed' | 'upcoming' }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  border: 1px solid ${theme.colors.tealBorderSoft};
  border-radius: ${theme.radius.xl};
  padding: ${theme.spacing.md};

  ${({ $status }) => $status === 'closed' && css`
    opacity: 0.55;
  `}

  ${({ $status }) => $status === 'active' && css`
    border-color: ${theme.colors.primary};
    background: ${theme.colors.tealTintLight};
    box-shadow: 0 0 0 3px rgba(95, 217, 218, 0.22);
  `}
`

export const BatchInfo = styled.span`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
`

export const BatchNameRow = styled.span`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
`

export const BatchName = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray800};
  font-size: 15px;
`

export const BatchDates = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${theme.colors.gray650};

  > svg {
    flex-shrink: 0;
  }
`

export const BatchPrice = styled.span<{ $status: 'active' | 'closed' | 'upcoming' }>`
  font-weight: 700;
  font-size: 15px;
  color: ${theme.colors.gray650};
  flex-shrink: 0;

  ${({ $status }) => $status === 'active' && css`
    color: ${theme.colors.success};
  `}
`

// Entrada compartilhada pela pilha (ao recolher) e pelos itens expandidos
// (ao abrir), para que a transição pareça um único movimento contínuo.
const fadeSlideIn = css`
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

// Pilha de cards para os lotes futuros: o card da frente fica clicável e os
// demais aparecem como camadas por trás, espiando por baixo (efeito baralho).
export const BatchStack = styled.button`
  position: relative;
  display: grid;
  width: 100%;
  border: none;
  background: none;
  padding: 0;
  margin-bottom: ${theme.spacing.base};
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  animation: batch_stack_in 0.3s ease both;

  @keyframes batch_stack_in {
    ${fadeSlideIn}
  }
`

export const BatchExpanded = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

export const BatchExpandedItem = styled.div<{ $delay: number }>`
  animation: batch_item_in 0.3s ease both;
  animation-delay: ${({ $delay }) => $delay}s;

  @keyframes batch_item_in {
    ${fadeSlideIn}
  }
`

export const BatchStackLayer = styled.div<{ $depth: number }>`
  grid-area: 1 / 1;
  border: 1px solid ${theme.colors.tealBorderSoft};
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.white};
  transform: translateY(${({ $depth }) => $depth * 6}px) scaleX(${({ $depth }) => 1 - $depth * 0.05});
  box-shadow: 0 ${({ $depth }) => $depth * 2}px ${({ $depth }) => $depth * 6}px rgba(0, 0, 0, 0.08);
  z-index: ${({ $depth }) => 3 - $depth};
`

export const BatchStackFront = styled(BatchItem)`
  grid-area: 1 / 1;
  z-index: 3;
  background: ${theme.colors.white};
`

export const BatchStackChevron = styled(FiChevronDown)`
  color: ${theme.colors.tealDark};
  font-size: 18px;
  flex-shrink: 0;
`

export const BatchCollapseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  border: none;
  background: none;
  padding: ${theme.spacing.sm};
  color: ${theme.colors.tealDark};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  > svg {
    font-size: 16px;
  }
`
