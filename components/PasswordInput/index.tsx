import React, { InputHTMLAttributes, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import styles from "./PasswordInput.module.scss";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.wrapper}>
      <input {...props} type={show ? "text" : "password"} />
      <button
        type="button"
        aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        onClick={() => setShow((v) => !v)}
      >
        {show ? <HiEyeOff /> : <HiEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
