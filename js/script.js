// **Navigasi Responsif**
const menuButton = document.getElementById("menu");
const navBar = document.querySelector(".nav-bar");

menuButton.onclick = ()=> {
    navBar.classList.toggle('active')
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
    search = searchContainer.classList.toggle('active')}

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
cartContainer.classList.toggle('active');
}

document.addEventListener('click', (e) => {
if(!cartBtn.contains(e.target) && !cartContainer.contains(e.target)){
    cartContainer.classList.remove('active')

}
});

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




