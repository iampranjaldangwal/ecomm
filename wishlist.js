// Sample product data
const products = [
  {
    id: 1,
    name: "Graphic Print Tee",
    price: 700,
    image: "images/plainTee/plainTee1.jpg"
  },
  {
    id: 2,
    name: "Floral Printed Tee",
    price: 750,
    image: "images/plainTee/plainTee2.jpg"
  },
  {
    id: 3,
    name: "Cartoon Printed Tee",
    price: 800,
    image: "images/plainTee/plainTee3.jpg"
  },
  {
    id: 4,
    name: "Floral Printed Tee",
    price: 750,
    image: "images/plainTee/plain4.jpg"
  },
  {
    id: 5,
    name: "Floral Printed Tee",
    price: 750,
    image: "images/plainTee/plain5.jpg"
  }
];

// Retrieve wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Function to render wishlist items
function renderWishlist() {
  const container = document.getElementById('wishlist-container');
  container.innerHTML = ''; // Clear existing content

  if (wishlist.length === 0) {
    container.innerHTML = '<p>Your wishlist is empty.</p>';
    return;
  }

  wishlist.forEach(id => {
    const product = products.find(p => p.id === id);
    if (product) {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'wishlist-item';

      itemDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button class="remove-btn" onclick="removeFromWishlist(${product.id})">Remove</button>
      `;

      container.appendChild(itemDiv);
    }
  });
}

// Function to remove item from wishlist
function removeFromWishlist(id) {
  wishlist = wishlist.filter(itemId => itemId !== id);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  renderWishlist();
}

// Initialize wishlist on page load
document.addEventListener('DOMContentLoaded', renderWishlist);
