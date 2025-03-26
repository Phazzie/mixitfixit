describe('ComplexityCalculator', () => {
  const calculator = new ComplexityCalculator();

  it('should calculate sentence complexity', () => {
    expect(calculator.calculate('One. Two! Three?')).toBe(3);
    expect(calculator.calculate('Simple')).toBe(1);
  });
});