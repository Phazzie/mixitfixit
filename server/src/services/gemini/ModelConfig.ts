export interface ModelConfig {
  modelName: string;
  safetySettings: SafetySetting[];
  generationConfig: GenerationConfig;
}

export interface SafetySetting {
  category: string;
  threshold: string;
}

export interface GenerationConfig {
  temperature: number;
  topK: number;
  topP: number;
  maxOutputTokens: number;
}

export const DEFAULT_MODEL_CONFIG: ModelConfig = {
  modelName: "gemini-2.0-flash",
  safetySettings: [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE"
    }
  ],
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024
  }
};