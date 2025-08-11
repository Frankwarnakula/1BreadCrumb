import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination', () => {
  it('renders current page and total pages', () => {
    render(<Pagination page={2} totalPages={5} onPrev={() => {}} onNext={() => {}} />);
    expect(screen.getByText('2 of 5')).toBeInTheDocument();
  });

  it('calls onPrev and onNext', () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();
    render(<Pagination page={2} totalPages={5} onPrev={onPrev} onNext={onNext} />);
    fireEvent.click(screen.getByLabelText('Previous Page'));
    fireEvent.click(screen.getByLabelText('Next Page'));
    expect(onPrev).toHaveBeenCalled();
    expect(onNext).toHaveBeenCalled();
  });
});
