import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from '@/components/ui/Select';

const options = [
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
];

describe('Select', () => {
  it('renders a select element', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders placeholder option when provided', () => {
    render(<Select options={options} placeholder="All Genres" />);
    expect(screen.getByRole('option', { name: 'All Genres' })).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('option', { name: 'Action' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Comedy' })).toBeInTheDocument();
  });

  it('shows selected value', () => {
    render(<Select options={options} value="action" onChange={() => {}} />);
    expect(screen.getByRole('combobox')).toHaveValue('action');
  });

  it('calls onChange when user selects an option', () => {
    const onChange = jest.fn();
    render(<Select options={options} onChange={onChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'comedy' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('merges custom className', () => {
    render(<Select options={options} className="extra" />);
    expect(screen.getByRole('combobox').className).toContain('extra');
  });
});
