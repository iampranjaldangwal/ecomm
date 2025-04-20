let selectedSize = null;  // Global variable to store selected size

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-shopping-bag")) {
        console.log("Bag icon clicked ✅");
        fetch("sizeSelector.html")
            .then((res) => res.text())
            .then((html) => {
                console.log(html);
                const wrapper = document.createElement("div");
                wrapper.innerHTML = html;
                const overlay = wrapper.firstElementChild;

                overlay.classList.add("size-selector-overlay");
                document.body.appendChild(overlay);

                const closeBtn = overlay.querySelector(".close-size-selector");
                const sizeBtns = overlay.querySelectorAll(".size-option");

                if (closeBtn) {
                    closeBtn.addEventListener("click", () => {
                        overlay.remove();
                    });
                }

                sizeBtns.forEach((btn) => {
                    btn.addEventListener("click", () => {
                        selectedSize = btn.textContent;  // Store selected size
                        alert(`Selected size: ${selectedSize}`);
                        overlay.remove();
                    });
                });
            })
            .catch((err) => {
                console.error("Error fetching sizeSelector.html:", err);
            });
    }
});
