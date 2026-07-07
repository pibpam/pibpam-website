import React, { InputHTMLAttributes, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Wrapper } from "./styles";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [show, setShow] = useState(false);

  return (
    <Wrapper>
      <input {...props} type={show ? "text" : "password"} />
      <button
        type="button"
        aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        onClick={() => setShow((v) => !v)}
      >
        {show ? <HiEyeOff /> : <HiEye />}
      </button>
    </Wrapper>
  );
};

export default PasswordInput;
