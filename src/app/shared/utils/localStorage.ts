export const getLocalStorage = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  if (value !== null) {
    return JSON.parse(value);
  }
  return null;
};
export const setLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const removeLocalStorage = (...keys: string[]): void => {
  keys.forEach((key) => {
    console.log(key);
    localStorage.removeItem(key);
  });
};
export const clearLocalStorage = (): void => {
  localStorage.clear();
};
