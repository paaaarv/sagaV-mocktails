// Mocktail products array 

const mocktailsArray = [
  {
    id: 1,
    name: "The Sun",
    desc: "Golden peach, honey, and vanilla blossom with sparkling water",
    flavor: ["Bright", "Uplifting", "Approachable"],
    price: 52.99,
    img: "assets/sun-bottle.jpg",
  },
  {
    id: 2,
    name: "The Siren",
    desc: "Sea salt, grapefruit, and rosemary",
    flavor: ["Savory", "Intriguing", "Adventurous"],
    price: 52.99,
    img: "assets/siren-bottle.jpg",
  },
  {
    id: 3, 
    name: "The Fool",
    desc: "Yuzu, Lime, and Green Apple",
    flavor: ["Tangy", "Playful", "Energizing"],
    price: 52.99,
    img: "assets/fool-bottle.jpg",
  },
  {
    id: 4,
    name: "The Magician",
    desc: "Blood orange, gentian root, and herbal botanicals",
    flavor: ["Complex", "Sophisticated", "Contemplative"],
    price: 52.99,
    img: "assets/magician-bottle.jpg",
  },
  {
    id: 5,
    name: "The Oracle",
    desc: "Tomato, black tea, and shiitake with subtle spice",
    flavor: ["Earthy", "Grounding", "Savory"],
    price: 52.99,
    img: "assets/oracle-bottle.jpg",
  }
];


//fetch navigation bar, newsletter and footer sections for all pages: 
// fetch('navigation.html')
//     .then(response => response.text())
//     .then(data => {
//       document.getElementById('navigation').innerHTML = data;
// });

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


// product grid home page 
const createProductGrid = () => {
  for (let i=1; i <=2; i++){
    $("#product-grid").append(`
       <article class="card">
        <div class="card-media">
          <img src=${mocktailsArray[i].img} alt= ${mocktailsArray[i].name} />
        </div>
        <div class="card-body">
          <h3>${mocktailsArray[i].name}</h3>
          <a href="/shop.html" class="button">Buy Now</a>
        </div>
    </article>`
    )
  }
}

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
document.addEventListener('DOMContentLoaded', function(){
  if($("#product-grid")){
    createProductGrid()
  }
})

// Example of adding a new item (could be triggered by user action)
function addItemToOrder(name, price, quantity) {
  orderItems.push({ name, price, quantity });
  renderOrderSummary();}

  function show(shown, hidden){
    document.getElementById(shown).style.display='block';
    document.getElementById(hidden).style.display='none';
    return false;
  }



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
      appendTo: 'body',
      autoOpen: false, 
      width: '75vw',
      modal: true,
      show: {
        effect: "fade",
        duration: 800
      },
      open: function(){
        $("#shop-overlay").fadeIn(800);
      },
      close: function(){
        $("#shop-overlay").fadeOut(800);
      },
      hide: {
        effect: "fade",
        duration: 1000
      },
    });


const updateProductDetailCard = (product) => {
  /*clear out content */ 
  $("#product-name").text(""); 
  $(".modal-price").text(""); 
  $("#flavors").text("");
  $(".product-qty").val(1); 


  $("#product-name").text(product.name); 
  $(".modal-price").text(`$${product.price} / bottle (750mL)`); 
  $(".modal-card").attr("id", `modal-${product.id}`); 
  let flavorsDiv = $("#flavors"); 
  for (let i=0;i < product.flavor.length; i++){
    flavorsDiv.append(
      `<div class="badge badge-pill modal-card-btn flavor-tag"> 
        ${product.flavor[i]}
      </div>`
    )
  }
  $("#description").text(product.desc); 
  $("#product-button").attr("data-mocktail", product.id); 
}

// shop button add to cart: 
$(".shop-btn").on("click", function(e){
  let product = {}; 
  const productId = parseInt(e.target.dataset.mocktail); 
  let existingProduct = cart.find(item => item.id === productId);
  let productQty = parseInt($(".product-qty").val());
  if (existingProduct){
    if (productQty){
      existingProduct.quantity+= productQty; 
    }else{
      existingProduct.quantity += 1; 
    }
  }else{
    product.id = productId; 
    product.quantity = 1; 
    cart.push(product); 
  }
  console.log("CURRENT CART", cart);
}); 