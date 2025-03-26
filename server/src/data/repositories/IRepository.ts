interface IRepository<T> {
  find(id: string): Promise<Result<T>>;
  findAll(): Promise<Result<T[]>>;
  create(entity: T): Promise<Result<T>>;
  update(id: string, entity: T): Promise<Result<T>>;
  delete(id: string): Promise<Result<void>>;
}