import styled, { css } from 'styled-components'
import theme from '../../styles/theme'
import responsive from '../../utils/responsive'

export const Container = styled.div<{ $active?: boolean }>`
  position: fixed;
  top: 0;
  z-index: 10;
  padding: ${theme.spacing.lg};
  width: 100%;
  background: transparent;
  transition: all .2s ease-in-out;

  ${responsive.medium`
    display: none;
  `}

  ${({ $active }) => $active && css`
    background: rgba(255, 255, 255, .9);
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, .5));
    backdrop-filter: blur(10px);
  `}
`
