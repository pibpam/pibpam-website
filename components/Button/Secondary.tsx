import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import { SecondaryContainer } from './styles'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactElement
  text?: string
}

const SecondaryButton: React.FC<IButtonProps> = ({ children, text, ...props }: IButtonProps) => {
  return (
    <SecondaryContainer {...props} >
      {children || text}
    </SecondaryContainer>
  );
}

export default SecondaryButton;
