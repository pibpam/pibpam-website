import styled from 'styled-components';
import responsive from '../../utils/responsive';
import theme from '../../styles/theme';

export const Container = styled.div<{bottom?: number}>`
  background: ${theme.colors.white};
  overflow: hidden;
  padding: ${theme.spacing.base} 0;
  padding-bottom: ${({ bottom }) => bottom ? bottom + 16 : 16}px;
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, .5));

  ${responsive.medium`
    display: none;
  `}

  > ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;

    > li {
      > button {
        color: ${theme.colors.primary};
        background: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        transition: all .2s ease;

        &:focus {
          color: ${theme.colors.secondary} !important;
        }

        > svg {
          font-size: 28px;
        }

        > span {
          font-weight: 400;
          font-size: 14px;
          line-height: 15px;
          margin-top: 4px;
        }
      }
    }
  }

  .active {
    color: ${theme.colors.secondary} !important;
  }
`;
