import styled from 'styled-components'
import theme from '../../styles/theme'

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  > input {
    width: 100%;
    border: 1px solid ${theme.colors.tealBorderSoft};
    border-radius: ${theme.radius.xl};
    padding: ${theme.spacing.md} 44px ${theme.spacing.md} 14px;
    font-size: 16px;
    color: ${theme.colors.gray800};
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(95, 217, 218, 0.2);
    }
  }

  > button {
    position: absolute;
    right: 14px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: ${theme.colors.gray650};
    display: flex;
    align-items: center;
    font-size: 20px;
    line-height: 1;

    &:hover {
      color: ${theme.colors.gray800};
    }
  }
`
