export const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const normalizeString = (str) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\s.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
};

export const fuzzySearch = (query, text) => {
  const normalizedQuery = normalizeString(query);
  const normalizedText = normalizeString(text);
  const regex = new RegExp(normalizedQuery.split("").join(".*"), "i");
  return regex.test(normalizedText);
};
