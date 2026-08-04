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

export const Container = styled.main<{bottom?: number}>`
  position: relative;
  //top: -100px;
  padding-bottom: ${({ bottom }) => bottom || 0}px;
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

// -----

// import styled, { keyframes } from "styled-components";
// import responsive from "../../../utils/responsive";
// import { NAV_BAR_HEIGHT } from "../../../components/NavBar/styles";

// const showUp = keyframes`
//   0% {
//     //top: -100px;
//     opacity: 0;
//   }
//   100% {
//     //top: 0;
//     opacity: 1;
//   }
// `;

// export const Container = styled.main<{ bottom?: number }>`
//   position: relative;
//   //top: -100px;
//   padding-bottom: ${({ bottom }) => bottom || 0}px;
//   animation: ${showUp} 0.4s ease-in-out forwards;

//   ${responsive.medium`
//     padding-top: ${NAV_BAR_HEIGHT}px;
//   `}
// `;

