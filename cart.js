document.addEventListener("DOMContentLoaded", () => {
  console.log("cart.js loaded!");

  // Handle cart item click
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("fa-shopping-bag")) {
      console.log("Bag icon clicked ✅");

      const productContainer = event.target.closest(".mufti-product");
      if (!productContainer) return;

      const name = productContainer.querySelector(".product-title")?.textContent?.trim();
      const priceElement = productContainer.querySelector(".discounted-price");
      const imgElement = productContainer.querySelector("img");

      if (!name || !priceElement || !imgElement) {
        console.error("Missing product information.");
        return;
      }

      const price = parseFloat(priceElement.textContent.replace("₹", "").trim());
      const image = imgElement.getAttribute("src");

      const newItem = {
        name,
        price,
        imgSrc: image,
        quantity: 1
      };

      // Retrieve existing cart or initialize a new one
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the item is already in the cart
      const existingIndex = cart.findIndex(item => item.name === newItem.name);
      if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push(newItem);
      }

      // Save updated cart
      localStorage.setItem("cart", JSON.stringify(cart));

      // Optional: Alert user
      alert(`${newItem.name} has been added to your cart.`);

      // Render the updated cart items
      renderCartOnPage();
    }
  });

  // Render cart items on the page
  renderCartOnPage();
});

function renderCartOnPage() {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartContainer || !cartTotal) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = ""; // Clear existing items

  // Check if the cart is empty
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='empty-cart-message'>Your cart is empty</p>";
    cartTotal.textContent = "0.00"; // Set total to 0 if the cart is empty
    return;
  }

  let total = 0;

  // Display cart items if the cart is not empty
  cart.forEach((item) => {
    const itemHTML = `
      <div class="cart-item">
        <img src="${item.imgSrc}" alt="${item.name}" />
        <div class="cart-item-details">
          <p><strong>${item.name}</strong></p>
           <p>₹${item.price}</p>
           <p>Quantity: ${item.quantity}</p>
          <p>Subtotal: ₹${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    `;
    cartContainer.innerHTML += itemHTML;
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total.toFixed(2);
}

function clearCart() {
  localStorage.removeItem("cart");
  renderCartOnPage();
}

function checkout() {
  alert("Proceeding to checkout...");
}