// Interface Segregation: Small, focused interfaces
export interface AnalysisInput {
  apiKey: string;
  statements: [string, string];
}

export interface Analysis {
  summary: string;
  fallacies: string[];
  confidence: number;
}

// Open for extension, closed for modification
export interface IAnalyzer {
  analyze(model: GenerativeModel, statements: [string, string]): Promise<Result<Analysis>>;
}