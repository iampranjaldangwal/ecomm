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

      const price = parseFloat(priceElement.textContent.replace('₹', '').replace(',', '').trim());
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

    // Handle quantity changes
    if (event.target.classList.contains("increase-quantity")) {
      updateQuantity(event, 1);
    }

    if (event.target.classList.contains("decrease-quantity")) {
      updateQuantity(event, -1);
    }

    // Handle item deletion (including when icon inside button is clicked)
if (
  event.target.classList.contains("delete-item") ||
  event.target.closest(".delete-item")
) {
  deleteCartItem(event);
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
    cartTotal.textContent = "0.00"; 
    return;
  }

  let total = 0;

  // Display cart items if the cart is not empty
  cart.forEach((item, index) => {
    const itemHTML = `
    <div class="cart-item">
      <img src="${item.imgSrc}" alt="${item.name}" />
      <div class="cart-item-details">
        <p><strong>${item.name}</strong></p>
        <p>₹${item.price}</p>
        <p>
          Quantity: 
          <button class="decrease-quantity" data-index="${index}">-</button>
          ${item.quantity}
          <button class="increase-quantity" data-index="${index}">+</button>
        </p>
        <p class="subtotal-container">
          Subtotal: ₹${(item.price * item.quantity).toFixed(2)}
          <button class="delete-item" data-index="${index}">
            <i class="fa fa-trash"></i> <!-- Dustbin icon -->
          </button>
        </p>
      </div>
    </div>
  `;
  

    cartContainer.innerHTML += itemHTML;
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total.toFixed(2);
}

function updateQuantity(event, change) {
  const index = event.target.getAttribute("data-index");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index]) {
    cart[index].quantity += change;

    // Prevent quantity from going below 1
    if (cart[index].quantity <= 0) {
      cart[index].quantity = 1;
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Render the updated cart items
    renderCartOnPage();
  }
}

function deleteCartItem(event) {
  const button = event.target.closest(".delete-item");
  const index = button.getAttribute("data-index");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartOnPage();
}


function clearCart() {
  localStorage.removeItem("cart");
  renderCartOnPage();
}

function checkout() {
  alert("Proceeding to checkout...");
}

// Remove leftover size selector overlay when navigating back to this page
window.addEventListener("pageshow", () => {
  const existingOverlay = document.querySelector(".size-selector-overlay");
  if (existingOverlay) {
    console.log("Removing leftover size overlay on back navigation ✅");
    existingOverlay.remove();
  }
});



