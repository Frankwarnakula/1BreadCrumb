import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  it('renders input and label', () => {
    render(<SearchBar search="test" onSearchChange={() => {}} />);
    expect(screen.getByLabelText(/Book Search/i)).toBeInTheDocument();
  });

  it('calls onSearchChange when typing', () => {
    const onSearchChange = vi.fn();
    render(<SearchBar search="" onSearchChange={onSearchChange} />);
    fireEvent.change(screen.getByLabelText(/Book Search/i), { target: { value: 'abc' } });
    expect(onSearchChange).toHaveBeenCalledWith('abc');
  });
});
