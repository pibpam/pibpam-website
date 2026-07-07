import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import { ThirdContainer } from './styles'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactElement
  text?: string
  loading?: boolean
}

const ThirdButton: React.FC<IButtonProps> = ({ children, text, loading, ...props }: IButtonProps) => {
  return (
    <ThirdContainer {...props} $loading={loading} >
      {children || text}
    </ThirdContainer>
  );
}

export default ThirdButton;
