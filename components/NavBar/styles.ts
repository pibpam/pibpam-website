import styled from 'styled-components'
import theme from '../../styles/theme'

export const NavBarContainer = styled.div`
  background: rgba(29, 29, 29, 0.9);
  backdrop-filter: blur(3.5px);
  position: absolute;
  width: 100%;
  z-index: 10;
`

export const Nav = styled.nav`
  padding: ${theme.spacing.base} 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1440px;
  margin: auto;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 48px;
    font-weight: 600;
    font-size: 20px;
    color: ${theme.colors.primary};

    li {
      a {
        transition: all .2s ease;

        &:hover {
          color: ${theme.colors.secondary};
        }
      }
    }
  }
`
