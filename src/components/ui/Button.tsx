import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary: "bg-vblue-0 text-white",
  secondary: "bg-vgreen-0 text-white",
  danger: "bg-accent-red text-white",
} as const;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        "flex flex-row justify-evenly items-center px-2 py-2 rounded-lg shadow-lg hover:cursor-pointer hover:scale-110",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
