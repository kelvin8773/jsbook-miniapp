pl.view.deleteBook = {
  setupUserInterface: function() {
    let deleteButton = document.forms["Book"].commit;
    let selectEl = document.forms["Book"].selectBook;
    let key = "",
      keys = [],
      book = null,
      optionEl = null;

    //loal all book objects
    Book.loadAll();
    keys = Object.keys(Book.instances);
    //pupulate the selelction list with books

    for (let i = 0; i < keys.length; i++) {
      key = keys[i];
      book = Book.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = book.title;
      optionEl.value = book.isbn;
      selectEl.add(optionEl, null);
    }

    deleteButton.addEventListener(
      "click",
      pl.view.deleteBook.handleDeleteButtonClickevent
    );
    window.addEventListener("beforeunload", function() {
      Book.saveAll();
    });
  },

  handleDeleteButtonClickevent: function() {
    let selectEl = document.forms["Book"].selectBook;
    let isbn = selectEl.value;
    if (isbn || "") {
      Book.destory(isbn);
      selectEl.remove(selectEl.selectedIndex);
    }
  }
};
