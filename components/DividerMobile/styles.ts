import styled, { css } from 'styled-components'

export const Container = styled.div<{ $color?: string }>`
  position: relative;
  z-index: 2;
  margin-top: -89px;
  width: 100%;
  overflow: hidden;
  height: 90px;

  svg {
    filter: drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.1));
    height: 100px;
  }

  ${({ $color }) => $color && css`
    svg,
    path {
      fill: ${$color} !important;
    }
  `}
`
