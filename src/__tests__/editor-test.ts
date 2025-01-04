// src/__tests__/RichTextEditor.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RichTextEditor from '../RichTextEditor';

describe('RichTextEditor', () => {
  it('renders without crashing', () => {
    render(<RichTextEditor />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles markdown mode toggle', () => {
    render(<RichTextEditor />);
    const toggleButton = screen.getByTitle('Toggle Markdown Mode');
    fireEvent.click(toggleButton);
    expect(screen.getByRole('textbox')).toHaveClass('font-mono');
  });

  it('handles bold formatting', () => {
    render(<RichTextEditor />);
    const boldButton = screen.getByTitle('Bold');
    fireEvent.click(boldButton);
    // Check if execCommand was called with correct parameters
    expect(document.execCommand).toHaveBeenCalledWith('bold', false, null);
  });

  it('handles link insertion', () => {
    render(<RichTextEditor />);
    const linkButton = screen.getByTitle('Insert Link');
    fireEvent.click(linkButton);
    expect(screen.getByPlaceholderText('Enter URL')).toBeInTheDocument();
  });

  it('calls onChange with correct content', () => {
    const handleChange = jest.fn();
    render(<RichTextEditor onChange={handleChange} />);
    const editor = screen.getByRole('textbox');
    fireEvent.input(editor, { target: { innerHTML: 'Test content' } });
    expect(handleChange).toHaveBeenCalledWith({
      html: 'Test content',
      markdown: expect.any(String)
    });
  });
});