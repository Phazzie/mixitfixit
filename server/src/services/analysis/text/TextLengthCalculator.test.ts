describe('TextLengthCalculator', () => {
  const calculator = new TextLengthCalculator();

  it('should calculate text length', () => {
    expect(calculator.calculate('test')).toBe(4);
    expect(calculator.calculate('')).toBe(0);
  });
});