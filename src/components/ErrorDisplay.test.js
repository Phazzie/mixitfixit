import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorDisplay } from './ErrorDisplay';
import { ErrorHandlerProvider, useErrorHandler } from '../contexts/ErrorHandlerContext';

// Mock the useErrorHandler hook
jest.mock('../contexts/ErrorHandlerContext');

describe('ErrorDisplay', () => {
  // Test if the component renders without crashing
  it('should render without crashing', () => {
    useErrorHandler.mockReturnValue({ error: null, setError: jest.fn() });
    render(
      <ErrorHandlerProvider>
        <ErrorDisplay />
      </ErrorHandlerProvider>
    );
  });

  // Test if the component displays the placeholder error initially
  it('should display the placeholder error initially', () => {
    useErrorHandler.mockReturnValue({ error: null, setError: jest.fn() });
    render(
      <ErrorHandlerProvider>
        <ErrorDisplay />
      </ErrorHandlerProvider>
    );
    expect(screen.getByText('Error: [placeholder]')).toBeInTheDocument();
  });

  // Test if the component displays the error from useErrorHandler when it's available
  it('should display the error from useErrorHandler when it\'s available', () => {
    useErrorHandler.mockReturnValue({ error: 'Test Error', setError: jest.fn() });
    render(
      <ErrorHandlerProvider>
        <ErrorDisplay />
      </ErrorHandlerProvider>
    );
    expect(screen.getByText('Error: Test Error')).toBeInTheDocument();
  });

  // Test if the component does not render when there is no error
  it('should not render if there is no error', () => {
    useErrorHandler.mockReturnValue({ error: null, setError: jest.fn() });
    const { container } = render(
      <ErrorHandlerProvider>
        <ErrorDisplay />
      </ErrorHandlerProvider>
    );
    expect(container).toBeEmptyDOMElement();
  });
});