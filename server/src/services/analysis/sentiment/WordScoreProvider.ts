export class WordScoreProvider {
  constructor(private readonly dictionary: Map<string, number>) {}

  getScore(word: string): number {
    return this.dictionary.get(word.toLowerCase()) ?? 0;
  }
}