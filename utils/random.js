// Método congruencial mixto
export function congruencialMixto(seed, a = 17, c = 43, m = 1000) {
  let Xn = seed;
  return () => {
    Xn = (a * Xn + c) % m;
    return Xn / m; // valor entre 0 y 1
  };
}
