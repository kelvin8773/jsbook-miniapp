function Book(slots) {
  this.isbn = slots.isbn;
  this.title = slots.title;
  this.year = slots.year;
}

Book.instances = {};

Book.add = function(slots) {
  let book = new Book(slots);
  //add book
  Book.instances[slots.isbn] = book;
  console.log("Book" + slots.isbn + " created!");
};

Book.loadAll = function() {
  let key = "",
    keys = [],
    booksString = "",
    books = {};

  try {
    if (localStorage["books"]) {
      booksString = localStorage["books"];
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }

  if (booksString) {
    books = JSON.parse(booksString);
    keys = Object.keys(books);
    console.log(keys.length + "books loaded.");
    for (let i = 0; i < keys.length; i++) {
      key = keys[i];
      Book.instances[key] = Book.convertRow2Obj(books[key]);
    }
  }
};

Book.convertRow2Obj = function(bookRow) {
  let book = new Book(bookRow);
  return book;
};

Book.update = function(slots) {
  let book = Book.instances(slots.isbn);
  let year = parseInt(slot.year);

  if (book.title !== slots.title) {
    book.title = slots.title;
  }
  if (book.year !== year) {
    book.year = year;
  }
  console.log("Book " + slots.isbn + " modifined!");
};

Book.destroy = function(isbn) {
  if (Book.instances[isbn]) {
    console.log("Book " + isbn + " deleted.");
    delete Book.instances[isbn];
  } else {
    console.log("This is no book with ISBN " + isbn + " in the database!");
  }
};

Book.saveAll = () => {
  let booksString = "",
    error = false,
    nmrOfBooks = Object.keys(Book.instances).length;

  try {
    booksString = JSON.stringify(Book.instances);
    localStorage["books"] = booksString;
  } catch (e) {
    alert("Error when writing to Lcoal Strage\n" + e);
    error = true;
  }
  if (error) console.log(nmrOfBooks + "books saved.");
};

Book.createTestData = () => {
  Book.instances["006251587X"] = new Book({
    isbn: "006251587X",
    title: "Weaving the Web",
    year: 2000
  });
  Book.instances["0465026567"] = new Book({
    isbn: "0465026567",
    title: "Gödel, Escher, Bach",
    year: 1999
  });
  Book.instances["0465030793"] = new Book({
    isbn: "0465030793",
    title: "I Am A Strange Loop",
    year: 2008
  });
  Book.saveAll();
};

Book.clearData = () => {
  if (confirm("Do you really want to delete all book data?")) {
    localStorage["books"] = "{}";
  }
};
