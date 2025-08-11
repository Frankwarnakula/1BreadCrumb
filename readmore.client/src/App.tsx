import { useEffect, useState, useRef } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import BookTable from './components/BookTable';
import Modal from './components/Modal';
import AddBookForm from './components/AddBookForm';

interface Book {
    bookName: string;
    owner: string;
    availability: boolean;
}

const PAGE_SIZE = 10;

function App() {
    const [books, setBooks] = useState<Book[]>();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [newBook, setNewBook] = useState<Book>({ bookName: '', owner: '', availability: true });
    const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [loadError, setLoadError] = useState(false);
    const retryTimeout = useRef<NodeJS.Timeout | null>(null);
    const MAX_RETRIES = 10;
    const RETRY_DELAY = 2000; // ms
    const retryCount = useRef(0);

    useEffect(() => {
        populateBookData();
        return () => {
            if (retryTimeout.current) clearTimeout(retryTimeout.current);
        };
    }, []);

    async function populateBookData() {
        try {
            const response = await fetch('books');
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
                setLoadError(false);
                retryCount.current = 0;
            } else {
                throw new Error('Failed to load');
            }
        } catch {
            if (retryCount.current < MAX_RETRIES) {
                retryCount.current++;
                retryTimeout.current = setTimeout(populateBookData, RETRY_DELAY);
            } else {
                setLoadError(true);
            }
        }
    }

    const filteredBooks = books?.filter(book =>
        book.bookName.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const totalPages = Math.ceil(filteredBooks.length / PAGE_SIZE);
    const pagedBooks = filteredBooks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handlePrev = () => setPage(p => Math.max(1, p - 1));
    const handleNext = () => setPage(p => Math.min(totalPages, p + 1));

    // Reset to first page if search changes
    useEffect(() => {
        setPage(1);
    }, [search]);

    const handleAddBookClick = () => {
        setNewBook({ bookName: '', owner: '', availability: true });
        setShowModal(true);
    };

    const handleModalCancel = () => {
        setShowModal(false);
    };

    const handleModalSave = () => {
        // Save logic will be implemented later
        setShowModal(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setNewBook(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Delete logic
    const handleDeleteClick = (globalIdx: number) => {
        setDeleteIdx(globalIdx);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = () => {
        if (books && deleteIdx !== null) {
            const filteredIdx = (page - 1) * PAGE_SIZE + deleteIdx;
            const bookToDelete = filteredBooks[filteredIdx];
            const newBooks = books.filter(b => b !== bookToDelete);
            setBooks(newBooks);
            setShowDeleteConfirm(false);
            setDeleteIdx(null);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
        setDeleteIdx(null);
    };

    const handleSetAvailable = (globalIdx: number) => {
        if (!books) return;
        const filteredIdx = (page - 1) * PAGE_SIZE + globalIdx;
        const bookToUpdate = filteredBooks[filteredIdx];
        const newBooks = books.map(b =>
            b === bookToUpdate ? { ...b, availability: true } : b
        );
        setBooks(newBooks);
    };

    const handleSetNotAvailable = (globalIdx: number) => {
        if (!books) return;
        const filteredIdx = (page - 1) * PAGE_SIZE + globalIdx;
        const bookToUpdate = filteredBooks[filteredIdx];
        const newBooks = books.map(b =>
            b === bookToUpdate ? { ...b, availability: false } : b
        );
        setBooks(newBooks);
    };

    const contents = books === undefined
        ? loadError
            ? <p style={{color: 'red'}}><em>Could not load data from backend. Please ensure the ASP.NET backend is running.</em></p>
            : <p><em>Loading... (Retrying connection to backend...)</em></p>
        : <div style={{ position: 'relative' }}>
            <div className="controls-bar">
                <SearchBar search={search} onSearchChange={setSearch} />
                <Pagination page={page} totalPages={totalPages} onPrev={handlePrev} onNext={handleNext} />
            </div>
            <BookTable
                books={pagedBooks}
                onSetAvailable={handleSetAvailable}
                onSetNotAvailable={handleSetNotAvailable}
                onDelete={handleDeleteClick}
            />
            <button className="add-book-btn" onClick={handleAddBookClick}>Add Book</button>
            <Modal show={showModal} title="Add Book" onCancel={handleModalCancel} onSave={handleModalSave}>
                <AddBookForm book={newBook} onChange={handleInputChange} />
            </Modal>
            <Modal show={showDeleteConfirm} title="Confirm Delete" onCancel={handleDeleteCancel} onSave={handleDeleteConfirm} saveLabel="Yes" cancelLabel="No">
                <p>Are you sure you want to delete this book?</p>
            </Modal>
        </div>;

    return (
        <div>
            <h1 id="tableLabel">Library</h1>
            {contents}
        </div>
    );
}

export default App;