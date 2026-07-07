import styled from 'styled-components'
import theme from '../../styles/theme'

export const SliderWrap = styled.div`
  width: 100%;
  height: 100%;
  cursor: grab;
`

export const Slider = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const SliderInner = styled.div`
  width: 3000px;
  height: 100%;
  display: flex;
  padding: 0 ${theme.spacing.lg};

  > div {
    display: flex;
    gap: ${theme.spacing.sm};
  }
`
