import styled from 'styled-components'
import theme from './theme'
import responsive from '../utils/responsive'

export const Container = styled.div`
  padding: 0 ${theme.spacing.lg} ${theme.spacing.xl};

  ${responsive.medium`
    max-width: 1120px;
    margin: 0 auto;
  `}

  > h1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    color: ${theme.colors.gray700};
  }

  > h2 {
    font-weight: 500;
    font-size: 20px;
    line-height: 25px;
    color: ${theme.colors.gray700};
  }

  > p {
    color: ${theme.colors.gray700};
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: justify;
    margin-top: ${theme.spacing.base};
  }
`

export const Team = styled.div`
  padding: ${theme.spacing.xl} ${theme.spacing.lg} 90px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.base};

  ${responsive.medium`
    max-width: 1120px;
    margin: 0 auto;
    grid-template-columns: repeat(3, 1fr);
  `}

  ${responsive.large`
    grid-template-columns: repeat(4, 1fr);
  `}
`

export const TeamItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  > div:nth-child(1) {
    background: url("/marco.png") center/cover;
    height: 98px;
    width: 98px;
    border-radius: ${theme.radius.circle};
    padding: ${theme.spacing.sm};
  }

  > div:nth-child(2) {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: ${theme.colors.gray700};
  }

  > div:nth-child(3) {
    font-weight: 300;
    font-size: 10px;
    line-height: 12px;
    color: ${theme.colors.gray700};
  }
`
