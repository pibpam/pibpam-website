import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  position: relative;
  background-size: 100% 100%;
  transition: all .2s ease;
  width: 100%;
  height: 100%;

  &:hover {
    background-size: 130% 130%;
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

    > h4 {
      font-weight: 600;
      font-size: 22px;
      line-height: 20px;
      color: ${theme.colors.white};
      margin-top: auto;
      margin-bottom: 4px;
    }

    > div {
      font-weight: 400;
      font-size: 16px;
      color: ${theme.colors.white};
      display: flex;
      align-items: center;
      gap: ${theme.spacing.sm};
      justify-content: flex-end;
    }
  }
`
