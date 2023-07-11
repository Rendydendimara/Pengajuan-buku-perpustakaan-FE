export const setLocal = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    // Set storage here
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocal = (key: string) => {
  let result: any = '';
  if (typeof window !== 'undefined') {
    result = localStorage.getItem(key);
  }

  return result ? JSON.parse(result) : false;
};
