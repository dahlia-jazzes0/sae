export const memoizeAsync = <Args extends unknown[], Result>(
  asyncFn: (...args: Args) => Promise<Result>,
  keyFn?: (...args: Args) => string,
) => {
  const cache = new Map<string, Promise<Result>>();
  const getKey = keyFn ?? defaultKeyFn;
  return (...args: Args) => {
    const key = getKey(...args);
    if (!cache.has(key)) {
      const promise = asyncFn(...args).catch((error) => {
        cache.delete(key);
        throw error;
      });
      cache.set(key, promise);
    }
    return cache.get(key)!;
  };
  function defaultKeyFn(...args: Args) {
    return JSON.stringify(args);
  }
};
