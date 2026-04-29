// Lastcell — Cart, menu, newsletter

const cart = [];
const cartBtn = document.getElementById('cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsEl = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalEl = document.getElementById('cart-total');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const newsletterForm = document.getElementById('newsletter-form');

// Cart: open/close
function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Cart: add item & render
function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
  openCart();
}

function updateCartUI() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartCountEl.textContent = cart.length;
  cartCountEl.classList.toggle('empty', cart.length === 0);

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<li class="cart-empty">Your cart is empty.</li>';
  } else {
    cartItemsEl.innerHTML = cart
      .map(
        (item) =>
          `<li class="cart-item">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">$${item.price}</span>
          </li>`
      )
      .join('');
  }
  cartTotalEl.textContent = total;
}

document.querySelectorAll('.quick-add').forEach((btn) => {
  btn.addEventListener('click', function () {
    const name = this.getAttribute('data-name');
    const price = Number(this.getAttribute('data-price'));
    addToCart(name, price);
  });
});

// Mobile menu toggle
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Header scroll effect
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Newsletter form
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert('Thanks for subscribing, ' + (email || 'you') + '. We\'ll be in touch.');
    this.reset();
  });
}

// Initial cart state
updateCartUI();
