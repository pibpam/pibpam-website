import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  background: ${theme.colors.white};
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  border-radius: ${theme.radius.xxxl} ${theme.radius.xxxl} 0 0;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px;

  > a {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    padding: ${theme.spacing.sm} ${theme.spacing.xl};
    text-align: center;
    border-radius: ${theme.radius.xxxl};
    margin: ${theme.spacing.base} auto;
    font-size: 20px;
  }

  h2 {
    font-weight: 400;
    font-size: 20px;
    max-width: 300px;
    margin: auto;
    margin-bottom: ${theme.spacing.base};
    text-align: center;
  }

  > button {
    font-size: 20px;
    padding: ${theme.spacing.sm} ${theme.spacing.base};
    margin: auto;
    color: ${theme.colors.gray700};
    background: transparent;
    text-decoration: underline;
  }
`

export const Download = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;
  justify-content: center;
  margin: ${theme.spacing.base} 0;

  > a {
    display: flex;
    background: none;
    cursor: pointer;
    flex: 1;

    svg {
      width: 100%;
    }
  }
`
