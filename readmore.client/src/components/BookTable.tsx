import React from 'react';

interface Book {
  bookName: string;
  owner: string;
  availability: boolean;
}

interface BookTableProps {
  books: Book[];
  onSetAvailable: (idx: number) => void;
  onSetNotAvailable: (idx: number) => void;
  onDelete: (idx: number) => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, onSetAvailable, onSetNotAvailable, onDelete }) => (
  <table className="library-table" aria-labelledby="tableLabel">
    <thead>
      <tr>
        <th>Book</th>
        <th>Owner</th>
        <th>Availability</th>
      </tr>
    </thead>
    <tbody>
      {books.map((book, idx) => (
        <tr key={idx}>
          <td>{book.bookName}</td>
          <td>{book.owner}</td>
          <td>
            <div className="availability-cell">
              <span>{book.availability ? 'Available' : 'Not Available'}</span>
              <div className="icon-group">
                <button className="icon-btn" title="Return Book" onClick={() => onSetAvailable(idx)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 14l-4-4 4-4"/><path d="M5 10h7a4 4 0 1 1 0 8h-1"/></svg>
                </button>
                <button className="icon-btn" title="Borrow Book" onClick={() => onSetNotAvailable(idx)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4 4-4 4"/><path d="M19 14H12a4 4 0 1 1 0-8h1"/></svg>
                </button>
                <button className="delete-btn" title="Delete Book" onClick={() => onDelete(idx)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BookTable;
