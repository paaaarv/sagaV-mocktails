let shoppingCart = JSON.parse(localStorage.getItem('saga-v-cart')) || []; 
let cartQuantity = 0; 



//add items dynamically to page from cart 
const showCart = () => {
    for (let i=0; i < shoppingCart.length; i++){
        let product = shoppingCart[i]; 
        let mocktail = mocktailsArray.find(drink => drink.id == product.id); 
        cartQuantity += product.quantity; 

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

}



// add document loaded event listener 

showCart();
// dynamic cart quantity 
$("#cart-quantity").text(cartQuantity); 