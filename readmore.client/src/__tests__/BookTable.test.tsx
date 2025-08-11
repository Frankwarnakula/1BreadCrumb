import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookTable from '../components/BookTable';

const books = [
  { bookName: 'Book 1', owner: 'Alice', availability: true },
  { bookName: 'Book 2', owner: 'Bob', availability: false },
];

describe('BookTable', () => {
  it('renders book rows', () => {
    render(
      <BookTable
        books={books}
        onSetAvailable={() => {}}
        onSetNotAvailable={() => {}}
        onDelete={() => {}}
      />
    );
    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
  });

  it('calls onSetAvailable, onSetNotAvailable, and onDelete', () => {
    const onSetAvailable = vi.fn();
    const onSetNotAvailable = vi.fn();
    const onDelete = vi.fn();
    render(
      <BookTable
        books={books}
        onSetAvailable={onSetAvailable}
        onSetNotAvailable={onSetNotAvailable}
        onDelete={onDelete}
      />
    );
    fireEvent.click(screen.getAllByTitle('Return Book')[0]);
    fireEvent.click(screen.getAllByTitle('Borrow Book')[0]);
    fireEvent.click(screen.getAllByTitle('Delete Book')[0]);
    expect(onSetAvailable).toHaveBeenCalled();
    expect(onSetNotAvailable).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
  });
});
