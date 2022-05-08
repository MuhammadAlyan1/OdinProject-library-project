let bookTitle = document.querySelector("#bookTitle");
let bookAuthor = document.querySelector("#bookAuthor");
let bookPages = document.querySelector("#bookPages");
let bookStatus = document.querySelector("#bookStatus");
let addBookBtn = document.querySelector("#addBookBtn");
let booksLibrary = document.querySelector(".books-library");
let domBooks;
booksLibrary.innerHTML = "";

let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));

// cannot use push on null
if (myLibrary === null) {
  myLibrary = [];
  // adding books to library
  AddBookToLibrary(
    Book("Jane Austen", "Pride and Prejudice", 432, "Has been read")
  );

  AddBookToLibrary(
    Book("Emily Brontë", "Wuthering Heights", 400, "Has been read")
  );

  AddBookToLibrary(
    Book("Harper Lee", "To kill a Mockingbird", 281, "Not read yet")
  );

  AddBookToLibrary(
    Book("J. R. R. Tolkien", "The Lord of the Rings", 1178, "Has been read")
  );

  AddBookToLibrary(
    Book("Charles Dickens", "A Tale of Two Cities", 304, "Not read yet")
  );

  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

// Book factory function
function Book(authorName, bookTitle, TotalPages, haveBeenRead) {
  return { authorName, bookTitle, TotalPages, haveBeenRead };
}

// showing books to dom
displayBooks();

// Add books to library
function AddBookToLibrary({ bookTitle, authorName, TotalPages, haveBeenRead }) {
  myLibrary.push(`<section class="book">
        <p class="title">Title: <span>${bookTitle}</span></p>
        <p class="author">Author: <span>${authorName}</span></p>
        <p class="pages">Pages: <span>${TotalPages}</span></p>
        <p class="status">Status: <span>${haveBeenRead}</span><button id="edit"></button></p>
        <button id="delete">X</button>
      </section>`);

  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

// Add new book
addBookBtn.addEventListener("click", () => {
  if (
    bookTitle.value == "" ||
    bookAuthor.value == "" ||
    bookPages.value == "" ||
    bookStatus == ""
  ) {
    return;
  }

  AddBookToLibrary(
    Book(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      document.querySelector("#bookStatus").value
    )
  );

  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";

  displayBooks();
});

// display Books in DOM
function displayBooks() {
  booksLibrary.innerHTML = "";

  myLibrary = myLibrary.filter((book) => book !== null);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));

  for (let book of myLibrary) {
    if (book == undefined) {
      continue;
    }
    booksLibrary.innerHTML += book;
  }

  // delete book
  domBooks = document.querySelectorAll(".book");
  domBooks.forEach((book) => {
    book.addEventListener("click", (e) => {
      if (e.target.id === "delete") {
        delete myLibrary[
          myLibrary.indexOf(e.target.parentElement.outerHTML.trim())
        ];
      }

      // edit status
      if (e.target.id === "edit") {
        myLibrary[
          myLibrary.indexOf(
            e.target.parentElement.parentElement.outerHTML.trim()
          )
        ] = `<section class="book">
          <p class="title">Title: <span>${
            e.target.parentElement.parentElement.querySelector(".title span")
              .innerText
          }</span></p>
          <p class="author">Author: <span>${
            e.target.parentElement.parentElement.querySelector(".author span")
              .innerText
          }</span></p>
          <p class="pages">Pages: <span>${
            e.target.parentElement.parentElement.querySelector(".pages span")
              .innerText
          }</span></p>
          <p class="status">Status: <span>${window
            .prompt("Enter Status", "Has been read")
            .toString()}</span><button id="edit"></button></p>
          <button id="delete">X</button>
        </section>`;
      }

      displayBooks();
    });
  });
}

function ObjectFactory(bookTitle, authorName, TotalPages, haveBeenRead) {
  return { bookTitle, authorName, TotalPages, haveBeenRead };
}

let book1 = ObjectFactory(
  "Harper Lee",
  "To kill a Mockingbird",
  281,
  "Not read yet"
);

let book2 = ObjectFactory(
  "J. R. R. Tolkien",
  "The Lord of the Rings",
  1178,
  "Has been read"
);
