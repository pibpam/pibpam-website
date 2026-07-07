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

  > h4 {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: ${theme.colors.white};
  }

  > p {
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    color: ${theme.colors.white};
    margin-bottom: 3px;
    max-width: 180px;
  }

  > div {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.lg};
    justify-content: space-between;
    width: 100%;

    > div:first-child {
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      color: ${theme.colors.white};
      flex: 1;
    }

    > div:last-child {
      display: flex;
      align-items: center;
      gap: ${theme.spacing.base};
      color: ${theme.colors.secondary};

      > span {
        display: flex;
        align-items: center;
        gap: 4px;
        font-weight: 300;
        font-size: 12px;
        line-height: 15px;
      }
    }
  }
`

export const ExternalLink = styled.div`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  font-size: 24px;
  color: rgba(181, 218, 53, 0.5);
  z-index: 2;
`

export const Backdrop = styled.div`
  background: url('/enjubap.png') center/cover;
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
    background: linear-gradient(360deg, rgba(41, 41, 73, 0.91) 26.12%, rgba(0, 0, 0, 0.4) 92.86%);
  }
`
