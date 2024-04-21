import styled, { css, keyframes } from 'styled-components';
import responsive from '../../../utils/responsive';

const showUp = keyframes`
  0% {
    //top: -100px;
    opacity: 0;
  }
  100% {
    //top: 0;
    opacity: 1;
  }
`

export const Container = styled.main`
  position: relative;
  //top: -100px;
  animation: ${showUp} .4s ease-in-out forwards;
`;


export const Handler = styled.div<{ isApp?: boolean }>`

  ${({ isApp }) => isApp && css`
    > *:first-child {
      display: block;
    }

    > *:last-child {
      display:none;
    }
  `}

  ${({ isApp }) => !isApp && css`
    > *:first-child {
      display: block;
    }
    > *:last-child {
      display: none;
    }

    ${responsive.medium`
      > *:first-child {
        display: none;
      }
      > *:last-child {
        display: block;
      }
    `}
  `}
`;

