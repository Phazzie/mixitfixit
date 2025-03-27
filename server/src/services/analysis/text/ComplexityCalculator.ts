export class ComplexityCalculator {
  calculate(text: string): number {
    return text.split(/[.!?]/).length;
  }
}