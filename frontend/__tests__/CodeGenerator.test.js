import React from 'react';
import { render, screen } from '@testing-library/react';
import CodeGenerator from '../CodeGenerator';

test('generates a 6-character alphanumeric code', () => {
  render(<CodeGenerator />);
  const codeElement = screen.getByText(/^[a-zA-Z0-9]{6}$/);
  expect(codeElement).toBeInTheDocument();
});