import styled from 'styled-components';
import theme from '../../styles/theme';

export const Container = styled.div<{bottom?: number}>`
  position: fixed;
  left: 50%;
  bottom: ${({ bottom }) => (bottom || 0) + 16}px;
  z-index: 10;
  width: calc(100% - 48px);
  max-width: 420px;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.radius.pill};
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${theme.colors.tealBorderCard};
  box-shadow: ${theme.shadows.floating};
  transform: translateX(-50%);

  > ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    gap: ${theme.spacing.xs};

    > li {
      flex: 1;

      > button {
        width: 100%;
        padding: ${theme.spacing.sm} 0;
        border-radius: ${theme.radius.pill};
        color: ${theme.colors.primary};
        background: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        transition: background 0.2s ease, color 0.2s ease, transform 0.1s ease;

        &:active {
          transform: scale(0.94);
        }

        > svg {
          font-size: 24px;
        }

        > span {
          font-weight: 500;
          font-size: 11px;
          line-height: 13px;
          margin-top: 2px;
        }
      }
    }
  }

  .active {
    color: ${theme.colors.success} !important;
    background: ${theme.colors.limeTint};
  }
`;
