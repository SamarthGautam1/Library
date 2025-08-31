
const library = [];
const libraryGrid = document.getElementById("libraryGrid");
const emptyState = document.getElementById("emptyState");
const newBookBtn = document.getElementById("newBookBtn");
const bookDialog = document.getElementById("bookDialog");
const bookForm = document.getElementById("bookForm");
const cancelForm = document.getElementById("cancelForm");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function updateLibrary() {
  libraryGrid.innerHTML = "";

  if (library.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  library.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "Read ✅" : "Not read ❌"}</p>
      <button data-action="toggle" data-index="${index}">Toggle Read</button>
      <button data-action="remove" data-index="${index}">Remove</button>
    `;

    libraryGrid.appendChild(card);
  });
}

function addBook(book) {
  library.push(book);
  updateLibrary();
}

libraryGrid.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (e.target.dataset.action === "toggle") {
    library[index].read = !library[index].read;
    updateLibrary();
  } else if (e.target.dataset.action === "remove") {
    library.splice(index, 1);
    updateLibrary();
  }
});

newBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

cancelForm.addEventListener("click", () => {
  bookDialog.close();
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(bookForm);
  const book = new Book(
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    formData.has("read")
  );
  addBook(book);
  bookForm.reset();
  bookDialog.close();
});

updateLibrary();