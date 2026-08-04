import styled from 'styled-components';
import theme from '../../styles/theme';
import responsive from '../../utils/responsive';

export const NAV_BAR_HEIGHT = 72;

export const NavBarContainer = styled.nav`
  display: none;

  ${responsive.medium`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${theme.spacing.lg};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: ${NAV_BAR_HEIGHT}px;
    padding: 0 ${theme.spacing.xl};
    background: ${theme.colors.white};
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, .15));
  `}

  > button:first-child {
    background: none;
    padding: 0;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
`;

export const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: center;

  > li > button {
    background: none;
    padding: 0;
    font-weight: 600;
    font-size: 15px;
    color: ${theme.colors.gray700};
    transition: color .2s ease;
    white-space: nowrap;

    &:hover {
      color: ${theme.colors.tealDark};
    }

    &.active {
      color: ${theme.colors.tealDark};
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.base};
  flex-shrink: 0;

  > button:last-child {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    background: ${theme.colors.tealTint};
    color: ${theme.colors.tealDark};
    font-weight: 700;
    font-size: 14px;
    padding: ${theme.spacing.sm} ${theme.spacing.base};
    border-radius: ${theme.radius.pill};
    white-space: nowrap;
    transition: background .2s ease;

    &:hover {
      background: ${theme.colors.tealHover};
    }
  }
`;

export const Notifications = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  color: ${theme.colors.gray700};
  font-size: 22px;

  > span {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: ${theme.radius.circle};
    background: ${theme.colors.error};
    color: ${theme.colors.white};
    font-size: 11px;
    font-weight: 700;
    top: -6px;
    right: -6px;
  }
`;
