import { BOOKS_PER_PAGE, authors, html} from "./data.js";


/**
 * A function that takes a book as an object literal and
 * converts it into an HTML element that can be appended to the DOM.
 *  Creating book elements individually prevents the JS having to re-render
 * the entire DOM every time a new book is created.
 * @param {object} props - Book object literal with book properties
 * @returns {HTMLElement} - HTML element with book details
 */
export const createPreview = (props) => {
  const { author, id, image, title } = props;

  let BookElement = document.createElement("button");
  BookElement.classList = "preview";
  BookElement.setAttribute("data-preview", id);

  BookElement.innerHTML = /* html */ `
           <img
               class="preview__image"
               src="${image}"
           />
           
           <div class="preview__info">
               <h3 class="preview__title">${title}</h3>
               <div class="preview__author">${authors[author]}</div>
           </div>
       `;
  return BookElement;
};



/**
 * This function will take the books object and the book range as parameters. 
 * It will create a document Fragment whereby all the book previews made from the 
 * createPreview function will be looped through and added to the document fragment
 * @param {Array} booksArray
 * @param {number} bookRange
 * @returns {DocumentFragment}
 */
export const createPreviewFragment = (booksArray, bookRange) => {
  const previewFragment = document.createDocumentFragment();
  let extractedBooks = booksArray.slice(bookRange[0], bookRange[1]);

  for (let item of extractedBooks) {
    const { author, id, image, title } = item;

    const preview = createPreview({ author, id, image, title });
    previewFragment.appendChild(preview);
  }

  return previewFragment;
};

/**
 * The function will update theme settings according the mode (light or dark) that is chosen.
 * @param {theme} string 
 */

export const setThemeColors = (theme) => {
  const colorDark = theme === "night" ? "255, 255, 255" : "10, 10, 20";
  const colorLight = theme === "night" ? "10, 10, 20" : "255, 255, 255";

  document.documentElement.style.setProperty("--color-dark", colorDark);
  document.documentElement.style.setProperty("--color-light", colorLight);
};

/**
 * A factory function which returns another function. This returned function performs
 * the action which is to populate a drop down menu based on the provided object
 * @param {Object} objectSource - object from where the values will be created
 * @param {String} formLabel - The title of the form select
 * @param {Node} formSource - Dom node which is where the values will be appended to
 */

export const createDropdownMenuPopulator = () => {
  return (objectSource, formLabel, formSource) => {
  let menuFragment = document.createDocumentFragment();

  let optionElement = document.createElement("option");
  optionElement.value = "any";
  optionElement.textContent = `All ${formLabel}`;
  menuFragment.appendChild(optionElement);

  for (let item of Object.entries(objectSource)) {
    let formElement = document.createElement("option");

    let [key, value] = item;
    formElement.value = key;
    formElement.textContent = value;

    menuFragment.appendChild(formElement);
  }

  formSource.appendChild(menuFragment);
}
};

/**
 * This function will update the "Show more" button and the remaining books left to display on the web page
 * @param {Array} booksArray - current books that will be displayed which is stored in the 'matches' variable
 * @param {Number} bookPage - current page number
 */
export const displayBooks = (booksArray, bookPage) => {
  let itemsLeft = booksArray.length - bookPage * BOOKS_PER_PAGE;

  let hasRemaining = itemsLeft > 0;

  html.list.button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${
      hasRemaining === true ? itemsLeft : 0
    })</span>
    `;
  // window.scrollTo({ top: 0, behavior: "smooth" });

  if (hasRemaining === false) {
    html.list.button.disabled = true;
  }
};
/**
 * The responsiblity of this function is to filter books. It takes the books Array
 * as a parameter as well as the author, title and genre selected by the user.
 * Although this function is used to filter the book, it can be used to filter other
 * Array Objects in the future
 * @param {Array} booksArray 
 * @param {String} Title 
 * @param {Object} Genre 
 * @param {Object} Author 
 * @returns {Array}
 */
export const bookFiltering = (booksArray, Title, Genre, Author) => {
  let results = [];
  if (
    Title === "" &&
    Genre === "any" &&
    Author === "any"
  ) {
    results = booksArray;
  } else {
    for (const book of booksArray) {
      const macthesTitle =
        Title.trim() === "" ||
        book.title.toLowerCase().includes(Title.toLowerCase());

      const matchesAuthor =
        Author === "any" || book.author === Author;

      let matchesGenre = false;

      for (const genre of book.genres) {
        if (Genre === "any") {
          matchesGenre = true;
        } else if (genre === Genre) {
          matchesGenre = true;
        }
      }

      if (macthesTitle && matchesAuthor && matchesGenre) {
        results.push(book);
      }
    }
  }
return results
}

