import styled, { keyframes } from 'styled-components'
import theme from '../../../styles/theme'
import responsive from '../../../utils/responsive'

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

export const BannerEl = styled.div`
  height: 90vh;
  position: relative;
`

export const DailyReading = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.base};
  width: 100%;
  padding: ${theme.spacing.base};
  color: ${theme.colors.white};

  animation: forwards ${fadeInUp} 2s ease-in-out;

  background: rgba(255, 255, 255, 0.2);
  border-radius: ${theme.radius.sm};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  > div:first-child {
    font-size: 40px;
    min-height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > div:last-child {
    font-size: 16px;
    text-align: left;
    display: flex;
    flex-direction: column;

    h2 {
      font-size: 16px;
      font-weight: 500;
    }

    h3 {
      font-size: 20px;
      font-weight: 700;
    }

    h4 {
      font-size: 14px;
      font-weight: 600;
    }
  }
`

export const Widgets = styled.div`
  width: 100%;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

export const VideoContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: ${theme.colors.gray225};
  overflow: hidden;

  > div {
    height: 100%;
    width: 100%;

    > video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

export const Content = styled.div`
  position: absolute;
  padding: 80px ${theme.spacing.lg};
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  ${responsive.medium`
    left: 50%;
    transform: translateX(-50%);
    max-width: 1120px;
    padding: 80px ${theme.spacing.xl};
  `}
`

export const HeaderTitle = styled.div`
  margin-top: auto;

  h1,
  h2 {
    font-size: 24px;
    line-height: 40px;
  }

  h1 {
    font-weight: 500;
  }

  h2 {
    font-size: 20px;
    font-weight: 500;
  }

  ${responsive.medium`
    max-width: 640px;
    margin: auto auto 0;

    h1 {
      font-size: 32px;
      line-height: 44px;
    }
  `}
`

export const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 1) -20%, rgba(238, 238, 238, 0) 50%, rgba(95, 217, 218, 1) 100%);
    position: absolute;
    z-index: 0;
    top: 0;
  }
`
