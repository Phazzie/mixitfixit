// Single Responsibility: Provides sentiment scores for individual words
export class SentimentDictionary implements ISentimentDictionary {
  constructor(private readonly dictionaryLoader: IDictionaryLoader) {}

  getScore(token: string): number {
    return this.dictionaryLoader.getWordScore(token) ?? 0;
  }
}