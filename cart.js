document.addEventListener("DOMContentLoaded", () => {
  console.log("cart.js loaded!");

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

          const size = selectedSize || productContainer.querySelector(".product-size")?.textContent?.trim(); // Use selected size or default from product
          const color = productContainer.querySelector(".product-color")?.textContent?.trim();

          if (!size) {
              alert("Please select a size before adding the item to the cart.");
              return;
          }

          const newItem = {
              name,
              price,
              imgSrc: image,
              size,
              color,
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


          // Render the updated cart items
          renderCartOnPage();
      }
  });

  // Render cart items on the page
  renderCartOnPage();
});
