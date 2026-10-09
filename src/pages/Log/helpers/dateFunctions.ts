export const toStamp = (day: number, sec: number) => day * 100000 + sec;

export const stampFromData = (d: string, t: string): number => {
  const [dd, mm, yyyy] = d.split("/");
  const [h, m, s = 0] = t.split(":");
  return toStamp(+yyyy * 10000 + +mm * 100 + +dd, +h * 3600 + +m * 60 + +s);
};

export const stampFromInput = (v: string): number | null => {
  if (!v) return null;
  const [date, time] = v.split("T");
  const [yyyy, mm, dd] = date.split("-");
  const [h, m, s = 0] = time.split(":");
  return toStamp(+yyyy * 10000 + +mm * 100 + +dd, +h * 3600 + +m * 60 + +s);
};
