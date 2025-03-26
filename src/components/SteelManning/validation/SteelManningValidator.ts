import { ValidationResult } from '../../../shared/types/validation';

export class SteelManningValidator {
  private static MIN_LENGTH = 20;
  private static MAX_LENGTH = 1000;

  static validate(original: string, restatement: string): ValidationResult {
    const errors: string[] = [];

    if (restatement.length < this.MIN_LENGTH) {
      errors.push('Restatement is too short. Please provide more detail.');
    }

    if (restatement.length > this.MAX_LENGTH) {
      errors.push('Restatement is too long. Please be more concise.');
    }

    if (restatement.toLowerCase() === original.toLowerCase()) {
      errors.push('Restatement is too similar to the original statement.');
    }

    const similarityScore = this.calculateSimilarity(original, restatement);
    if (similarityScore < 0.3) {
      errors.push('Restatement may be missing key points from the original statement.');
    }

    return {
      isValid: errors.length === 0,
      errors,
      similarityScore
    };
  }

  private static calculateSimilarity(str1: string, str2: string): number {
    // Simple implementation - in practice, use a proper NLP library
    const words1 = new Set(str1.toLowerCase().split(/\s+/));
    const words2 = new Set(str2.toLowerCase().split(/\s+/));
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    return intersection.size / Math.max(words1.size, words2.size);
  }
}