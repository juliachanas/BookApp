/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  //do bookList przypisuje element o klasie .books-list
  const booksList = document.querySelector('.books-list');

  //kompiluj szanblon elementu o id='template-book'do linka - dodaj linka do elementu
  const booksTemplate = Handlebars.compile(
    document.querySelector('#template-book').innerHTML
  );

  const favoriteBooks = [];

  function render() {
    //przejscie po wszystkich ksiazkach z dataSource.books
    for (let book of dataSource.books) {
      //dla kazdej ksiązki z listy tworzy linka
      /* generate HTML based on template */

      const generatedHTML = booksTemplate(book);

      /* create element using utlis.createElementFromHTML */
      //przekształca do elementu DOM

      const generatedDOM = utils.createDOMFromHTML(generatedHTML);

      /* add element to bookList */
      //dolaczenie jako "dzieci" do booksList
      booksList.appendChild(generatedDOM);
    }
  }
  render();

  function initActions() {
    console.log('start App');

    const bookImages = booksList.querySelectorAll('.book__image');
    console.log(bookImages);

    for (let image of bookImages) {
      image.addEventListener('dblclick', function (event) {
        event.preventDefault();

        const imageId = image.getAttribute('data-id');
        if (!favoriteBooks.includes(imageId)) {
          image.classList.add('favorite');
          favoriteBooks.push(imageId);
          console.log('FAVORITE BOOKS', favoriteBooks);
        } else {
          image.classList.remove('favorite');
          const indexToRemove = favoriteBooks.indexOf(imageId);
          if (indexToRemove !== -1) {
            // czy indexToRemove nie jest równe -1, co oznacza, że element został znaleziony w tablicy favoriteBooks
            favoriteBooks.splice(indexToRemove, 1); //splice usuwa elementy z tablicy - pierwszy argument to start, drugi liczba elemtów do usunięcia
            console.log('usuwam');
            console.log('FAVORITE BOOKS - usuw', favoriteBooks);
          }
        }
      });
    }
  }
  initActions();
}
