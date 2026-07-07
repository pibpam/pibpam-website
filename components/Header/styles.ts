import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  > div {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.base};
    overflow: hidden;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  color: ${theme.colors.white};

  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const GoBack = styled.button`
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 40px;
  font-size: 32px;
`

export const Notifications = styled.button`
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 40px;
  font-size: 32px;
  margin-left: auto;
  position: relative;
  margin-right: ${theme.spacing.base};

  > span {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: ${theme.radius.circle};
    background: ${theme.colors.white};
    font-size: 14px;
    font-weight: 700;
    color: ${theme.colors.gray700};
    right: -4px;
    top: -4px;
  }
`
