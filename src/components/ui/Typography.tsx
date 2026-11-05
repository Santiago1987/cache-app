import clsx from "clsx";
import {
  useController,
  type Control,
  type FieldPathByValue,
  type FieldValues,
} from "react-hook-form";
import { fmt } from "@/utils/formatNumber";

export const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-3xl font-bold shrink-0">{children}</h1>;
};

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-2xl font-bold">{children}</h2>;
};

export const Dato = ({
  label,
  value,
  title = "",
  labelClassName,
  valueClassName,
}: {
  label: string;
  value?: string | number;
  title?: string;
  labelClassName?: string;
  valueClassName?: string;
}) => {
  // La alineación depende de si el valor es numérico; se calcula antes de
  // formatear para no perder la detección al pasarlo a string.
  const isNumber = typeof value === "number";

  return (
    <div className="flex flex-row w-full items-center gap-1 space-between py-0.5 px-1">
      <span
        title={title}
        className={clsx(
          "text-base font-bold shrink-0 whitespace-nowrap",
          labelClassName,
        )}
      >
        {label}
      </span>
      <span
        title={isNumber ? fmt(value) : value}
        className={clsx(
          `text-base whitespace-nowrap truncate ${isNumber ? "ml-auto text-right" : "text-left"}`,
          valueClassName,
        )}
      >
        {isNumber ? fmt(value) : value}
      </span>
    </div>
  );
};

type DFProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPathByValue<T, string | number | null>;
  label: string;
  title?: string;
  maxLength?: number;
  type?: "text" | "number";
  inputClassName?: string;
  readOnly: boolean;
  labelClassName?: string;
  autoFocus?: boolean;
};

const DatoField = <T extends FieldValues>({
  control,
  name,
  label,
  title,
  maxLength,
  type,
  inputClassName,
  readOnly,
  labelClassName,
  autoFocus,
}: DFProps<T>) => {
  const { field, fieldState } = useController({ control, name });

  const isNumber = type === "number";

  if (readOnly) {
    return (
      <Dato
        label={label}
        value={field.value}
        title={title ?? name}
        labelClassName={labelClassName}
      />
    );
  }

  return (
    <div className="flex flex-row w-full gap-1 items-center py-0.5 px-1">
      <span
        title={title ?? name}
        className={clsx(
          "text-base font-bold whitespace-nowrap",
          labelClassName,
        )}
      >
        {label}
      </span>
      <input
        {...field}
        autoFocus={autoFocus}
        value={field.value ?? ""}
        maxLength={maxLength}
        type={type}
        inputMode={isNumber ? "decimal" : undefined}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          if (isNumber) {
            const raw = e.target.value;
            // cuenta solo dígitos (ignora signo y punto decimal)
            const digits = raw.replace(/\D/g, "");
            if (maxLength && digits.length > maxLength + 2) return; // rechaza, no actualiza
            const num = e.target.valueAsNumber;
            field.onChange(raw === "" || Number.isNaN(num) ? null : num);
            return;
          }
          field.onChange(e);
        }}
        className={clsx(
          inputClassName,
          `ml-auto min-w-0 text-base text-right rounded border px-1 py-0 focus:outline-none focus:ring-1 focus:ring-vblue-0 ${
            fieldState.error ? "border-red-500" : "border-vblue-0"
          }`,
        )}
      />
    </div>
  );
};

export default DatoField;
