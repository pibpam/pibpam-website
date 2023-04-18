import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import styles from '../../styles/components/Button/Button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactElement
  text?: string
}

const SecondaryButton: React.FC<IButtonProps> = ({ children, text, ...props }: IButtonProps) => {
  return (
    <button {...props} className={styles.secondary} >
      {children || text}
    </button>
  );
}

export default SecondaryButton;