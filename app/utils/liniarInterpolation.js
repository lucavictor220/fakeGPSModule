export const findEquation = (x1, y1, x2, y2) => {
  const m = (y2 - y1) / (x2 - x1);
  const b = y1 - m * x1;
  return {
    m,
    b,
  }
};

export const findNewPoints = (d, m, b, x1, y1) => {
  const z = (m*b - m*y1 - x1);
  const k = Math.pow(m, 2) + 1;
  const r = Math.pow(d, 2) - (2*y1*b) - Math.pow(x1, 2) - Math.pow(b, 2) - Math.pow(y1, 2);
  x11 = (-2 * z + Math.pow((4*z*z + 4*k*r), 0.5)) / (2 * k);
  x12 = (-2 * z - Math.pow((4*z*z + 4*k*r), 0.5)) / (2 * k);
  console.log(x11, x12);
};
