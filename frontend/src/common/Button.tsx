import { MouseEventHandler } from "react";
import { ButtonVariant } from "../types/Button";

const styles = {
  [ButtonVariant.primary]:
    "bg-orange-400 hover:bg-black text-white font-bold py-2 px-4 rounded",
  [ButtonVariant.danger]:
    "bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded",
};

const activeStyles = {
  [ButtonVariant.primary]: "bg-tblue-700 text-white py-2",
};

type Props = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  url?: string;
  externalUrl?: string;
  active?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
  children,
  variant,
  className,
  onClick,
  url,
  externalUrl,
  active,
  disabled,
  ...props
}) => (
  <button
    className={variant ? styles[variant] : ""}
    type={props.type || "button"}
    onClick={onClick}
    {...props}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.defaultProps = {
  variant: ButtonVariant.primary,
  type: "button",
};

export default Button;
