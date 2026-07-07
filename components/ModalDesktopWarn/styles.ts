import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background: ${theme.colors.white};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${theme.spacing.xl};

  > div {
    text-align: center;
    width: 600px;
    max-width: 100%;
    padding: ${theme.spacing.lg};
    background: ${theme.colors.primary};
    border-radius: ${theme.radius.md};
    color: ${theme.colors.white};
    gap: ${theme.spacing.base};
    display: flex;
    flex-direction: column;

    > h1 {
      font-size: 32px;
    }

    > h2 {
      font-size: 24px;
      font-weight: 400;
    }
  }
`

export const Download = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: center;
  justify-content: center;
  margin: ${theme.spacing.xl} 0;

  > a {
    display: flex;
    background: none;
    cursor: pointer;

    svg {
      height: 70px;
    }
  }
`

export const Contacts = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.lg};

  > a {
    background: ${theme.colors.white};
    color: ${theme.colors.primary};
    font-size: 20px;
    padding: ${theme.spacing.sm} ${theme.spacing.base};
    border-radius: ${theme.radius.xxxl};
  }
`
