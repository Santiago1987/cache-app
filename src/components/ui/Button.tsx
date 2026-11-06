import type { Direction, MoveState } from "@/types/generalTypes";
import clsx from "clsx";
import {
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
} from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary: "bg-vblue-0 text-white",
  secondary: "bg-vgreen-0 text-white",
  danger: "bg-accent-red text-white",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export const Button = ({
  children,
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        "flex flex-row justify-evenly items-center px-2 py-2 rounded-lg shadow-lg hover:cursor-pointer hover:scale-110",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100 disabled:hover:cursor-not-allowed disabled:grayscale",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

type NavigationButtons = {
  estado: MoveState;
  handleOnChangeMove: (m: Direction) => void;
};

export const NavigationButtons = ({
  estado,
  handleOnChangeMove,
}: NavigationButtons) => {
  return (
    <div className="flex flex-row gap-4">
      <Button
        className={`flex flex-row items-center gap-2 w-30 h-10`}
        disabled={!estado.isPrev}
        onClick={() => handleOnChangeMove("first")}
      >
        <ArrowLeftToLine width={"20px"} height={"20px"} />
        <span className="text-lg">Primero</span>
      </Button>
      <Button
        className={`flex flex-row items-center gap-2 w-30 h-10`}
        disabled={!estado.isPrev}
        onClick={() => handleOnChangeMove(-1)}
      >
        <ArrowLeft width={"20px"} height={"20px"} />
        <span className="text-lg">Previo</span>
      </Button>
      <Button
        className="flex flex-row items-center gap-2 w-30 h-10"
        disabled={!estado.isNext}
        onClick={() => handleOnChangeMove(1)}
      >
        <span className="text-lg">Siguiente</span>
        <ArrowRight width={"20px"} height={"20px"} />
      </Button>
      <Button
        className="flex flex-row items-center gap-2 w-30 h-10"
        disabled={!estado.isNext}
        onClick={() => handleOnChangeMove("last")}
      >
        <span className="text-lg">Ultimo</span>
        <ArrowRightToLine width={"20px"} height={"20px"} />
      </Button>
    </div>
  );
};
