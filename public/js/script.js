let books = JSON.parse(localStorage.getItem('books')) || [];

const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
const bookCount = document.getElementById('bookCount');
const genreFilter = document.getElementById('genreFilter');
const statusFilter = document.getElementById('statusFilter');
const refreshButton = document.getElementById('refreshButton');
const clearAllButton = document.getElementById('clearAllButton');

function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

function renderBooks() {
    bookList.innerHTML = '';
    books.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${book.title}</strong> от ${book.author}, ${book.year}<br>
            Жанр: ${book.genre}, Статус: ${book.status}
            <button onclick="editBook(${index})">Редактировать</button>
            <button onclick="deleteBook(${index})">Удалить</button>
        `;
        bookList.appendChild(li);
    });
    bookCount.textContent = books.length;
}


function addBook(event) {
    event.preventDefault();
    const newBook = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        year: document.getElementById('year').value,
        genre: document.getElementById('genre').value,
        status: document.getElementById('status').value
    };
    books.push(newBook);
    saveBooks();
    renderBooks();
    bookForm.reset();
}

function editBook(index) {
    const book = books[index];
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('year').value = book.year;
    document.getElementById('genre').value = book.genre;
    document.getElementById('status').value = book.status;
    deleteBook(index)
}

function deleteBook(index) {
    books.splice(index, 1);
    saveBooks();
    renderBooks();
}

bookForm.addEventListener('submit', addBook);
genreFilter.addEventListener('change', renderBooks);
statusFilter.addEventListener('change', renderBooks);
refreshButton.addEventListener('click', () => location.reload());
clearAllButton.addEventListener('click', () => {
    books = [];
    saveBooks();
    renderBooks();
});

renderBooks();