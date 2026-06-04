import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterSelect from '@/features/home/components/FilterSelect';

const options = [
  { value: '28', label: 'Action' },
  { value: '35', label: 'Comedy' },
];

describe('FilterSelect', () => {
  it('renders select element', () => {
    render(<FilterSelect name="genre" value="" placeholder="All Genres" options={options} onChange={() => {}} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders placeholder option', () => {
    render(<FilterSelect name="genre" value="" placeholder="All Genres" options={options} onChange={() => {}} />);
    expect(screen.getByRole('option', { name: 'All Genres' })).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<FilterSelect name="genre" value="" placeholder="All Genres" options={options} onChange={() => {}} />);
    expect(screen.getByRole('option', { name: 'Action' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Comedy' })).toBeInTheDocument();
  });

  it('calls onChange with selected value', () => {
    const onChange = jest.fn();
    render(<FilterSelect name="genre" value="" placeholder="All Genres" options={options} onChange={onChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '28' } });
    expect(onChange).toHaveBeenCalledWith('28');
  });

  it('has name and id attributes for accessibility', () => {
    render(<FilterSelect name="genre" value="" placeholder="All Genres" options={options} onChange={() => {}} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('name', 'genre');
    expect(select).toHaveAttribute('id', 'genre');
  });

  it('shows current value as selected', () => {
    render(<FilterSelect name="genre" value="35" placeholder="All Genres" options={options} onChange={() => {}} />);
    expect(screen.getByRole('combobox')).toHaveValue('35');
  });
});

