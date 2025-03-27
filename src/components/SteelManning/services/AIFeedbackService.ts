import { GeminiClient } from '../../../services/gemini/GeminiClient';

export interface AIFeedback {
  isAccurate: boolean;
  missingPoints: string[];
  suggestions: string[];
  confidence: number;
}

export class AIFeedbackService {
  private client: GeminiClient;

  constructor(client: GeminiClient) {
    this.client = client;
  }

  async analyzeSteelManning(
    original: string,
    restatement: string
  ): Promise<AIFeedback> {
    const prompt = `
      Original statement: "${original}"
      Restatement: "${restatement}"
      
      Analyze if the restatement accurately captures the essence of the original statement.
      Focus on:
      1. Key points maintained
      2. Emotional tone preserved
      3. Main concerns addressed
      4. Missing important details
      
      Provide feedback in JSON format with these fields:
      - isAccurate (boolean)
      - missingPoints (array of strings)
      - suggestions (array of strings)
      - confidence (number between 0 and 1)
    `;

    const response = await this.client.generateContent(prompt);
    return JSON.parse(response);
  }
}