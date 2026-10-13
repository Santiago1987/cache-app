import clsx from "clsx";
import type { SelectHTMLAttributes } from "react";

type Option = {
  value: string | number;
  label: string;
};

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  placeholder?: string;
};

export const Select = ({
  options,
  placeholder,
  className,
  ...props
}: Props) => {
  return (
    <select
      className={clsx(
        "rounded-md px-1 h-full bg-white border border-vblue-0 text-md focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer",
        className,
      )}
      {...props}
    >
      {placeholder && <option value={"all"}>{placeholder}</option>}
      {[...options].map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
