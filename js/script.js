// **Navigasi Responsif**
const menuButton = document.getElementById("menu");
const navBar = document.querySelector(".nav-bar");

menuButton.onclick = ()=> {
    navBar.classList.toggle('active')
    cartContainer.classList.remove('active')
}

document.addEventListener('click', (e) =>{
    if(!menuButton.contains(e.target) && !navBar.contains(e.target)){
        navBar.classList.remove('active')
    }
})


// **Fitur Search Produk**
const searchInput = document.getElementById("searchInput");
const searchContainer = document.querySelector('.search-container')
const search = document.getElementById('search')
search.onclick = () => {
    searchContainer.classList.toggle('active')
    cartContainer.classList.remove('active')
}

document.addEventListener('click', (e) => {
    if(!search.contains(e.target) && !searchContainer.contains(e.target)){
        searchContainer.classList.remove('active')

    }
})
 function searchProduct() {
    const searchText = searchInput.value.toLowerCase();
    const products = document.querySelectorAll(".catalog-card");
    
    products.forEach(product => {
        const productName = product.getAttribute("data-name").toLowerCase();
        if (productName.includes(searchText)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

searchInput.addEventListener('input', searchProduct);


//fitur cart logo 
const cartBtn = document.getElementById('shopping-cart');
const cartContainer = document.querySelector('.cart-container');

cartBtn.onclick = () =>{
cartContainer.classList.toggle('active')
}



// **Fitur Lihat Detail Produk**

function showProductDetails(event) {
event.preventDefault()
const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");

let productCard = event.target.closest(".catalog-card");
let productName = productCard.getAttribute("data-name");
let productPrice = productCard.getAttribute("data-price");
let productImage = productCard.querySelector("img").src;

modalTitle.textContent = productName;
modalPrice.textContent = `Price: $${productPrice}`;
modalImage.src = productImage;
modalDescription.textContent = `This is a high-quality ${productName}. Perfect for your wardrobe!`;

modal.style.display = "flex";
}

function closeModal() {
document.getElementById("productModal").style.display = "none";
}

function initializeEventListeners() {
document.querySelectorAll(".catalog-card a[id='viewBTn']").forEach(button => {
    button.addEventListener("click", showProductDetails);
});
document.querySelector(".close").addEventListener("click", closeModal);
window.addEventListener("click", function (event) {
    if (event.target === document.getElementById("productModal")) {
        closeModal();
    }
});
}

initializeEventListeners();

//function to add cart
   
const cartItems = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const modalAddToCartBtn = document.getElementById("modalbtn");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const li = document.createElement("li");
            li.innerHTML = `<img src="${item.image}" alt="${item.name}" style="width:50px; height:50px; margin-right:10px;"> 
                            ${item.name} $${item.price.toFixed(2)} x ${item.quantity} 
                            <button class="remove-item" data-index="${index}">X</button>`;
            cartItems.appendChild(li);
        });
        totalPriceElement.textContent = total.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
        attachRemoveEvent();
    }

    function attachRemoveEvent() {
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    function addToCart(name, price, image) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }
        updateCart();
    }

    document.querySelectorAll(".add-cart-btn").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const productCard = this.closest(".catalog-card");
            const name = productCard.getAttribute("data-name");
            const price = parseFloat(productCard.getAttribute("data-price"));
            const image = productCard.querySelector("img").src;
            addToCart(name, price, image);
            cartContainer.classList.toggle('active')
        });
    });

    modalAddToCartBtn.addEventListener("click", function () {
        const modalTitle = document.getElementById("modalTitle").textContent;
        const modalPrice = parseFloat(document.getElementById("modalPrice").textContent.replace("Price: $", ""));
        const modalImage = document.getElementById("modalImage").src;
        addToCart(modalTitle, modalPrice, modalImage);
        cartContainer.classList.toggle('active')
    });

    updateCart();



