import styled from 'styled-components';
import theme from '../../styles/theme';
import responsive from '../../utils/responsive';


export const Container = styled.div`
  padding: 0 24px 120px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${responsive.medium`
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.xl} 120px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-content: start;
  `}

  ${responsive.large`
    grid-template-columns: repeat(3, 1fr);
  `}
`;


export const ContentItem = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border: solid 2px #5fd9da;
  border-radius: 8px;
  padding: 8px;
  text-align: left;

  > div:first-child {
    height: 56px;
    min-width: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: #fff;
    background: #b5da35;
    border-radius: 4px;
  }

  > div:last-child {
    h6 {
      font-size: 20px;
      margin: 0;
      color: #3d3d3d;
    }

    p {
      color: #555;
      font-size: 16px;
    }

    > div {
      display: flex;
      gap: 8px;
      margin-top: 8px;

      div {
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background: #b5da35;
      }
    }
  }
`;

