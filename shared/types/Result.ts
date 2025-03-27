type Success<T> = {
  success: true;
  data: T;
};

type Failure = {
  success: false;
  error: Error;
};

export type Result<T> = Success<T> | Failure;

export const success = <T>(data: T): Success<T> => ({
  success: true,
  data
});

export const failure = (error: Error): Failure => ({
  success: false,
  error
});