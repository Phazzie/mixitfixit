export interface IProgressTracker {
    saveCheckpoint(phase: string, data: unknown): Promise<void>;
    loadCheckpoint(phase: string): Promise<unknown>;
    getLastPhase(): Promise<string | null>;
}