"use client";
import "./PasswordInput.scss";

import { JSX, useState } from "react";
import Image from 'next/image';
import openEyeIcon from "../../../public/icons/form_icons/open_eye_password.svg";
import closeEyeIcon from "../../../public/icons/form_icons/close_eye_password.svg"


type PasswordInputProps = {
    handleEventChange: (e: any) => void;
    name: string;
    placeholder: string;
}

const PasswordInput = (
  {
    handleEventChange,
    name = "password",
    placeholder = "Введите пароль"
  }: PasswordInputProps
): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <input
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required
        className="password__input"
        onBlur={e => handleEventChange(e)}
      />
      {!showPassword && (
        <Image
          src={closeEyeIcon}
          alt="close icon"
          onClick={() => toggleShowPassword()}
        />
      )}
      {showPassword && (
        <Image
          src={openEyeIcon}
          alt="open icon"
          onClick={() => toggleShowPassword()}
        />
      )}
    </>
  )
};

export default PasswordInput;