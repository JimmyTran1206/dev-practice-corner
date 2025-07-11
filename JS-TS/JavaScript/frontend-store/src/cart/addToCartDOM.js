import { formatPrice, getElement } from '../utils.js';

const cartItemsDOM = getElement('.cart-items');

function addToCartDOM(cartItem) {
  const { id, name, price, image, amount } = cartItem;
  const article = document.createElement('article');
  article.classList.add('cart-item');
  article.setAttribute('data-id', id);
  article.innerHTML = `
            <img src="${image}" class="cart-item-img" alt="${name}" />
            <div>
              <h4 class="cart-item-name">${name}</h4>
              <p class="cart-item-price">${formatPrice(price)}</p>
              <button class="cart-item-remove-btn" data-id="${id}">&#10006; remove</button>
            </div>
            <div>
              <button class="cart-item-increase-btn" data-id="${id}">
                <i class="fas fa-chevron-up"></i>
              </button>
              <p class="cart-item-amount" data-id="${id}">${amount}</p>
              <button class="cart-item-decrease-btn" data-id="${id}">
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
`;
  cartItemsDOM.appendChild(article);
}

export default addToCartDOM;
