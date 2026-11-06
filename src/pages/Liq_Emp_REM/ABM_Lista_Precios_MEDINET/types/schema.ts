import { z } from "zod";

export const TrasXKMRowSchema = z.object({
  num: z.number().max(999).min(0).nullable(),
  hasta: z
    .number({ message: "Hasta es obligatorio" })
    .max(9999)
    .min(0)
    .nullable()
    .superRefine((v, ctx) => {
      if (v === null) {
        ctx.addIssue({
          code: "custom",
          message: "Hasta es obligatorio",
        });
      }
    }),
  comun: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  medico: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  utim: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  unm: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  comunn: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  medicon: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  utimn: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  unmn: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  auto: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  auton: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
});

export const ListPreRemSchema = z.object({
  codigo: z
    .string()
    .max(6, "El codigo no puede tener mas de 6 caracteres")
    .min(1, "El codigo es mandatorio"),
  desc: z.string().max(50),
  vigencia: z.string().max(9),
  caa: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  caan: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  cac: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  cacn: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  cam: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  camn: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  cau: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  caun: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  can: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  cann: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  kma: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  mkma: z
    .number()
    .max(99999, "El numero no puede ser mayor a 99999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  kmc: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  mkmc: z
    .number()
    .max(99999, "El numero no puede ser mayor a 99999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  kmm: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  mkmm: z
    .number()
    .max(99999, "El numero no puede ser mayor a 99999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  kmu: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  mkmu: z
    .number()
    .max(99999, "El numero no puede ser mayor a 99999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  kmn: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  mkmn: z
    .number()
    .max(99999, "El numero no puede ser mayor a 99999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  reca: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  recc: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  recm: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  recu: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  recn: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  frac: z
    .number()
    .max(99, "El numero no puede ser mayor a 99")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  vta: z
    .number()
    .max(9999999, "El numero no puede ser mayor a 9999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  reces: z
    .number()
    .max(9999999, "El numero no puede ser mayor a 9999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  vicacdi: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  vicapdi: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  vicardi: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  vicacno: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  vicapno: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  vicario: z
    .number()
    .max(99999999, "El numero no puede ser mayor a 99999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  viprcdi: z
    .number()
    .max(9999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  viprpdi: z
    .number()
    .max(9999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  viprrdi: z
    .number()
    .max(9999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  viprcno: z
    .number()
    .max(9999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  viprpno: z
    .number()
    .max(9999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  viprrno: z
    .number()
    .max(9999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  vipmcdi: z
    .number()
    .max(9999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  vipmpdi: z
    .number()
    .max(9999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  vipmrdi: z
    .number()
    .max(9999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  vipmcno: z
    .number()
    .max(9999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  vipmpno: z
    .number()
    .max(9999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  vipmrno: z
    .number()
    .max(9999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espccd: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espmcd: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espucd: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espncd: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espccn: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espmcn: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espucn: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espncn: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espacd: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espacn: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espcpd: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espmpd: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espupd: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espnpd: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espcpn: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espmpn: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espupn: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espnpn: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espapd: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  espapn: z
    .number()
    .max(999999999, "El numero no puede ser mayor a 9999999999")
    .min(0, "El numero no puede ser negativo")
    .nullable(),
  trasladosXKm: z.array(TrasXKMRowSchema),
});

export type ListPreRem = z.infer<typeof ListPreRemSchema>;

export type TrasXKMRow = z.infer<typeof TrasXKMRowSchema>;

export const initTableForm: TrasXKMRow = {
  num: null,
  hasta: null,
  comun: null,
  medico: null,
  utim: null,
  unm: null,
  comunn: null,
  medicon: null,
  utimn: null,
  unmn: null,
  auto: null,
  auton: null,
};

export const initForm: ListPreRem = {
  codigo: "",
  desc: "",
  vigencia: "",
  caa: null,
  caan: null,
  cac: null,
  cacn: null,
  cam: null,
  camn: null,
  cau: null,
  caun: null,
  can: null,
  cann: null,
  kma: null,
  mkma: null,
  kmc: null,
  mkmc: null,
  kmm: null,
  mkmm: null,
  kmu: null,
  mkmu: null,
  kmn: null,
  mkmn: null,
  reca: null,
  recc: null,
  recm: null,
  recu: null,
  recn: null,
  frac: null,
  vta: null,
  reces: null,
  vicacdi: null,
  vicapdi: null,
  vicardi: null,
  vicacno: null,
  vicapno: null,
  vicario: null,
  viprcdi: null,
  viprpdi: null,
  viprrdi: null,
  viprcno: null,
  viprpno: null,
  viprrno: null,
  vipmcdi: null,
  vipmpdi: null,
  vipmrdi: null,
  vipmcno: null,
  vipmpno: null,
  vipmrno: null,
  espccd: null,
  espmcd: null,
  espucd: null,
  espncd: null,
  espccn: null,
  espmcn: null,
  espucn: null,
  espncn: null,
  espacd: null,
  espacn: null,
  espcpd: null,
  espmpd: null,
  espupd: null,
  espnpd: null,
  espcpn: null,
  espmpn: null,
  espupn: null,
  espnpn: null,
  espapd: null,
  espapn: null,
  trasladosXKm: [
    {
      num: null,
      hasta: null,
      comun: null,
      medico: null,
      utim: null,
      unm: null,
      comunn: null,
      medicon: null,
      utimn: null,
      unmn: null,
      auto: null,
      auton: null,
    },
  ],
};

export const ColsMainHeader = [
  "Auto",
  "Amb. Comun",
  "Amb. Médico.",
  "Amb. UTIM",
  "Amb. Neotnatología",
] as const;
