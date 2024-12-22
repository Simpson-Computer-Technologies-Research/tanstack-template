const useLocalStorage = () => {
  const get = ({ key }: Readonly<{ key?: string }>): any => {
    const all = () => {
      const result: any = {};

      for (const [key, value] of Object.entries(localStorage)) {
        result[key] = value;
      }

      return result;
    };

    const item = key ? localStorage.getItem(key) : all();

    return item;
  };

  const set = ({
    key,
    value,
  }: Readonly<{
    key: string;
    value: Readonly<Record<string, any>> | string;
  }>) => {
    if (typeof value === "object") {
      return localStorage.setItem(key, JSON.stringify(value));
    }

    return localStorage.setItem(key, value);
  };

  return { get, set };
};

export { useLocalStorage };
