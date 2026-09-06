import styled, { css } from "styled-components";
import theme from "./theme";
import responsive from "../utils/responsive";

export const Container = styled.div`
  padding: 0 ${theme.spacing.lg} 90px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${theme.spacing.lg};

  ${responsive.medium`
    max-width: 960px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.xl} 90px;
  `}
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl} 0;
`;

export const PlanSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${theme.colors.gray100};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.white};
  overflow: hidden;
`;

export const Header = styled.button<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
  width: 100%;
  text-align: left;
  padding: ${theme.spacing.base};
  background: transparent;
  border-bottom: 2px solid ${({ $open }) => ($open ? theme.colors.gray100 : "transparent")};
  transition: border-color 0.2s ease;
  font-size: 20px;
  color: ${theme.colors.gray700};

  > div {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xs};
  }

  strong {
    font-size: 22px;
    font-weight: 700;
  }

  span {
    font-size: 12px;
    color: ${theme.colors.gray550};
  }
`;

export const ChevronIcon = styled.span<{ $open: boolean }>`
  display: flex;
  flex-shrink: 0;
  transition: transform 0.2s ease;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
`;

/** Truque de grid pra animar altura "auto" sem medir em JS: 0fr -> 1fr anima suave,
 * e o overflow:hidden do filho evita o conteúdo vazar durante a transição. */
export const AccordionBody = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.25s ease;
`;

export const AccordionBodyInner = styled.div`
  overflow: hidden;
`;

/** Grade de cards do manifest, estilo "slides" — cada item é um card com preview em destaque. */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.base};
`;

export const Card = styled.div<{ $hidden?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  border: 2px solid ${theme.colors.gray100};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.white};
  padding: ${theme.spacing.xs};

  ${({ $hidden }) =>
    $hidden &&
    css`
      opacity: 0.6;
    `}
`;

export const CardMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: ${theme.radius.sm};
  overflow: hidden;
  background: ${theme.colors.gray100};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray550};
  font-size: 28px;

  img,
  video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardMediaFill = styled.div<{ $color?: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.sm};
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  background: ${({ $color }) => ($color ? `#${$color}` : "transparent")};
  color: ${({ $color }) => ($color ? theme.colors.white : theme.colors.gray700)};
`;

export const CardMediaFillClamp = styled.span`
  font-size: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const OrdinalBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.xs};
  left: ${theme.spacing.xs};
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: ${theme.radius.pill};
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  color: ${theme.colors.white};
  font-size: 11px;
  font-weight: 700;
`;

export const PinBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.xs};
  right: ${theme.spacing.xs};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  color: ${theme.colors.white};
  font-size: 11px;
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  color: ${theme.colors.white};
  font-size: 16px;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 2px;
  min-width: 0;
`;

export const CardTitle = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.gray700};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardMeta = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${theme.colors.gray550};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2px;
  padding: 0 2px;

  > button,
  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    background: transparent;
    color: ${theme.colors.gray700};
    font-size: 15px;
  }
`;

export const ColorSwatch = styled.span<{ $color: string }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #${({ $color }) => $color};
  border: 1px solid ${theme.colors.gray100};
  flex-shrink: 0;
`;
