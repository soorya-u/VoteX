type THandlerOptions = Partial<{
  throwError: boolean;
  errorMessage: string;
}>;

type Success<T> = [T, null];

type Failure<E> = [null, E];

export type Result<T, E = Error> = Success<T> | Failure<E>;

export type TryCatchOptions = Partial<{
  disableLog: boolean;
  errorHandlerOptions: THandlerOptions;
  callbackFn: <E = Error>(error: E) => void;
}>;
