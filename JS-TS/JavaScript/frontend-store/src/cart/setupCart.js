// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';

// get cart DOM elements
const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

// define and call function to run and update cart every time the module is imported (into Home, Products, Product, and About pages) to persist the cart and cartDOM
function init() {
  // display the count of cart items
  displayCartItemCount();
  // display total price
  displayCartTotal();
  // add all cart items to the DOM
  displayCartItemsDOM();
  // set up cart functionality (increase-decrease-remove cartItems)
  setupCartFunctionality();
}
init();

function displayCartItemCount() {
  const amount = cart.reduce((count, cartItem) => {
    count += cartItem.amount;
    return count;
  }, 0);
  cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
  const totalPrice = cart.reduce((price, cartItem) => {
    price += cartItem.amount * cartItem.price;
    return price;
  }, 0);
  cartTotalDOM.textContent = `Total: ${formatPrice(totalPrice)}`;
}

function displayCartItemsDOM() {
  cart.forEach((cartItem) => addToCartDOM(cartItem));
}

function increaseAmount(idString) {
  let newAmount = 0;
  // update the cart data
  cart = cart.map((cartItem) => {
    if (cartItem.id === parseInt(idString)) {
      newAmount = ++cartItem.amount;
    }
    return cartItem;
  });
  return newAmount;
}

function decreaseAmount(idString) {
  let newAmount = 0;
  // update the cart data
  cart = cart.map((cartItem) => {
    if (cartItem.id === parseInt(idString)) {
      if (cartItem.amount === 1) {
        newAmount = 1;
      } else {
        newAmount = --cartItem.amount;
      }
    }
    return cartItem;
  });
  return newAmount;
}

function removeItem(idString) {
  cart = cart.filter((cartItem) => cartItem.id !== parseInt(idString));
}

function setupCartFunctionality() {
  // set functionality of the cart: remove, increase, and decrease items
  // remove: a button
  // increase/decrease: font awesome icon within a button
  cartItemsDOM.addEventListener('click', (e) => {
    const eventTarget = e.target;
    const parentElement = eventTarget.parentElement; // use for decrease/increase buttons
    const removeId = eventTarget?.dataset.id;
    const parentElementId = parentElement?.dataset.id; // use for decrease/increase buttons
    // remove
    if (eventTarget.classList.contains('cart-item-remove-btn')) {
      e.stopPropagation(); // stop bubbling up the click event to avoid cart closing premature (once the event target is removed, its parentElement become null, which trigger the closing cart action).
      removeItem(removeId); // remove item from the local storage data
      eventTarget.closest('article.cart-item').remove(); // remove the item from the DOM
    }
    // increase
    if (parentElement.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentElementId); // update data
      parentElement.nextElementSibling.textContent = newAmount;
    }
    // decrease
    if (parentElement.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentElementId); // update data
      parentElement.previousElementSibling.textContent = newAmount;
    }

    // save data to local storage and refresh DOM with every click
    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
}

function addToCart(idString) {
  // find if the product with given id is already in the cart
  let item = cart.find((cartItem) => cartItem.id === parseInt(idString));
  if (!item) {
    // item is not in the cart
    const product = findProduct(idString);
    const cartItem = { ...product, amount: 1 };
    cart = [...cart, cartItem]; // add new item with the amount of 1 to the cart
    addToCartDOM(cartItem); // update the DOM to reflect the new cart item
  } else {
    // item in the cart, update the amount
    const newAmount = increaseAmount(idString);
    // update the DOM to reflect the new amount
    const cartItemElements = [
      ...cartItemsDOM.querySelectorAll('.cart-item-amount'),
    ];
    const itemElement = cartItemElements.find(
      (element) => element.dataset.id === idString
    );
    itemElement.textContent = newAmount;
  }

  // increase the cart item count in cart icon one new item added
  displayCartItemCount();
  // update the cart total price as a new item is added
  displayCartTotal();
  // save cart in local storage to persist across pages
  setStorageItem('cart', cart);
  // open the cart sidebar as new product is added
  openCart();
}

export { addToCart };
