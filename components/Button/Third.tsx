import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import styles from '../../styles/components/Button/Button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactElement
  text?: string
  loading?: boolean
}

const ThirdButton: React.FC<IButtonProps> = ({ children, text, loading, ...props }: IButtonProps) => {
  return (
    <button {...props} className={`${styles.third} ${loading && styles.loading}`} >
      {children || text}
    </button>
  );
}

export default ThirdButton;
