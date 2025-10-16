let shoppingCart = JSON.parse(localStorage.getItem('saga-v-cart')) || []; 
let cartQuantity = 0; 
let subtotal = 0; 
let delivery = 5.99; 
let fees = 0; 
let total = 0; 
//calculate totals 
const calculateTotals = () => {
    // dynamic cart quantity 
    $("#cart-quantity").text(cartQuantity); 
    fees = parseFloat((subtotal * 0.075).toFixed(2));
    total = (subtotal + fees + delivery).toFixed(2);
}


//add items dynamically to page from cart 
const showCart = () => {
    for (let i=0; i < shoppingCart.length; i++){
        let product = shoppingCart[i]; 
        let mocktail = mocktailsArray.find(drink => drink.id == product.id); 
        cartQuantity += product.quantity; 
        subtotal += parseFloat(product.quantity * mocktail.price); 

        $("#cart-items").append(`
            <div>
                <div class="cart-item">
                    <img src=${mocktail.img} class="cart-img" alt= "${mocktail.name}"/>
                    <div class="cart-info">
                        <h3>${mocktail.name}</h3>
                        <div class="qty">
                            <button class="qty-btn">−</button>
                            <input type="number" class="qty-input" value= ${product.quantity}  min="1" />
                            <button class="qty-btn">+</button>
                        </div>
                    </div>
                    <div class="cart-meta">
                        <button class="trash" aria-label="Remove ${mocktail.name}">
                            <i class="fa-regular fa-trash-can trash-can" style="color: #cfb482;"></i>
                        </button>
                        <p>$${mocktail.price} </p>
                    </div>
                </div>
                <hr>
            </div>`
        )
    }
}


const showOrderSummary = () => { 
    $("#summary-container").append(`<div>
            <div class="summary-row"><span>Subtotal: </span><span>$${subtotal}</span></div>
                <div class="summary-row"><span>Taxes &amp; Fees: </span><span>$${fees}</span></div>
                <div class="summary-row"><span>Shipping Fee: </span><span>$${delivery}</span></div>
                <hr />
                <div class="total-row">
                   <span>Total: </span><span>$${total}</span> 
                </div>
                <button class="checkout-btn">Checkout</button>
            </div>`
        )
}



// add document loaded event listener 

showCart();
calculateTotals(); 
showOrderSummary();
