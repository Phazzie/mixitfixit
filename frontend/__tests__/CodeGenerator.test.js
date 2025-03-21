import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CodeGenerator from '../components/CodeGenerator';
import { generateRandomCode } from '../utils/codeUtils';

jest.mock('../components/CodeDisplay', () => ({ code }) => <div data-testid="mock-codedisplay">{code}</div>);
jest.mock('../utils/codeUtils');

/**
 * Test suite for the CodeGenerator component.
 */
describe('CodeGenerator Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders correctly', () => {
    render(<CodeGenerator />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  it('displays a button', () => {
    render(<CodeGenerator />);
    expect(screen.getByRole('button', { name: /Generate Code/i })).toBeInTheDocument();
  });
  
  it('displays the code using the CodeDisplay component', () => {
    render(<CodeGenerator />);
    expect(screen.getByTestId('mock-codedisplay')).toBeInTheDocument();
  });
  
  it('calls generateRandomCode and setCode when the button is clicked', () => {
    const mockGeneratedCode = 'ABC1234';
    generateRandomCode.mockReturnValue(mockGeneratedCode);
    
    const { container } = render(<CodeGenerator />);
    const button = screen.getByRole('button', { name: /Generate Code/i });
    fireEvent.click(button);

    expect(generateRandomCode).toHaveBeenCalled();

    const codeDisplay = container.querySelector('[data-testid="mock-codedisplay"]');
    expect(codeDisplay).toHaveTextContent(mockGeneratedCode);
  });
});
