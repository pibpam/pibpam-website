import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import { PrimaryContainer } from './styles'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactElement
  text?: string
}

const PrimaryButton: React.FC<IButtonProps> = ({ children, text, ...props }: IButtonProps) => {
  return (
    <PrimaryContainer {...props} >
      {children || text}
    </PrimaryContainer>
  );
}

export default PrimaryButton;
