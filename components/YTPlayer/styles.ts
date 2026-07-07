import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  width: 100%;
  aspect-ratio: 16/9;

  iframe,
  > div {
    width: 100%;
    height: 100%;
  }
`

export const VideoBackdrop = styled.div`
  background: url('/carrossel-min.png') center/cover;
  position: relative;
  height: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${theme.radius.md};
  overflow: hidden;

  > button {
    background: transparent;
  }

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(8, 12, 35, 0.85);
    z-index: 1;
  }

  svg {
    font-size: 32px;
    color: ${theme.colors.secondary};
    position: relative;
    z-index: 2;
    stroke-width: 1px;
  }
`
