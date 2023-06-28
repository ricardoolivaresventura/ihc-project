export const formatLessThan10 = (n) => {
  if (n < 10) {
    return `0${n}`;
  }
  return n;
};
