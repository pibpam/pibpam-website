import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  height: 290px;
  position: relative;
`

export const Content = styled.div`
  position: absolute;
  padding: 64px ${theme.spacing.lg} ${theme.spacing.lg};
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    text-align: center;

    color: ${theme.colors.white};

    > span {
      font-weight: 300;
    }
  }
`

export const Backdrop = styled.div`
  background: url('/carrossel-min.png') center/cover;
  position: absolute;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background: rgba(0, 61, 62, 0.78);
    backdrop-filter: blur(2px);
    position: absolute;
    z-index: 0;
    top: 0;
  }
`
