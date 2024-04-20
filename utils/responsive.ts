import { css } from "styled-components"
import { Styles } from "styled-components/dist/types"

const medium = (data: Styles<object>) => {
  return css`
    @media screen and (min-width: 768px){
      ${data}
    }
  `
}

const large = (data: Styles<object>) => {
  return css`
    @media screen and (min-width: 1280px){
      ${data}
    }
  `
}

const responsive = {
  medium,
  large
}

export default responsive