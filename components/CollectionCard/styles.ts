import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  width: 100%;
  border-radius: ${theme.radius.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const TagDate = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: ${theme.colors.primary};
  padding: 0 ${theme.spacing.sm};
  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.radius.xl};
  position: absolute;
  right: ${theme.spacing.base};
  top: ${theme.spacing.base};
  z-index: 2;
`

export const Thumb = styled.div`
  width: 100%;
  position: relative;
  aspect-ratio: 16/9;
  display: flex;
`

export const Content = styled.div`
  position: absolute;
  height: 100px;
  width: 100%;
  bottom: 0;
  z-index: 2;
  padding: ${theme.spacing.base};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 2px;

  > p:nth-child(1) {
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
    color: ${theme.colors.secondary};
  }

  > p:nth-child(2) {
    font-weight: 400;
    font-size: 14px;
    line-height: 15px;
    color: ${theme.colors.white};
  }
`

export const Backdrop = styled.div`
  background: url('/carrossel-min.png') center/cover;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  > svg {
    color: ${theme.colors.secondary};
    font-size: 40px;
    z-index: 1;
    stroke-width: 1px;
  }

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    top: 0;
    background: rgba(8, 12, 35, 0.85);
    mix-blend-mode: normal;
  }
`
