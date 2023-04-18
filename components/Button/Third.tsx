import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import styles from '../../styles/components/Button/Button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactElement
  text?: string
}

const ThirdButton: React.FC<IButtonProps> = ({ children, text, ...props }: IButtonProps) => {
  return (
    <button {...props} className={styles.third} >
      {children || text}
    </button>
  );
}

export default ThirdButton;