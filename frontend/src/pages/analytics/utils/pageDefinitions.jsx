export const rankOptions = [1, 2, 3, 4, 5],
  fmt = (n) => Number(n || 0).toLocaleString("pt-BR");
export const scoreColor = (n) =>
  n >= 70 ? "#e57f70" : n >= 48 ? "#d4ab58" : "#62ac8a";
