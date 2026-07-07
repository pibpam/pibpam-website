import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.primary};
  width: 167px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all .2s ease;

  &:hover {
    background: ${theme.colors.tealMedium};
  }

  > div:first-child {
    flex: 1;
    padding: 10px;

    font-weight: 700;
    font-size: 12px;
    line-height: 15px;

    color: ${theme.colors.white};

    display: flex;
    flex-direction: column;

    > div:last-child {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 60px;
      opacity: .7;
      flex: 1;
      padding: ${theme.spacing.lg} 0;

      svg {
        stroke-width: 1px;
      }
    }
  }

  > div:last-child {
    padding: 10px;
    display: flex;
    align-items: center;
    background: ${theme.colors.gray600};
    color: ${theme.colors.secondary};
    justify-content: space-between;

    > svg {
      opacity: .5;
      font-size: 24px;
    }

    > div {
      div:first-child {
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 4px;
      }

      div:last-child {
        font-weight: 300;
        font-size: 12px;
        line-height: 15px;
      }

      div {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.sm};

        svg {
          font-size: 16px;
        }
      }
    }
  }
`
