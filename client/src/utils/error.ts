import { Result, TryCatchOptions } from "@/types/error"

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
  options?: TryCatchOptions,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    if (process.env.NODE_ENV !== "production" && !options?.disableLog)
      console.error(error as E, options?.errorHandlerOptions);
    options?.callbackFn?.(error);
    return [null, error as E];
  }
}
