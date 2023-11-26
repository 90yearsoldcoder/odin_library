const myLibrary = [];

function Book(title, author, pages, done) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.done = done;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function updateLibraryDisplay() {}
