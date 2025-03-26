export class WordTokenizer {
  tokenize(text: string): string[] {
    return text.split(/\s+/).filter(word => word.length > 0);
  }
}