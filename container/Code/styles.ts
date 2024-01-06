import styled from 'styled-components';
import theme from '../../styles/theme';

export const Error = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;

  svg {
    font-size: 58px;
    color: ${theme.colors.primary};
  }

  h3 {
    color: ${theme.colors.primary};
    margin-bottom: 16px;
    font-size: 24px;
  }
  p {
    color: #3D3D3D;
    font-size: 20px;
  }

  button {
    color: ${theme.colors.primary};
    text-decoration: underline;
    margin-top: 40px;
    background: none;
    font-size: 24px;
  }
`;
