export const darkenColor = (hex, percent) => {
  hex = hex.replace(/^#/, "");

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.floor(r * (1 - percent / 100));
  g = Math.floor(g * (1 - percent / 100));
  b = Math.floor(b * (1 - percent / 100));

  r = (r < 0 ? 0 : r).toString(16).padStart(2, "0");
  g = (g < 0 ? 0 : g).toString(16).padStart(2, "0");
  b = (b < 0 ? 0 : b).toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
};
