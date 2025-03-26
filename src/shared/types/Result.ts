type Result<T> = Success<T> | Failure;

type Success<T> = {
    readonly success: true;
    readonly data: T;
};

type Failure = {
    readonly success: false;
    readonly error: ApplicationError;
};