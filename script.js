// Run on page load
window.onload = function () {
    renderCartOnPage();
  };
  
  function addToCart(id, name, price) {
    const imageSrc = document.querySelector(`.product[data-id="${id}"] img`).src;
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.id === id);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id, name, price, image: imageSrc, quantity: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    updateQuantityUI(id, cart);
    renderCartOnPage();
  }
  
  function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(item => item.id === id);
  
    if (itemIndex > -1) {
      cart[itemIndex].quantity -= 1;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    updateQuantityUI(id, cart);
    renderCartOnPage();
  }
  
  function updateQuantityUI(id, cart) {
    const item = cart.find(i => i.id === id);
    document.getElementById(`qty-${id}`).textContent = item ? item.quantity : 0;
  }
  
  function renderCartOnPage() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
  
    cartItemsContainer.innerHTML = "";
    let total = 0;
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.textContent = "0";
      return;
    }
  
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-img"/>
        <div class="cart-details">
          <p><strong>${item.name}</strong></p>
          <p>₹${item.price} × ${item.quantity}</p>
          <p>Subtotal: ₹${item.price * item.quantity}</p>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemDiv);
      total += item.price * item.quantity;
    });
  
    cartTotal.textContent = total;
  }
  

//men carousel 
$('.carousel').carousel({
    interval: 5000, // Slide transition interval in milliseconds
});

let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function toggleWishlist(id) {
  const index = wishlist.indexOf(id);
  if (index > -1) {
    wishlist.splice(index, 1); // remove from wishlist
  } else {
    wishlist.push(id); // add to wishlist
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
}

function updateWishlistUI() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const productId = parseInt(btn.closest('.product').dataset.id);
    if (wishlist.includes(productId)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// On page load
window.onload = function () {
  renderCartOnPage();
  updateWishlistUI();
};





