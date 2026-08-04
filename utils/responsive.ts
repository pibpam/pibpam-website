import { css, CSSObject, Interpolation } from "styled-components"

const medium = (strings: TemplateStringsArray | CSSObject, ...interpolations: Interpolation<object>[]) => {
  return css`
    @media screen and (min-width: 768px){
      ${css(strings as TemplateStringsArray, ...interpolations)}
    }
  `
}

const large = (strings: TemplateStringsArray | CSSObject, ...interpolations: Interpolation<object>[]) => {
  return css`
    @media screen and (min-width: 1280px){
      ${css(strings as TemplateStringsArray, ...interpolations)}
    }
  `
}

const responsive = {
  medium,
  large
}

export default responsive