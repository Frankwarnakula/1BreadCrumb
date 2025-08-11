import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPrev, onNext }) => (
  <div className="pagination-controls-inline">
    <button onClick={onPrev} disabled={page === 1} aria-label="Previous Page">&#8592;</button>
    <span style={{ margin: '0 1rem' }}>{page} of {totalPages}</span>
    <button onClick={onNext} disabled={page === totalPages} aria-label="Next Page">&#8594;</button>
  </div>
);

export default Pagination;
