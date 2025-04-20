if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "admin-login.html";
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "admin-login.html";
    });
});


const logoutBtn = document.getElementById("logoutBtn");
const addForm = document.getElementById("addProductForm");
const productList = document.getElementById("productList");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");

let products = JSON.parse(localStorage.getItem("products")) || [];
const PRODUCTS_PER_PAGE = 5;
let currentPage = 1;

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  location.reload();
});

// Image to base64
function toBase64(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => callback(reader.result);
  reader.readAsDataURL(file);
}

// Add Product
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = document.getElementById("productImage").files[0];
  if (!file) return alert("Please select an image");

  toBase64(file, (base64) => {
    const newProduct = {
      name: document.getElementById("productName").value,
      category: document.getElementById("productCategory").value,
      size: document.getElementById("productSizes").value,
      stock: document.getElementById("productStock").value,
      price: document.getElementById("productPrice").value,
      image: base64
    };
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    addForm.reset();
    renderProducts();
  });
});

// Render Products with pagination
function renderProducts() {
  const keyword = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const current = filtered.slice(start, start + PRODUCTS_PER_PAGE);

  productList.innerHTML = current.map((p, i) => `
    <div class="card mb-3 shadow-sm">
      <div class="row g-0 align-items-center">
        <div class="col-3 text-center">
          <img src="${p.image}" width="100" height="100" class="product-img">
        </div>
        <div class="col-6">
          <div><strong>${p.name}</strong> - ₹${p.price}</div>
          <div>Category: ${p.category}, Size: ${p.size}, Stock: ${p.stock}</div>
        </div>
        <div class="col-3 text-end pe-3">
          <button class="btn btn-sm btn-danger" onclick="deleteProduct(${i + start})">Delete</button>
        </div>
      </div>
    </div>
  `).join("");

  renderPagination(filtered.length);
}

// Delete
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

// Pagination
function renderPagination(total) {
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.onclick = () => {
      currentPage = i;
      renderProducts();
    };
    pagination.appendChild(li);
  }
}

// Search
searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderProducts();
});

// Responsive Sidebar toggle (for mobile)
function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("d-none");
}

renderProducts();
