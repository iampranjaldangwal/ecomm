function addToCart(id, name, price) {
  const product = document.querySelector(`.product[data-id="${id}"]`);
  const imgElement = product ? product.querySelector("img") : null;
  const imgSrc = imgElement ? imgElement.getAttribute("src") : "";

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItemIndex = cart.findIndex((item) => item.id === id);
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1, image: imgSrc }); // ✅ Save image!
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateQuantityDisplay(id);
}



