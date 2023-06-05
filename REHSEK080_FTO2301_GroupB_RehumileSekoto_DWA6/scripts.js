import {
  BOOKS_PER_PAGE,
  authors,
  genres,
  books,
  html,
  RGBValues,
} from "./data.js";
import {
  populateDropdownMenu,
  setThemeColors,
  createPreviewFragment,
  displayBooks,
  bookFiltering,
} from "./functions.js";

// Data

/**
 * The variable will be used to store matches of
 * current filter settings from the books object.
 * @type {Array}
 */
let matches = books;

/**
 * This variable will be used to as the current page of
 * books being display and will increment by 1.
 * @type {number}
 */
let page = 1;

let startIndex = (page - 1) * BOOKS_PER_PAGE;
let endIndex = BOOKS_PER_PAGE;

/**
 * range variable will be used to extract a certain number of books that
 * will be displayed on webpage using array slice method
 */
let range = [startIndex, endIndex];

// Error Checking
if (!books && !Array.isArray(books)) {
  throw new Error("Source required");
}

if (!range && range.length < 2) {
  throw new Error("Range must be an array with two numbers");
}

/**
 * This function is used to popultae the drop down lists of
 * genres and authors.
 * @type {function }
 */
populateDropdownMenu(genres, "Genres", html.search.genre);
populateDropdownMenu(authors, "Authors", html.search.author);

/**
 * This will check for a preference of dark in the css . 
 * If there is then the theme settings will updated using the {@link setThemeColors} function
 * */
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  html.settings.theme.value = "night";
  setThemeColors("night");
} else {
  html.settings.theme.value = "day";
  setThemeColors("day");
}

// EVENT HANDLERS

/**
 * This event handler will fire when the user changes value of dropdown in settings and clicks on the "Save" button.
 * It can toggle between a light mode and dark mode so that a user can use the app comfortably at night.
 * @param {Event} event
 */

const toggleLightAndDarkModeHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  document.documentElement.style.setProperty('--color-dark', RGBValues[theme].dark);
  document.documentElement.style.setProperty('--color-light', RGBValues[theme].light);
  html.settings.overlay.open = false;
};

/**
 * This function will fire when book previews are added to the web page.
 *  This will add event listeners so they will be able to be clicked on
 *  and view the open active Preview with the {@link showBookPreviewHandler}
 */
const addBookPreviewHandler = () => {
  const previewsArray = Array.from(document.querySelectorAll("[preview]"));

  for (const preview of previewsArray) {
    preview.addEventListener("click", showBookPreviewHandler);
  }
};
html.list.item.appendChild(createPreviewFragment(matches, range));
displayBooks(matches, page);

/**
 * This handler will fire when a user clicks on the "Show More" button.
 * The page number will increase by 1 and new book items will be appended to the webpage.
 * The new book items will now be able to be clicked on to view the book overlay
 * and the "show more" button showing the number of items left will be updated
 */
const showMoreBooksHandler = () => {
  page = page + 1;
  range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE];

  html.list.item.appendChild(createPreviewFragment(matches, range));
  addBookPreviewHandler();

  displayBooks(matches, page);
};

/**
 * This event handler will fire when a user clicks on the "search button".
 * The form overlay will appear allowing user to filter books by genre, author or title
 */
const openSearchOverlayHandler = () => {
  html.search.overlay.style.display = "block";
  html.search.title.focus();
};
/**
 * This event handler will fire when a user clicks on the "cancel" button in the search overlay
 */
const closeSearchOverlayHandler = () => {
  html.search.overlay.style.display = "none";
};

/**
 * This event handler will fire when a user clicks on the "settings" button.
 * The form overlay will appear allowing the user to toggle between the dark and light mode
 */
const openSettingsOverlayHandler = () => {
  html.settings.overlay.style.display = "block";
};

/**
 * This event handler will fire when a user clicks on the "cancel" button in the settings overlay
 */
const closeSettingsOverlayHandler = () => {
  html.settings.overlay.style.display = "none";
};

/**
 * This handler will fire when the book Preview overlay is closed. The overlay will be closed
 */
const closeBookPreviewHandler = () => {
  html.preview.active.style.display = "none";
};

/**
 * This handler will fire when a user clicks on submit button of the search overlay.
 * When the user manipulates the input fields of Title, genre or author so that it can
 * be filtered to the books they desire, the filtered books will then be shown on the webpage
 * @param {Event} event
 */

