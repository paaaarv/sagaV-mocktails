let shoppingCart = JSON.parse(localStorage.getItem('saga-v-cart')) || []; 



// dynamic cart quantity 
$("#cart-quantity").text(cart.length); 


//add items dynamically to page from cart 
const showCart = () => {
    for (let i=0; i < shoppingCart.length; i++){
        let product = shoppingCart[i]; 
        let mocktail = mocktailsArray.find(drink => drink.id == product.id); 

        $("#cart-items").append(`
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
                         <i class="fa-regular fa-trash-can" style="color: #cfb482;"></i>
                    </button>
                    <p>$${mocktail.price} </p>
                </div>
            </div>`
        )
    }
}

showCart();