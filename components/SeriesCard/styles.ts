import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  position: relative;
  border-radius: ${theme.radius.md};
  overflow: hidden;
  background-size: 100% 100%;
  transition: all .2s ease;
  width: 100%;
  aspect-ratio: 16/9;

  &:hover {
    background-size: 130% 130%;

    > div {
      > div:first-child {
        > span {
          width: 40px;
          opacity: .7;
        }
      }
    }
  }

  &::before {
    background: linear-gradient(360deg, rgba(41, 41, 73, 0.91) 26.12%, rgba(0, 0, 0, 0.4) 92.86%);
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
  }

  > div {
    position: relative;
    z-index: 2;
    color: ${theme.colors.white};
    width: 100%;
    height: 100%;
    display: flex;
    padding: ${theme.spacing.base};
    flex-direction: column;

    > div:first-child {
      margin: 0 0 0 auto;
      display: flex;
      align-items: center;
      gap: 4px;

      font-weight: 400;
      font-size: 14px;

      color: ${theme.colors.white};

      > span {
        width: 0;
        opacity: 0;
        transition: all .2s ease;
      }

      > svg {
        color: ${theme.colors.secondary};
        font-size: 24px;
      }
    }

    > h4 {
      font-weight: 600;
      font-size: 22px;
      line-height: 20px;
      color: ${theme.colors.white};
      margin-top: auto;
      margin-bottom: 4px;
    }

    > p {
      font-weight: 300;
      font-size: 12px;
      line-height: 15px;

      color: ${theme.colors.white};
      margin-bottom: ${theme.spacing.base};
    }

    > div:last-child {
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-weight: 400;
      font-size: 16px;
      text-align: right;

      color: ${theme.colors.white};
    }
  }
`
