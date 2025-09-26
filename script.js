// Mobile menu toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("primary-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}
// Respect reduced motion (no animations here yet, but this is where we gate them)
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
// if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { /* no-op */}

//Order Summary
// Sample order data
const orderItems = [
  { name: "Product A", price: 12.99, quantity: 1 },
  { name: "Product B", price: 5.5, quantity: 2 },
  { name: "Product C", price: 20.0, quantity: 1 },
];

function renderOrderSummary() {
  const itemList = document.getElementById("cart-items");
  const orderTotalSpan = document.getElementById("order-total");
  let total = 0;

  // Clear existing items
  itemList.innerHTML = "";

  // Add each item to the list
  orderItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} (x${item.quantity}) - $${(
      item.price * item.quantity
    ).toFixed(2)}`;
    itemList.appendChild(listItem);
    total += item.price * item.quantity;
  });

  // Update the total
  orderTotalSpan.textContent = `$${total.toFixed(2)}`;
}

// Call the function to render the summary when the page loads
document.addEventListener("DOMContentLoaded", renderOrderSummary);

// Example of adding a new item (could be triggered by user action)
function addItemToOrder(name, price, quantity) {
  orderItems.push({ name, price, quantity });
  renderOrderSummary();
}

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Mocktail product details

const mocktailsArray = [
  {
    name: "The Sun",
    desc: "Golden peach, honey, and vanilla blossom with sparkling water",
    price: 12.99,
    img: "https://placehold.co/450x450?text=The+Sun",
  },
  {
    name: "The Siren",
    desc: "Sea salt, grapefruit, and rosemary",
    price: 12.99,
    img: "https://placehold.co/450x450?text=The+Siren",
  },
  {
    name: "The Fool",
    desc: "Yuzu, Lime, and Green Apple",
    price: 12.99,
    img: "https://placehold.co/450x450?text=The+Fool",
  },
  {
    name: "The Magician",
    desc: "Blood orange, gentian root, and herbal botanicals",
    price: 12.99,
    img: "https://placehold.co/450x450?text=The+Magician",
  },
  {
    name: "The Oracle",
    desc: "Tomato, black tea, and shiitake with subtle spice",
    price: 12.99,
    img: "https://placehold.co/450x450?text=The+Oracle",
  }
];

// Modal View functionality

const mocktail1Btn = document.getElementById("view-mocktail1");
const mocktail2Btn = document.getElementById("view-mocktail2");
const mocktail3Btn = document.getElementById("view-mocktail3");
const mocktail4Btn = document.getElementById("view-mocktail4");
const mocktail5Btn = document.getElementById("view-mocktail5");

const btns = [
  mocktail1Btn,
  mocktail2Btn,
  mocktail3Btn,
  mocktail4Btn,
  mocktail4Btn,
  mocktail5Btn,
];

const modal = document.createElement("div");

const createModal = (productNum) => {
  modal.innerHTML = 
  `<i class="fa-solid fa-x modal-x" id="close-modal"></i>
  <article class="modal-card">
      <div class="modal-card-top">
          <img class="modal-card-img" src=${mocktailsArray[productNum].img} alt="Mocktail ${productNum}" />
        <div class="modal-product-detail">
          <h3>${mocktailsArray[productNum].name}</h3>
          <p class="modal-price">${mocktailsArray[productNum].price}</p>
          <p>${mocktailsArray[productNum].desc}</p>
        </div>
      </div>
      <div class="modal-card-bottom">
        <input class="product-qty" type="number"/> 
        <a href="/checkout.html" class="modal-card-btn">ADD TO CART</a>
        </div>
      </div>
      
    </article>`;
}

const closeModal = () => {
  overlay.classList.add("overlay-hide");
  overlay.classList.remove("overlay-show");
};

const viewProductDetails = (e) => {
  e.preventDefault();
  const productNumber = e.target.dataset.mocktail
  createModal(productNumber)
  overlay.classList.remove("overlay-hide");
  overlay.classList.add("overlay-show");
  document.getElementById("overlay").appendChild(modal);
  document.getElementById("close-modal").addEventListener("click", closeModal);
};

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", viewProductDetails);
}


const dots = document.querySelectorAll('.dot');
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    document.querySelector('.dot.active').classList.remove('active');
    dot.classList.add('active');
    // Trigger carousel slide change here
  });
});