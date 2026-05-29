export const addMinutes = (d: Date, n: number) =>
  new Date(d.getTime() + n * 60_000);

export const addHours = (d: Date, n: number) =>
  new Date(d.getTime() + n * 3600_000);

export const addDays = (d: Date, n: number) =>
  new Date(d.getTime() + n * 86400_000);
