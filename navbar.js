document.addEventListener("DOMContentLoaded", function () {
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;

            setTimeout(() => {
                const menuIcon = document.getElementById("open-menu");
                const sidebar = document.getElementById("sidebar");
                const sidebarLinks = document.querySelectorAll("#sidebar a"); // Select all sidebar links

                // Ensure the sidebar is closed when a new page loads
                sidebar.style.width = "0";

                // Toggle Sidebar
                if (menuIcon && sidebar) {
                    menuIcon.addEventListener("click", function () {
                        sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
                    });
                }

                // Close Sidebar when clicking the close button
                const closeBtn = document.querySelector(".closebtn");
                if (closeBtn) {
                    closeBtn.addEventListener("click", function () {
                        sidebar.style.width = "0";
                    });
                }

                // Close Sidebar when clicking any link inside it
                sidebarLinks.forEach(link => {
                    link.addEventListener("click", function () {
                        sidebar.style.width = "0";
                    });
                });

                const searchWrapper = document.querySelector(".search-wrapper");
                const searchIcon = document.querySelector(".search-icon");
                const searchInput = document.querySelector(".search-bar");
              
                // Open input on search icon click
                searchIcon.addEventListener("click", function (e) {
                  e.stopPropagation(); // Prevent from triggering document click
                  searchWrapper.classList.add("active");
                  searchInput.focus();
                });
              
                
                // Close input on clicking anywhere else
                document.addEventListener("click", function () {
                  searchWrapper.classList.remove("active");
                  searchInput.value = "";
                });

            }, 100);
        })
        .catch(error => console.error("Error loading navbar:", error));
});







