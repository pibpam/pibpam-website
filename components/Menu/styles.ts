import styled, { css, keyframes } from 'styled-components'
import theme from '../../styles/theme'
import responsive from '../../utils/responsive'

const showUp = keyframes`
  0% {
    opacity: 0;
    top: 100%;
    border-radius: ${theme.radius.xxl};
  }
  60% {
    border-radius: ${theme.radius.xxl};
  }
  100% {
    opacity: 1;
    top: 0;
    border-radius: 0;
  }
`

const hideDown = keyframes`
  100% {
    opacity: 0;
    top: 100%;
    border-radius: 0;
  }
  40% {
    border-radius: ${theme.radius.xxl};
  }
  0% {
    opacity: 1;
    top: 0;
    border-radius: ${theme.radius.xxl};
  }
`

export const Container = styled.div<{ $animationOut?: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  background: ${theme.colors.white};
  z-index: 30;
  top: 0;
  padding: 48px ${theme.spacing.lg} ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  opacity: 0;
  border-radius: ${theme.radius.xxl};
  overflow: auto;

  animation: ${showUp} .5s ease-out forwards;

  ${responsive.medium`
    display: none;
  `}

  > div:last-child {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    p:first-child {
      max-width: 224px;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      text-align: center;

      color: ${theme.colors.gray600};
    }

    p:last-child {
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      text-align: center;
      max-width: 224px;

      color: ${theme.colors.gray600};
    }
  }

  > ul {
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};

    > li {
      button {
        background: ${theme.colors.primary};
        width: 100%;
        color: ${theme.colors.white};
        gap: ${theme.spacing.base};
        padding: ${theme.spacing.md};
        display: flex;
        align-items: center;
        border-radius: ${theme.radius.sm};

        > div {
          display: flex;
          flex-direction: column;
          text-align: left;

          span:first-child {
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
          }

          span:nth-child(2) {
            font-weight: 500;
            font-size: 12px;
            line-height: 15px;
          }
        }

        > svg:first-child {
          min-width: 24px;
          height: auto;
        }

        > svg:last-child {
          min-width: 30px;
          height: auto;
          margin-left: auto;
        }
      }
    }
  }

  ${({ $animationOut }) => $animationOut && css`
    animation: ${hideDown} .5s ease-in forwards;
  `}
`
