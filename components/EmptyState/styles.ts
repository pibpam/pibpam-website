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

  > p:first-child {
    font-weight: 700;
    font-size: 32px;
    color: ${theme.colors.secondary};
    margin-bottom: ${theme.spacing.sm};

    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  }

  > p:last-child {
    font-weight: 300;
    font-size: 18px;
    color: ${theme.colors.white};
  }
`

export const Backdrop = styled.div`
  background: url('/empty-state.jpg') center/cover;
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
  }
`
