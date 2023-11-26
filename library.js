const myLibrary = [];
const shelf = document.querySelector("#shelf");
const addNewWindow = document.querySelector("#addNewWindow");
const overlap = document.querySelector("#overlap");
const openAddWindow_button = document.querySelector("#open_add_window");
const closeAddWindow_button = document.querySelector("#closeAddWindow");
const addBookForm = document.getElementById("addNewBook");
let bookId = 0;

openAddWindow_button.addEventListener("click", openAddWindow);
closeAddWindow_button.addEventListener("click", closeAddWindow);
addBookForm.onsubmit = addBook;

function Book(title, author, pages, done) {
  this.id = bookId++;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.done = done;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}
function removeBookById(id) {
  let ind = -1;
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id == id) {
      ind = i;
      break;
    }
  }
  console.log(ind);
  myLibrary.splice(ind, 1);
}

function updateLibraryDisplay() {
  //clean current shelf
  while (shelf.firstChild) {
    shelf.removeChild(shelf.lastChild);
  }

  //add new book card
  for (let book of myLibrary) {
    console.log(book);
    let h1 = document.createElement("h1");
    h1.textContent = book.title;
    let p1 = document.createElement("p");
    p1.textContent = "Author: " + book.author;
    let p2 = document.createElement("p");
    p2.textContent = "Number of Pages: " + book.pages;

    //done button
    let done_button = document.createElement("button");
    done_button.classList.add("done");
    done_button.setAttribute("name", book.id);
    if (book.done) {
      done_button.classList.remove("btn-red");
      done_button.classList.add("btn-green");
      done_button.textContent = "Status: Read";
    } else {
      done_button.classList.remove("btn-green");
      done_button.classList.add("btn-red");
      done_button.textContent = "Status: Unread";
    }
    done_button.onclick = changeStatus;

    //remove_button
    let remove_button = document.createElement("button");
    remove_button.classList.add("remove");
    remove_button.setAttribute("name", book.id);
    remove_button.textContent = "Remove";
    remove_button.onclick = removeBook;

    let new_card = document.createElement("div");
    new_card.classList.add("bookCard");
    new_card.appendChild(h1);
    new_card.appendChild(p1);
    new_card.appendChild(p2);
    new_card.appendChild(done_button);
    new_card.appendChild(remove_button);

    shelf.appendChild(new_card);
  }
}

function openAddWindow(e) {
  addNewWindow.classList.add("active");
  overlap.classList.add("active");
}

function closeAddWindow(e) {
  addBookForm.reset();
  addNewWindow.classList.remove("active");
  overlap.classList.remove("active");
}

function getBookFromInput() {
  let done = document.getElementById("done").value;
  if (done == "on") done = false;
  else done = true;
  return new Book(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pageNumber").value,
    done
  );
}

function addBook(e) {
  e.preventDefault();
  let new_book = getBookFromInput();
  addBookToLibrary(new_book);
  updateLibraryDisplay();
  closeAddWindow();
}

function changeStatus(event) {
  let Bid = event.target.name;
  //console.log(Bid);
  for (let book of myLibrary) {
    if (book.id == Bid) book.done = !book.done;
  }
  updateLibraryDisplay();
}

function removeBook(event) {
  let Bid = event.target.name;
  //console.log(Bid);
  removeBookById(Bid);
  updateLibraryDisplay();
}

//test block
let book1 = new Book("Harry Potter", "J.K. Rowling", 1000, false);
addBookToLibrary(book1);
updateLibraryDisplay();
