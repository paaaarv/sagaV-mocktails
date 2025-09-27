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

$(".view-product").on("click",function(e){
  const cardId = parseInt(e.target.dataset.mocktail); 
  const card = mocktailsArray.filter((x) => x.id === cardId)[0]; 
  updateProductDetailCard(card); 
  $("#product-detail").dialog("open");

});

$("#close-modal").on("click", function(){
    $("#shop-overlay").fadeOut(1000);
  $("#product-detail").dialog("close"); 
});

$("#product-detail").dialog({
      autoOpen: false, 
      width: '75vw',
      modal: true,
      show: {
        effect: "fade",
        duration: 1000
      },
      open: function(){
        $("#shop-overlay").fadeIn(1000);
      },
      hide: {
        effect: "fade",
        duration: 1000
      },
    });


const updateProductDetailCard = (product) => {
  console.log("HERE IS PRODUCT", product);
  $("#product-name").text(product.name); 
  $(".modal-card").attr("id", `modal-${product.id}`); 
  let flavorsDiv = $("#flavors"); 
  for (let i=0;i < product.flavor.length; i++){
    flavorsDiv.append(
      `<div class="flavor-tag"> 
        ${product.flavor[i]}
      </div>`
    )
  }
  $("#description").text(product.desc); 
}

