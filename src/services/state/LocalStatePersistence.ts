export class LocalStatePersistence implements IStatePersistence {
    constructor(private readonly storage: Storage = localStorage) {}

    async saveState(key: string, data: unknown): Promise<void> {
        try {
            this.storage.setItem(key, JSON.stringify(data));
        } catch (error) {
            throw new StateError('Failed to save state', error);
        }
    }

    async loadState<T>(key: string): Promise<T | null> {
        try {
            const data = this.storage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            throw new StateError('Failed to load state', error);
        }
    }

    async clearState(key: string): Promise<void> {
        try {
            this.storage.removeItem(key);
        } catch (error) {
            throw new StateError('Failed to clear state', error);
        }
    }
}