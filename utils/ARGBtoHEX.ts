export const ARGBtoHEX = (argb: number): string =>
  `#${(argb & 0x0ffffff).toString(16).padStart(6, "0")}${(argb >>> 24)
    .toString(16)
    .padStart(2, "0")}`;
