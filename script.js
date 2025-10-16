// create a cart
let cart = [];
if (localStorage.getItem("saga-v-cart")) {
  cart = JSON.parse(localStorage.getItem("saga-v-cart"));
}


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


// fetch newsletter and footer sections' 
if (document.getElementById("newsletter")){
  fetch('newsletter.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('newsletter').innerHTML = data;
  });
}
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


// Mobile me[nu toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("primary-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

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
  if (cart){
    cart.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.id} Bottle Size - $${(item.price * item.quantity).toFixed(2)}`;
      itemList.appendChild(listItem);
      total += item.price * item.quantity;
    });
  }

  // Update the total
  orderTotalSpan.textContent = `$${total.toFixed(2)}`;
}

// Call the function to render the summary when the page loads
document.addEventListener('DOMContentLoaded', function(){
  if($("#product-grid")){
    createProductGrid()
  }
  if ($("#products")){
    displayProductGrid();
  }
})


  // product grid list shop page 
  const displayProductGrid = () => { 
    for(let i=0; i < mocktailsArray.length; i++){
      let product = mocktailsArray[i]; 

      $("#products").append(`
        <article class="card">
            <div class="card-top">
              <img class="card-img" src=${product.img} alt=${product.name} />
            </div>
            <div class="card-body">
              <span class="card-detail">
                <h3> ${product.name} </h3>
                <p> $${product.price} </p>
              </span>
              <div class="card-controls">
                <button class="shop-btn card-btn" data-mocktail=${product.id} >Buy Now</button>
                <button id="view-mocktail${product.id}" class="card-btn view-product" data-mocktail=${product.id} >View Product</button>
              </div>
            </div>
          </article>`
        )
      }
    }

// Modal View functionality

$("#products").on("click", '.view-product', function(e){
  const cardId = parseInt(e.target.dataset.mocktail); 
  const card = mocktailsArray.filter((x) => x.id === cardId)[0]; 
  updateProductDetailCard(card); 
  $("#product-detail").dialog("open");

});

$("#product-detail").dialog({
      appendTo: 'body',
      autoOpen: false, 
      width: '75vw',
      modal: true,
      open: function(){
        $("#shop-overlay").fadeIn(800);
      },
      close: function(){
        $("#shop-overlay").fadeOut(800);
      }
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

$("#close-modal").on("click", function(){

  $("#product-detail").dialog("close"); 
});


// shop button add to cart: 
$("body").on("click", ".shop-btn", function(e){
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
  window.localStorage.setItem("saga-v-cart", JSON.stringify(cart)); 
}); 