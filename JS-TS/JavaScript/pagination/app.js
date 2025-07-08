import fetchFollowers from './fetchFollowers.js';
import displayFollowers from './displayFollowers.js';
import paginate from './paginate.js';
import displayButtons from './displayButtons.js';

const title = document.querySelector('.section-title h1');
const btnContainer = document.querySelector('.btn-container');
let index = 0;
let pages = []; // array of array
const setupUI = () => {
  displayFollowers(pages[index]);
  displayButtons(btnContainer, pages, index); // pass in the index to check the active button UI
};

// Every time the button is clicked, regenerate the UI
function paginationBtnHandler(e) {
  const eventTarget = e.target;
  if (eventTarget.classList.contains('btn-container')) return;
  if (eventTarget.classList.contains('page-btn')) {
    index = parseInt(eventTarget.dataset.index);
  }
  if (eventTarget.classList.contains('next-btn')) {
    index++;
    if (index > pages.length - 1) {
      index = 0;
    }
  }
  if (eventTarget.classList.contains('prev-btn')) {
    index--;
    if (index < 0) {
      index = pages.length - 1;
    }
  }
  setupUI();
}
btnContainer.addEventListener('click', paginationBtnHandler);

async function init() {
  const followers = await fetchFollowers();
  title.textContent = 'pagination';
  pages = paginate(followers);
  setupUI();
}

window.addEventListener('DOMContentLoaded', init);
