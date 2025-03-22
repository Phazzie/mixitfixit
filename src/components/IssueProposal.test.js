/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import IssueProposal from './IssueProposal';

describe('IssueProposal Component', () => {
  it('should render without crashing', () => {
    // Render the component
    render(<IssueProposal />);

    // Check if the component renders without throwing an error
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render a text area', () => {
    // Render the component
    render(<IssueProposal />);

    // Check if a text area is present
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render a "Submit" button', () => {
    // Render the component
    render(<IssueProposal />);

    // Check if a button with the text "Submit" is present
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should save the issue to the state when the "Submit" button is clicked', () => {
    // Render the component
    render(<IssueProposal />);

    // Get the text area and the submit button
    const textArea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // Simulate typing an issue proposal
    fireEvent.change(textArea, { target: { value: 'Test issue proposal' } });

    // Simulate clicking the submit button
    fireEvent.click(submitButton);

    // Check if the text area is empty
    expect(textArea.value).toBe('');
  });

  it('should clear the input after submitting the text', () => {
    // Render the component
    render(<IssueProposal />);

    // Get the text area and the submit button
    const textArea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // Simulate typing an issue proposal
    fireEvent.change(textArea, { target: { value: 'Test issue proposal' } });

    // Simulate clicking the submit button
    fireEvent.click(submitButton);

    // Check if the text area is empty
    expect(textArea.value).toBe('');
  });
});