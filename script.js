// Cart object to store product quantities
let cart = {};

// Function to add product to cart
function addToCart(id, name, price) {
    if (!cart[id]) {
        cart[id] = { name, price, quantity: 0 };
    }
    cart[id].quantity++;
    updateCartDisplay(id);
    updateCartTotal();
}

// Function to remove product from cart
function removeFromCart(id) {
    if (cart[id] && cart[id].quantity > 0) {
        cart[id].quantity--;
    }
    updateCartDisplay(id);
    updateCartTotal();
}

// Function to update the displayed quantity
function updateCartDisplay(id) {
    document.getElementById(`qty-${id}`).textContent = cart[id]?.quantity || 0;
}

// Function to update the cart total
function updateCartTotal() {
    let total = 0;
    for (let item in cart) {
        total += cart[item].price * cart[item].quantity;
    }
    document.getElementById("cart-total").textContent = total;
}

// Function to display cart items on the cart page
function displayCartItems() {
    let cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = ""; // Clear previous items

    for (let id in cart) {
        if (cart[id].quantity > 0) {
            let li = document.createElement("li");
            li.textContent = `${cart[id].name} x ${cart[id].quantity} - ₹${cart[id].price * cart[id].quantity}`;
            cartItemsList.appendChild(li);
        }
    }
}





