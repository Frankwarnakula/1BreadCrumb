import React from 'react';

interface Book {
  bookName: string;
  owner: string;
  availability: boolean;
}

interface AddBookFormProps {
  book: Book;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ book, onChange }) => (
  <div className="modal-form">
    <label>
      Book Name:
      <input name="bookName" value={book.bookName} onChange={onChange} />
    </label>
    <label>
      Owner:
      <input name="owner" value={book.owner} onChange={onChange} />
    </label>
    <label>
      Availability:
      <select name="availability" value={book.availability ? 'true' : 'false'} onChange={onChange}>
        <option value="true">Available</option>
        <option value="false">Not Available</option>
      </select>
    </label>
  </div>
);

export default AddBookForm;
