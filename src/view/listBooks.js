pl.view.listBooks = {
  setupUserInterface: function() {
    let tableBodEl = document.querySelector("table#books>tbody");

    let keys = [],
      key = "",
      row = {};
    //load all book objects

    Book.loadAll();
    keys = Object.keys(Book.instances);
    //for each book, create a table row with cells for the 3 attributes

    for (let i = 0; i < keys.length; i++) {
      key = keys[i];
      row = tableBodEl.insertRow();
      row.insertCell(-1).textContent = Book.instances[key].isbn;
      row.insertCell(-1).textContent = Book.instances[key].title;
      row.insertCell(-1).textContent = Book.instances[key].year;
    }
  }
};
