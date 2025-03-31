<<<<<<< HEAD
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        
        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₹${item.price * item.quantity} 
            <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
            ${item.quantity}
            <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
        `;

        cartItems.appendChild(li);
    });

    cartTotal.textContent = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQuantity(id, change) {
    let item = cart.find(product => product.id === id);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(product => product.id !== id);
        }
    }

    updateCart();
}

updateCart();
=======
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        
        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₹${item.price * item.quantity} 
            <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
            ${item.quantity}
            <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
        `;

        cartItems.appendChild(li);
    });

    cartTotal.textContent = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQuantity(id, change) {
    let item = cart.find(product => product.id === id);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(product => product.id !== id);
        }
    }

    updateCart();
}

updateCart();
>>>>>>> main
