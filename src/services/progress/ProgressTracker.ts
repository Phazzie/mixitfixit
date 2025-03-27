export class ProgressTracker implements IProgressTracker {
    constructor(private readonly persistence: IStatePersistence) {}

    async saveCheckpoint(phase: string, data: unknown): Promise<void> {
        await this.persistence.saveState(`checkpoint_${phase}`, data);
        await this.persistence.saveState('last_phase', phase);
    }

    async loadCheckpoint(phase: string): Promise<unknown> {
        return this.persistence.loadState(`checkpoint_${phase}`);
    }

    async getLastPhase(): Promise<string | null> {
        return this.persistence.loadState('last_phase');
    }
}