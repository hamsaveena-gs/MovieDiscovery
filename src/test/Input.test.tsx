import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/components/ui/Input';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Input placeholder="Search..." />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('reflects value prop', () => {
    render(<Input value="hello" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('hello');
  });

  it('calls onChange handler on input', () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('merges custom className', () => {
    render(<Input className="my-class" />);
    expect(screen.getByRole('textbox').className).toContain('my-class');
  });

  it('forwards type attribute', () => {
    render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });
});
