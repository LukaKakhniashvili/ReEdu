class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  getInfo() {
    return `${this.title} by ${this.author} (${this.year})`;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    this.displayBooks();
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
    this.displayBooks();
  }

  listBooks() {
    return this.books.map((book) => book.getInfo()).join("<br>");
  }

  displayBooks() {
    document.getElementById("bookList").innerHTML = this.listBooks();
  }
}

const myLibrary = new Library();

window.onload = () => {
  document.getElementById("addBookButton").onclick = () => {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const year = document.getElementById("bookYear").value;
    const newBook = new Book(title, author, year);
    myLibrary.addBook(newBook);

    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookYear").value = "";
  };

  document.getElementById("removeBookButton").onclick = () => {
    const title = document.getElementById("bookTitle").value;
    myLibrary.removeBook(title);
  };
};
