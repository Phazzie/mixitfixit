import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { SteelManning } from '../SteelManning';
import { usePhaseManager } from '../../../phase/hooks/usePhaseManager';

jest.mock('../../../phase/hooks/usePhaseManager');

describe('SteelManning', () => {
  const mockOnComplete = jest.fn();
  
  beforeEach(() => {
    (usePhaseManager as jest.Mock).mockReturnValue({
      getPhaseData: () => ({ statement: 'Original statement' })
    });
  });

  it('should render input and controls', () => {
    render(<SteelManning onComplete={mockOnComplete} />);
    
    expect(screen.getByPlaceholderText(/restate/i)).toBeInTheDocument();
    expect(screen.getByText(/confirm understanding/i)).toBeInTheDocument();
    expect(screen.getByText(/needs revision/i)).toBeInTheDocument();
  });

  it('should handle restatement submission', () => {
    render(<SteelManning onComplete={mockOnComplete} />);
    
    const input = screen.getByPlaceholderText(/restate/i);
    fireEvent.change(input, { target: { value: 'Restatement' } });
    fireEvent.click(screen.getByText(/submit restatement/i));
    
    expect(input).toHaveValue('Restatement');
  });

  it('should handle confirmation', () => {
    render(<SteelManning onComplete={mockOnComplete} />);
    
    const input = screen.getByPlaceholderText(/restate/i);
    fireEvent.change(input, { target: { value: 'Restatement' } });
    fireEvent.click(screen.getByText(/confirm understanding/i));
    
    expect(mockOnComplete).toHaveBeenCalledWith(expect.objectContaining({
      restatement: 'Restatement',
      isConfirmed: true
    }));
  });
});