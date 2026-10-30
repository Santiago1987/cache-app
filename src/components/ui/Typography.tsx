import clsx from "clsx";
import {
  useController,
  type Control,
  type FieldPathByValue,
  type FieldValues,
} from "react-hook-form";

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
}: {
  label: string;
  value?: string | number;
  title?: string;
}) => {
  // Acepta "1234", "-12.5", "1.234,50", "$ 1.234,50", "15%"
  // const isNumeric = !!value && /^[-+$%\s]*\d[\d.,\s]*[%]?$/.test(value);

  return (
    <div className="flex flex-row w-full gap-1 space-between py-0.5 px-1">
      <span
        title={title}
        className="text-base font-bold shrink-0 whitespace-nowrap"
      >
        {label}
      </span>
      <span
        className={`text-base whitespace-nowrap ${typeof value === "number" ? "ml-auto text-right" : "text-left"}`}
      >
        {value}
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
}: DFProps<T>) => {
  const { field, fieldState } = useController({ control, name });

  const isNumber = type === "number";

  if (readOnly) {
    return <Dato label={label} value={field.value} title={title ?? name} />;
  }

  return (
    <div className="flex flex-row w-full gap-1 items-center py-0.5 px-1">
      <span
        title={title ?? name}
        className="text-base font-bold whitespace-nowrap"
      >
        {label}
      </span>
      <input
        {...field}
        value={field.value ?? ""}
        maxLength={maxLength}
        type={type}
        inputMode={isNumber ? "decimal" : undefined}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          if (isNumber) {
            const v = e.target.value;
            // cuenta solo dígitos (ignora signo y punto decimal)
            const digits = v.replace(/\D/g, "");
            if (maxLength && digits.length > maxLength) return; // rechaza, no actualiza
            field.onChange(v === "" ? "" : e.target.valueAsNumber);
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
