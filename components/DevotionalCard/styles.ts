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
  color: ${theme.colors.white};
  padding: 0 ${theme.spacing.sm};
  border: 1px solid ${theme.colors.primary};
  background: ${theme.colors.primary};
  border-radius: ${theme.radius.xl};
  position: absolute;
  right: ${theme.spacing.sm};
  top: ${theme.spacing.sm};
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
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: ${theme.colors.secondary};
  }

  > p:nth-child(2) {
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    color: ${theme.colors.white};
  }
`

export const Backdrop = styled.div`
  background: url('/devotional.png') center/cover;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    top: 0;
    background: linear-gradient(359.4deg, ${theme.colors.gray600} 15.03%, rgba(0, 0, 0, 0.08) 99.5%);
  }
`
