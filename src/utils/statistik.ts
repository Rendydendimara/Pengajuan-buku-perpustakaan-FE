export const toSnakeCaseString = (str: any) => {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((s: any) => s.toLowerCase())
      .join('_')
  );
};

export const COLORS_STATISTIK = [
  '#C53030',
  '#C05621',
  '#B7791F',
  '#2F855A',
  '#2C7A7B',
  '#2B6CB0',
  '#00A3C4',
  '#6B46C1',
  '#B83280',
  '#4A5568',
];