const filterSubmissionHandler = (event) => {
  html.search.overlay.style.display = "none";
  event.preventDefault();

  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const selectedGenre = filters.genre;
  const selectedAuthor = filters.author;
  const selectedTitle = filters.title;


  matches = bookFiltering(books, selectedTitle, selectedGenre, selectedAuthor)


  if (matches.length === 0) {
    html.list.message.style.display = "block";
  } else {
    html.list.message.style.display = "none";
  }

  page = 1;
  range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE];
  html.list.button.disabled = false;

  html.list.item.innerHTML = "";
  html.list.item.appendChild(createPreviewFragment(matches, range));
  addBookPreviewHandler();

  displayBooks(matches, page);
  html.search.form.reset();
};

/**
 * This handler will fire when a user clicks on any book displayed.
 *  In order to determine which book the user is currently clicking on the
 * entire event buble path is checked with event.path or event.composedPath().
 * The bubbling path is looped over until an element with a preview ID is found.
 *  Once found the book preview overlay will appear and the Image, title containing,
 * subtitle containing the author's name and the year the book was publised as well a short description of the book
 * @param {Event} event
 *
 */
const showBookPreviewHandler = (event) => {
  let pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    const previewId = node.dataset.preview;
    if (active) break;

    for (const singleBook of books) {
      if (singleBook.id === previewId) {
        active = singleBook;
      }
    }
  }

  if (!active) {
    return;
  }

  html.preview.active.style.display = "block";
  html.preview.blur.src = active.image;
  html.preview.image.src = active.image;
  html.preview.title.innerText = active.title;
  html.preview.subtitle.innerText = `${authors[active.author]} (${new Date(
    active.published
  ).getFullYear()})`;
  html.preview.description.innerText = active.description;
};

addBookPreviewHandler();

// EVENT LISTENERS

html.other.search.addEventListener("click", openSearchOverlayHandler);

html.search.cancel.addEventListener("click", closeSearchOverlayHandler);

html.other.settings.addEventListener("click", openSettingsOverlayHandler);

html.settings.cancel.addEventListener("click", closeSettingsOverlayHandler);

html.settings.form.addEventListener("submit", toggleLightAndDarkModeHandler);

html.list.button.addEventListener("click", showMoreBooksHandler);

html.preview.close.addEventListener("click", closeBookPreviewHandler);

html.list.item.addEventListener("click", showBookPreviewHandler);

html.search.form.addEventListener("submit", filterSubmissionHandler);


// import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
// // Helper function to create an element with attributes and innerHTML
// function createElementWithAttributes(tag, attributes, innerHTML) {
//   const element = document.createElement(tag);
//   for (const [key, value] of Object.entries(attributes)) {
//     element.setAttribute(key, value);
//   }
//   element.innerHTML = innerHTML;
//   return element;
// }
// // Helper function to create option elements
// function createOptionElement(value, text) {
//   const attributes = {
//     value: value,
//   };
//   return createElementWithAttributes('option', attributes, text);
// }
// // Helper function to create preview elements
// function createPreviewElement(book) {
//   const { author, id, image, title } = book;
//   const element = createElementWithAttributes('button', {
//     class: 'preview',
//     'data-preview': id,
//   });
//   element.innerHTML = `
//     <img class="preview__image" src="${image}" />
//     <div class="preview__info">
//       <h3 class="preview__title">${title}</h3>
//       <div class="preview__author">${authors[author]}</div>
//     </div>
//   `;
//   return element;
// }
// // Function to initialize the page
// function initializePage() {
//   let page = 1;
//   let matches = books;
//   const starting = document.createDocumentFragment();
//   for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
//     const element = createPreviewElement(book);
//     starting.appendChild(element);
//   }
//   document.querySelector('[data-list-items]').appendChild(starting);
//   const genreHtml = document.createDocumentFragment();
//   const firstGenreElement = createOptionElement('any', 'All Genres');
//   genreHtml.appendChild(firstGenreElement);
//   for (const [id, name] of Object.entries(genres)) {
//     const element = createOptionElement(id, name);
//     genreHtml.appendChild(element);
//   }
//   document.querySelector('[data-search-genres]').appendChild(genreHtml);
//   const authorsHtml = document.createDocumentFragment();
//   const firstAuthorElement = createOptionElement('any', 'All Authors');
//   authorsHtml.appendChild(firstAuthorElement);
//   for (const [id, name] of Object.entries(authors)) {
//     const element = createOptionElement(id, name);
//     authorsHtml.appendChild(element);
//   }
//   document.querySelector('[data-search-authors]').appendChild(authorsHtml);
//   const prefersDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   if (prefersDarkTheme) {
//     document.querySelector('[data-settings-theme]').value = 'night';