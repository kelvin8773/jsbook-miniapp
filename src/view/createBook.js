pl.view.createBook = {
  setupUserInterface: function() {
    let saveButton = document.forms["Book"].commit;
    //load all book objects
    Book.loadAll();
    // Set an event handler for the save/submit button
    saveButton.addEventListener(
      "click",
      pl.view.createBook.handleSaveButtonClickEvent
    );
    window.addEventListener("beforeunload", function() {
      Book.saveAll();
    });
  },

  //save user input date

  handleSaveButtonClickEvent: function() {
    let formEl = document.forms["Book"];
    let slots = {
      isbn: formEl.isbn.value,
      title: formEl.title.value,
      year: formEl.year.value
    };
    Book.add(slots);
    formEl.reset();
  }
};
