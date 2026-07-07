import styled, { css } from 'styled-components'

export const Container = styled.div<{ $color?: string }>`
  position: relative;
  margin-top: -5%;
  z-index: 2;
  height: 80%;
  margin-bottom: -10px;

  svg {
    filter: drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.1));
  }

  svg:nth-child(2) {
    width: 60%;
    z-index: 0;
    height: auto;
    position: absolute;
    top: -18px;
    left: 0;
  }

  svg:nth-child(1) {
    width: 100%;
    height: auto;
    position: relative;
    z-index: 1;
  }

  ${({ $color }) => $color && css`
    svg,
    path {
      fill: ${$color} !important;
    }
  `}
`
