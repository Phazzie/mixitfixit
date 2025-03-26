export type PromptTemplate = {
    readonly id: string;
    readonly template: string;
    readonly parameters: ReadonlyArray<string>;
    readonly maxTokens: number;
    readonly temperature: number;
};

export type PromptParameters = Record<string, string>;

export type GenerationConfig = {
    readonly temperature: number;
    readonly topK: number;
    readonly topP: number;
    readonly maxTokens: number;
};