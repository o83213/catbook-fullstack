export const matchString = (str: string, pattern: string) => {
  if (!str) return false;
  if (pattern.trim() === "") return true;
  if (pattern.length > str.length) {
    return false;
  }
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i].toLowerCase() !== str[i].toLowerCase()) {
      return false;
    }
  }
  return true;
};
