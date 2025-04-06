// Load cart items on page load
window.onload = function () {
    displayCart();
  };
  
  function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = "";
    let total = 0;
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.textContent = 0;
      return;
    }
  
    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <p><strong>${item.name}</strong></p>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: ₹${item.price * item.quantity}</p>
        <button onclick="removeItem(${index})">Remove</button>
        <hr />
      `;
      cartItemsContainer.appendChild(itemDiv);
      total += item.price * item.quantity;
    });
  
    cartTotal.textContent = total;
  }
  
  function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // remove item without popup
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // reload updated cart
  }
  
  function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
  }
  
  function checkout() {
    alert("Checkout functionality coming soon!");
  }
  
  document.addEventListener("DOMContentLoaded", displayCart);

function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0";
        return;
    }

    cart.forEach(item => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Subtotal: ₹${item.price * item.quantity}</p>
            </div>
        `;

        cartContainer.appendChild(itemDiv);
    });

    cartTotal.textContent = total;
}

function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

function checkout() {
    alert("Checkout successful!");
    clearCart();
}




