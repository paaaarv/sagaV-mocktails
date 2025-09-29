//fetch navigation bar, newsletter and footer sections for all pages: 
fetch('navigation.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navigation').innerHTML = data;
});

fetch('newsletter.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('newsletter').innerHTML = data;
});

fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
});



// Mobile menu toggle
// create a cart
let cart = [];
if (localStorage.getItem("saga-v-cart")) {
  cart = JSON.parse(localStorage.getItem("saga-v-cart"));
}

// Mobile me[nu toggle
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
  { name: 'The Sun', price: 10, quantity: 1 },
  { name: 'The Fool', price: 10, quantity: 1},
];

function renderOrderSummary() {
  const itemList = document.getElementById('cart-items');
  const orderTotalSpan = document.getElementById('order-total');
  let total = 0;

  // Clear existing items
  itemList.innerHTML = '';

  // Add each item to the list
  orderItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} Bottle Size - $${(item.price * item.quantity).toFixed(2)}`;
    itemList.appendChild(listItem);
    total += item.price * item.quantity;
  });

  // Update the total
  orderTotalSpan.textContent = `$${total.toFixed(2)}`;
}

// Call the function to render the summary when the page loads
document.addEventListener('DOMContentLoaded', renderOrderSummary);

// Example of adding a new item (could be triggered by user action)
function addItemToOrder(name, price, quantity) {
  orderItems.push({ name, price, quantity });
  renderOrderSummary();}

  function show(shown, hidden){
    document.getElementById(shown).style.display='block';
    document.getElementById(hidden).style.display='none';
    return false;
  }

// Mocktail product details

const mocktailsArray = [
  {
    id: 1,
    name: "The Sun",
    desc: "Golden peach, honey, and vanilla blossom with sparkling water",
    flavor: ["Bright", "Uplifting", "Approachable"],
    price: 52.99,
    img: "assets/the-sun.jpg",
  },
  {
    id: 2,
    name: "The Siren",
    desc: "Sea salt, grapefruit, and rosemary",
    flavor: ["Savory", "Intriguing", "Adventurous"],
    price: 52.99,
    img: "assets/the-siren.jpg",
  },
  {
    id: 3, 
    name: "The Fool",
    desc: "Yuzu, Lime, and Green Apple",
    flavor: ["Tangy", "Playful", "Energizing"],
    price: 52.99,
    img: "assets/the-fool.jpg",
  },
  {
    id: 4,
    name: "The Magician",
    desc: "Blood orange, gentian root, and herbal botanicals",
    flavor: ["Complex", "Sophisticated", "Contemplative"],
    price: 52.99,
    img: "assets/the-magician.jpg",
  },
  {
    id: 5,
    name: "The Oracle",
    desc: "Tomato, black tea, and shiitake with subtle spice",
    flavor: ["Earthy", "Grounding", "Savory"],
    price: 52.99,
    img: "assets/the-oracle.jpg",
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
  <article class="modal-card" id="modal-${productNum}">
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
