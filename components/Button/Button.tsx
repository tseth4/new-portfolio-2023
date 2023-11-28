import React from "react";
import "./ButtonStyles.scss";

interface ButtonProps {
  classname?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}
export default function Button({
  classname,
  children,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classname ? `standard-button ${classname}` : "standard-button"}
    >
      {children}
    </button>
  );
}
