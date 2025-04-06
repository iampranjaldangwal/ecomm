function addToCart(id, name, price) {
  const product = document.querySelector(`.product[data-id="${id}"]`);
  const imgSrc = product.querySelector("img").getAttribute("src");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.id === id);

  if (index > -1) {
      cart[index].quantity += 1;
  } else {
      cart.push({ id, name, price, quantity: 1, img: imgSrc });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById(`qty-${id}`).textContent = cart.find(item => item.id === id).quantity;
}

