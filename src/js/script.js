/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }
    initData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }
    render() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;

        const generatedHTML = thisBooksList.booksTemplate(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.dom.booksList.appendChild(generatedDOM);
      }
    }
    getElements() {
      const thisBooksList = this;
      thisBooksList.dom = {};

      thisBooksList.dom.booksList = document.querySelector('.books-list');
      thisBooksList.dom.filtersForm = document.querySelector('.filters');

      thisBooksList.booksTemplate = Handlebars.compile(
        document.querySelector('#template-book').innerHTML
      );
    }
    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%);';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      } else {
        return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%);';
      }
    }
    initActions() {
      const thisBooksList = this;

      console.log('start App');

      thisBooksList.dom.booksList.addEventListener(
        'dblclick',
        function (event) {
          event.preventDefault();

          const elementClicked = event.target.offsetParent;
          const bookId = elementClicked.getAttribute('data-id');

          if (!thisBooksList.favoriteBooks.includes(bookId)) {
            elementClicked.classList.add('favorite');
            thisBooksList.favoriteBooks.push(bookId);
            console.log('FAVORITE BOOKS', thisBooksList.favoriteBooks);
          } else {
            elementClicked.classList.remove('favorite');
            const indexOfBook = thisBooksList.favoriteBooks.indexOf(bookId);
            thisBooksList.favoriteBooks.splice(indexOfBook, 1);
            console.log('FAVORITE BOOKS - usuw', thisBooksList.favoriteBooks);
          }
        }
      );

      thisBooksList.dom.filtersForm.addEventListener('click', function (event) {
        if (
          event.target.tagName == 'INPUT' &&
          event.target.type == 'checkbox' &&
          event.target.name == 'filter'
        ) {
          console.log('event target value', event.target.value);
          if (event.target.checked) {
            thisBooksList.filters.push(event.target.value);
          } else {
            thisBooksList.filters.splice(
              thisBooksList.filters.indexOf(event.target.value),
              1
            );
          }
          console.log('Zawartość tablicy filters:', thisBooksList.filters);
          thisBooksList.filterBooks();
        }
      });
    }
    filterBooks() {
      const thisBooksList = this;

      for (let book of dataSource.books) {
        let shouldBeHidden = false;

        for (const filter of thisBooksList.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const filteredBook = document.querySelector(
          '.book__image[data-id="' + book.id + '"]'
        );

        if (shouldBeHidden) {
          filteredBook.classList.add('hidden');
        } else {
          filteredBook.classList.remove('hidden');
        }
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  const app = new BooksList();

  //   const booksList = document.querySelector('.books-list');
  //   const booksTemplate = Handlebars.compile(
  //     document.querySelector('#template-book').innerHTML
  //   );

  //   const favoriteBooks = [];
  //   const filters = [];
  //   const filtersForm = document.querySelector('.filters');

  //   function render() {
  //     for (let book of dataSource.books) {
  //       book.ratingBgc = determineRatingBgc(book.rating);
  //       book.ratingWidth = book.rating * 10;

  //       const generatedHTML = booksTemplate(book);
  //       const generatedDOM = utils.createDOMFromHTML(generatedHTML);
  //       booksList.appendChild(generatedDOM);
  //     }
  //   }

  //   render();

  //   function initActions() {
  //     console.log('start App');

  //     booksList.addEventListener('dblclick', function (event) {
  //       event.preventDefault();

  //       const elementClicked = event.target.offsetParent;
  //       const bookId = elementClicked.getAttribute('data-id');

  //       if (!favoriteBooks.includes(bookId)) {
  //         elementClicked.classList.add('favorite');
  //         favoriteBooks.push(bookId);
  //         console.log('FAVORITE BOOKS', favoriteBooks);
  //       } else {
  //         elementClicked.classList.remove('favorite');
  //         const indexOfBook = favoriteBooks.indexOf(bookId);
  //         favoriteBooks.splice(indexOfBook, 1);
  //         console.log('FAVORITE BOOKS - usuw', favoriteBooks);
  //       }
  //     });

  //     filtersForm.addEventListener('click', function (event) {
  //       if (
  //         event.target.tagName == 'INPUT' &&
  //         event.target.type == 'checkbox' &&
  //         event.target.name == 'filter'
  //       ) {
  //         console.log('event target value', event.target.value);
  //         if (event.target.checked) {
  //           filters.push(event.target.value);
  //         } else {
  //           filters.splice(filters.indexOf(event.target.value), 1);
  //         }
  //         console.log('Zawartość tablicy filters:', filters);
  //         filterBooks();
  //       }
  //     });
  //   }

  //   initActions();

  //   function filterBooks() {
  //     for (let book of dataSource.books) {
  //       let shouldBeHidden = false;

  //       for (const filter of filters) {
  //         if (!book.details[filter]) {
  //           shouldBeHidden = true;
  //           break;
  //         }
  //       }
  //       const filteredBooks = document.querySelector(
  //         '.book__image[data-id="' + book.id + '"]'
  //       );

  //       if (shouldBeHidden) {
  //         filteredBooks.classList.add('hidden');
  //       } else {
  //         filteredBooks.classList.remove('hidden');
  //       }
  //     }
  //   }

  //   function determineRatingBgc(rating) {
  //     if (rating < 6) {
  //       return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);';
  //     } else if (rating > 6 && rating <= 8) {
  //       return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%);';
  //     } else if (rating > 8 && rating <= 9) {
  //       return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
  //     } else {
  //       return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%);';
  //     }
  //   }
}
