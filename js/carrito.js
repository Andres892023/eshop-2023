let cartProductsOn = localStorage.getItem("products-Added-on-cart");
cartProductsOn = JSON.parse(cartProductsOn);


const containerEmptyCart = document.querySelector("#empty-cart");
const containerCartProducts = document.querySelector("#cart-products");
const ContainerCartActions = document.querySelector("#cart-products-actions");
const ContainerCartBought = document.querySelector("#cart-bought");
let deleteButtons = document.querySelector(".cart-product-delete");
const deleteAllButton = document.querySelector("#cart-actions-empty");
const totalContainer = document.querySelector("#total");
const buyAllButton = document.querySelector("#cart-actions-buy");


function loadProductsonCart() {

    if(cartProductsOn && cartProductsOn.length > 0) {

        
 
        containerEmptyCart.classList.add("disabled");
        containerCartProducts.classList.remove("disabled");
        ContainerCartActions.classList.remove("disabled");
        ContainerCartBought.classList.add("disabled");
    
        containerCartProducts.innerHTML = "";
        cartProductsOn.forEach(product => {

            const div = document.createElement("div");
            div.classList.add("cart-product");
            div.innerHTML = 
                `<img class="cart-product-img" src="${product.image}" alt="${product.name}">
                <div class="cart-product-title">
                <small>Artículo</small>
                <h3>${product.name}</h3>
                </div>
                <div class="cart-product-quantity">
                    <small>Cantidad</small>
                    <p>${product.quantityBuy}</p>
                </div>
                <div class="cart-product-price">
                    <small>Precio</small>
                    <p>$${product.price}</p>
                </div>
                <div class="cart-product-subtotal">
                    <small>Subtotal</small>
                    <p>$${product.price * product.quantityBuy}</p>
                </div>
                <button class="cart-product-delete" id="${product.id}"><i class="bi bi-trash"></i></button>
                `;
        
            containerCartProducts.append(div);
        
        });
    
    }  else {

        containerEmptyCart.classList.remove("disabled");
        containerCartProducts.classList.add("disabled");
        ContainerCartActions.classList.add("disabled");
        ContainerCartBought.classList.add("disabled");

    }

    loadAddButtonDelete();
    loadTotal();
}

loadProductsonCart()


function loadAddButtonDelete() {
    deleteButtons = document.querySelectorAll(".cart-product-delete");

    deleteButtons.forEach(button => {
          button.addEventListener('click', deleteFromCart);
    })
}

function deleteFromCart(e) {
    const idButton = e.currentTarget.id;
    console.log(idButton);
    const index = cartProductsOn.findIndex(product => product.id == idButton);
    
    cartProductsOn.splice(index, 1);
    loadProductsonCart();

    localStorage.setItem("products-Added-on-cart", JSON.stringify(cartProductsOn));


}

deleteAllButton.addEventListener("click", emptyCartatAll);

function emptyCartatAll () {

    if (confirm ("¿esta seguro?")) {

    cartProductsOn.length = 0;
    localStorage.setItem("products-Added-on-cart", JSON.stringify(cartProductsOn));
    loadProductsonCart();
    
    }else {
        loadAddButtonDelete();
    }
}

function loadTotal() {
    const totalCalculate =  cartProductsOn.reduce((acc, product) => acc + (product.price * product.quantityBuy), 0);
    totalContainer.innerText = `$${totalCalculate}`;
}

buyAllButton.addEventListener("click", buyAllItems);

function buyAllItems () {

    if (confirm ("¿desea comprar los productos seleccionados?")) {

        cartProductsOn.length = 0;
        localStorage.setItem("products-Added-on-cart", JSON.stringify(cartProductsOn));
        
        containerEmptyCart.classList.add|("disabled");
        containerCartProducts.classList.add("disabled");
        ContainerCartActions.classList.add("disabled");
        ContainerCartBought.classList.remove("disabled");
        
    
    }else {
        loadProductsonCart();

    }
}
