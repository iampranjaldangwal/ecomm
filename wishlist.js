document.addEventListener("DOMContentLoaded", () => {
  console.log("wishlist.js loaded!");

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("fa-heart")) {
      const productContainer = event.target.closest(".mufti-product");
      if (!productContainer) return;

      const name = productContainer.querySelector(".product-title")?.textContent?.trim();
      const price = parseFloat(productContainer.querySelector(".discounted-price")?.textContent.replace("₹", "").replace(",", "") || 0);
      const image = productContainer.querySelector("img")?.getAttribute("src");

      if (!name || !price || !image) return;

      const newItem = { name, price, imgSrc: image };

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (!wishlist.find(item => item.name === newItem.name)) {
        wishlist.push(newItem);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert(`${newItem.name} has been added to your wishlist.`);
        renderWishlist();
      }
    }

    if (event.target.classList.contains("increase-qty")) {
      const qtySpan = event.target.previousElementSibling;
      let qty = parseInt(qtySpan.textContent);
      qtySpan.textContent = qty + 1;
    }
  
    if (event.target.classList.contains("decrease-qty")) {
      const qtySpan = event.target.nextElementSibling;
      let qty = parseInt(qtySpan.textContent);
      if (qty > 1) {
        qtySpan.textContent = qty - 1;
      }
    }

    if (event.target.classList.contains("add-to-cart")) {
      const index = event.target.getAttribute("data-index");
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const item = wishlist[index];
    
      // Add item to cart
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const alreadyInCart = cart.find(cartItem => cartItem.name === item.name);
      if (!alreadyInCart) {
        cart.push({ ...item, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${item.name} added to cart`);
      } else {
        alert(`${item.name} is already in your cart`);
      }
    }
    

    if (event.target.classList.contains("delete-item") || event.target.closest(".delete-item")) {
      const index = event.target.closest(".delete-item").getAttribute("data-index");
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      renderWishlist();
    }
  });

  renderWishlist();
});

function renderWishlist() {
  const container = document.getElementById("wishlist-items");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.length === 0) {
    container.innerHTML = "<p class='empty-cart-message'>Your wishlist is empty</p>";
    return;
  }

  container.innerHTML = wishlist.map((item, index) => `
  <div class="cart-item">
    <img src="${item.imgSrc}" alt="${item.name}" />
    <button class="delete-item" data-index="${index}">
      <i class="fa fa-times"></i>
    </button>
    <div class="cart-item-details">
      <p><strong>${item.name}</strong></p>
      <p class="size">${item.size || "30"}</p>

      <div class="price-qty-row">
    <p class="price">Rs. ${item.price}</p>
    <div class="quantity-selector">
    <button class="decrease-qty">-</button>
    <span>1</span>
    <button class="increase-qty">+</button>
  </div>
</div>

      <button class="add-to-cart" data-index="${index}">ADD TO CART</button>
    </div>
  </div>
`).join("");

}

function clearWishlist() {
  localStorage.removeItem("wishlist");
  renderWishlist();
}

