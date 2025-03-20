import React from 'react';
import { render, screen } from '@testing-library/react';
import CodeGenerator from '../CodeGenerator';
/**
 * Test suite for the CodeGenerator component.
 */

/**
 * Test case to verify that the CodeGenerator component generates a 6-character alphanumeric code.
 *
 * Preconditions:
 * - The CodeGenerator component is rendered.
 *
 * Postconditions:
 * - A 6-character alphanumeric code is displayed in the document.
 */
test('generates a 6-character alphanumeric code', () => { 
  render(<CodeGenerator />);
  const codeElement = screen.getByText(/^[a-zA-Z0-9]{6}$/); // Use getByText to find the code
  expect(codeElement).toBeInTheDocument(); // Check if the element is in the document
});