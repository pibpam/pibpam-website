import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  border-radius: ${theme.radius.md};
  background: ${theme.colors.primary};
  padding: ${theme.spacing.sm};
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  position: relative;
`

export const Link = styled.div`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  color: rgba(255, 255, 255, 0.5);
`

export const Info = styled.div`
  > div:nth-child(1) {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    color: ${theme.colors.white};
  }
  > div:nth-child(2) {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
  > div:nth-child(3) {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }
`

export const Photo = styled.div`
  min-width: 72px;
  height: 72px;
  border: 8px;
  background: url("/jubap.png") center/cover;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  border-radius: ${theme.radius.sm};
`
