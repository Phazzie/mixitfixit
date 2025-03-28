export interface IStatePersistence {
    saveState(key: string, data: unknown): Promise<void>;
    loadState<T>(key: string): Promise<T | null>;
    clearState(key: string): Promise<void>;
}