import styled from 'styled-components';
import responsive from '../../utils/responsive';

export const Container = styled.div`
  background: #fff;
  overflow: hidden;
  padding: 16px 0;
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, .5));

  ${responsive.medium`
    display: none;
  `}

  >ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;

    >li {
      >button {
        color: #5FD9DA;
        background: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        transition: all .2s ease;

        &:focus {
          color: #B5DA35 !important;
        }

        >svg {
          font-size: 28px;
        }

        >span {
          font-weight: 400;
          font-size: 14px;
          line-height: 15px;
          margin-top: 4px;
        }
      }
    }
  }

 .active {
   color: #B5DA35 !important;
 }
`;


