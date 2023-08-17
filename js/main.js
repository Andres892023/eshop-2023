const url = "https://ecommercebackend.fundamentos-29.repl.co";
let products = [];

fetch(url)
      .then(response => response.json())
      .then((data)=>{
            products = data;
            loadproducts(products);
      })

const productsContainer = document.querySelector("#container-main");
const categoryButtons = document.querySelectorAll(".category-button");
const maintitleselect = document.querySelector("#main-title-select");
let buttonsAdd = document.querySelectorAll(".add-product");
const qproductsAdded = document.querySelector("#q_products_added"); 



function loadproducts(productsSelection) {
    
    productsContainer.innerHTML = "";
    productsSelection.forEach(product => {
       
       const div = document.createElement("div");
       div.classList.add("product");
       div.innerHTML = 
            `<img class="img-product" src="${product.image}" alt="${product.name}">  
            <div class="details-product">
                <h3 class="title-product">${product.name}</h3>
                <p class="price-product">$ ${product.price}</p>
                <p class="stock-production">Cantidad en stock: ${product.quantity }</p>  
                <button class="add-product" id="${product.id}">Agregar</button>
                <button class="detail-product" id="${product.id}">Detalles</button>
            </div>
            `;

        productsContainer.append(div);
                
    });


    loadProductDetail ();
    loadAddButton();    
}



categoryButtons.forEach(button => {
    button.addEventListener("click", (e) => {
    
        categoryButtons.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "all-products") {
             const productsButton = products.filter(product => product.category === e.currentTarget.id);
             loadproducts(productsButton);
             maintitleselect.innerHTML  = `${e.currentTarget.innerText}`
    
        } else {
             maintitleselect.innerHTML = "Todos Los Productos"     
             loadproducts(products);
        }
     
        
      });
})



function loadAddButton() {
      buttonsAdd = document.querySelectorAll(".add-product");

      buttonsAdd.forEach(button => {
            button.addEventListener('click', cartAdd);
            
      });
}


let cartProductsOn;

let cartProductsOnLS = localStorage.getItem("products-Added-on-cart");

if(cartProductsOnLS) {
      cartProductsOn = JSON.parse(cartProductsOnLS);
      loadQproductsAdded();
} else {
      cartProductsOn = [];
}


function cartAdd(e) {

      let idButton = e.currentTarget.id;
      const productAdded = products.find(product => product.id == idButton);
      let quantityBuy
      let quantity
      
      if(cartProductsOn.some(product => product.id == idButton)) {
            const index = cartProductsOn.findIndex(product => product.id == idButton);
            cartProductsOn[index].quantityBuy++;
          

            
      } else {
            productAdded.quantityBuy = 1;
            cartProductsOn.push(productAdded);        

      }

      loadQproductsAdded();

      localStorage.setItem("products-Added-on-cart", JSON.stringify(cartProductsOn));
}

function loadQproductsAdded () {
      let qproductsAddedN = cartProductsOn.reduce((acc, product) => acc + product.quantityBuy, 0);
      qproductsAdded.innerText = qproductsAddedN; 
}

function loadProductDetail () {
      const buttonDetail = document.querySelectorAll(".detail-product");
      const modal = document.querySelector("#modal");
      const containerDetail = document.querySelector(".modal-container");
      let  product = products;
      
      buttonDetail.forEach(button => {
            button.addEventListener("click", (e)=>{
                  modal.classList.add("show---modal");          
                        const detailProduct = products.filter(product => product.id == e.currentTarget.id);
                  
                        detailProduct.forEach(product => {
                  
                        const div = document.createElement("div");
                        div.classList.add("product-detail");
                        div.innerHTML = 
                        `<img class="img-product" src="${product.image}" alt="${product.name}">  
                        <div class="details-product">
                              <h3 class="title-product">${product.name}</h3>
                              <p class="price-product">$ ${product.price}</p>
                              <p class="stock-production">Cantidad en stock: ${product.quantity }</p>
                              <p class="description">${product.description}</p>
                              <button class="close-modal" id="close-modal">Cerrar</button>
                        </div>
                         `;

                        containerDetail.append(div); 

                  })
                  const closeModal =  document.querySelector(".close-modal");
                  closeModal.addEventListener("click", (e)=>{
                        containerDetail.innerHTML=""
                        modal.classList.remove('show---modal');
            });

            });

      

});
}
