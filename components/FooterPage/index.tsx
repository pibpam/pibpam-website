import React, { ReactElement } from "react";
import DividerMobile, { EDividerColors } from "../DividerMobile";
import { Content } from "./styles"

interface IOption {
  text: string
  icon: ReactElement
  action: () => void
  title?: string
}

interface IFooterPage {
  options?: IOption[]
}

const FooterPage: React.FC<IFooterPage> = ({ options }) => {
  return (
    <div>
      <DividerMobile color={EDividerColors.yellow} />
      <Content>
        {options?.map(option => (
          <button key={option.text} onClick={option.action}>
            {option.icon}
            <div>
              <span>{option.title || 'Ver também:'}</span>
              <span>{option.text}</span>
            </div>
          </button>
        ))}
      </Content>
    </div>
  )
}

export default FooterPage
