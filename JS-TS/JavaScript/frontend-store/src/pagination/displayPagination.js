import display from '../displayProducts.js';
import displayButtons from './displayButtons.js';
import paginate from './paginate.js';
import { getElement } from '../utils.js';
// function to display pagination given an input product array
const btnContainer = document.querySelector('.btn-container');
let index = 0;
let storePages = []; // array of product arrays

function setupUI() {
  display(storePages[index], getElement('.products-container'));
  displayButtons(btnContainer, storePages, index); // pass in the index to check active button UI
}
// Every time the button is clicked, regenerate the UI
function paginationBtnHandler(e) {
  const eventTarget = e.target;
  if (eventTarget.classList.contains('btn-container')) return;
  if (eventTarget.classList.contains('page-btn')) {
    index = parseInt(eventTarget.dataset.index);
  }
  if (eventTarget.classList.contains('next-btn')) {
    index++;
    if (index > storePages.length - 1) {
      index = 0;
    }
  }
  if (eventTarget.classList.contains('prev-btn')) {
    index--;
    if (index < 0) {
      index = storePages.length - 1;
    }
  }
  setupUI();
}
btnContainer.addEventListener('click', paginationBtnHandler);

function displayPagination(store) {
  storePages = paginate(store);
  setupUI();
}

export { displayPagination };
