export const wrapWithDebug = <T extends (...args: any[]) => any>(
  fn: T,
  functionName?: string,
  enableLogging: boolean = process.env.API_DOC_ENV !== "prod" //실제 운영환경에서는 result.finally 필요없음
): T => {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const name = functionName || fn.name || "anonymousFunction";
    console.debug(`${name} start`);

    const result = fn(...args);

    if (result instanceof Promise && enableLogging) {
      return result.finally(() => console.debug(`${name} end`)) as ReturnType<T>;
    }

    console.debug(`${name} end`);
    return result;
  }) as T;
};
