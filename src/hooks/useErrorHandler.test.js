import { act, renderHook } from '@testing-library/react';
import { useErrorHandler } from './useErrorHandler';

describe('useErrorHandler', () => {
  // Test initialization
  it('should initialize with no errors', () => {
    const { result } = renderHook(() => useErrorHandler());
    expect(result.current.errors).toEqual({});
  });

  // Test setting an error
  it('should set an error correctly', () => {
    const { result } = renderHook(() => useErrorHandler());
    
    act(() => {
      result.current.handleError('testKey', 'Test error message');
    });
    
    expect(result.current.errors).toEqual({
      testKey: 'Test error message'
    });
  });

  // Test clearing an error
  it('should clear a specific error', () => {
    const { result } = renderHook(() => useErrorHandler());
    
    // Set up two errors
    act(() => {
      result.current.handleError('error1', 'First error');
      result.current.handleError('error2', 'Second error');
    });
    
    // Verify both errors exist
    expect(result.current.errors).toEqual({
      error1: 'First error',
      error2: 'Second error'
    });
    
    // Clear one error
    act(() => {
      result.current.clearError('error1');
    });
    
    // Verify only one error remains
    expect(result.current.errors).toEqual({
      error2: 'Second error'
    });
  });

  // Test clearing all errors
  it('should clear all errors', () => {
    const { result } = renderHook(() => useErrorHandler());
    
    // Set up multiple errors
    act(() => {
      result.current.handleError('error1', 'First error');
      result.current.handleError('error2', 'Second error');
    });
    
    // Clear all errors
    act(() => {
      result.current.clearAllErrors();
    });
    
    // Verify all errors are cleared
    expect(result.current.errors).toEqual({});
  });

  // Test error persistence between renders
  it('should maintain errors across re-renders', () => {
    const { result, rerender } = renderHook(() => useErrorHandler());
    
    // Set an error
    act(() => {
      result.current.handleError('testKey', 'Test error message');
    });
    
    // Re-render the hook
    rerender();
    
    // Verify the error still exists
    expect(result.current.errors).toEqual({
      testKey: 'Test error message'
    });
  });

  // Test replacing an existing error
  it('should replace an existing error with the same key', () => {
    const { result } = renderHook(() => useErrorHandler());
    
    // Set an initial error
    act(() => {
      result.current.handleError('duplicateKey', 'Original error');
    });
    
    // Replace with new error message
    act(() => {
      result.current.handleError('duplicateKey', 'Updated error');
    });
    
    // Verify error was replaced, not appended
    expect(result.current.errors).toEqual({
      duplicateKey: 'Updated error'
    });
  });
});

