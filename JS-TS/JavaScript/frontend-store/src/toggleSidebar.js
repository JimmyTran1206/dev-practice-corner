import { getElement } from './utils.js';

const toogleNav = getElement('.toggle-nav');
const sidebarOverlay = getElement('.sidebar-overlay');
const closeBtn = getElement('.sidebar-close');

toogleNav.addEventListener('click', () => {
  sidebarOverlay.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  sidebarOverlay.classList.remove('show');
});
