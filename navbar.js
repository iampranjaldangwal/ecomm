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
  e.stopPropagation(); // Prevent this click from bubbling up
  searchWrapper.classList.add("active");
  searchInput.focus();
});

// Stop click inside the wrapper from closing it
searchWrapper.addEventListener("click", function (e) {
  e.stopPropagation();
});

// Close input on clicking outside
document.addEventListener("click", function () {
  searchWrapper.classList.remove("active");
  searchInput.value = "";
});



                //form
               
                    const requestOtpBtn = document.getElementById('requestOtpBtn');
                    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
                  
                    if (requestOtpBtn) {
                      requestOtpBtn.addEventListener('click', function () {
                        const mobileNumber = document.getElementById('mobileNumber').value.trim();
                        if (!/^\d{10}$/.test(mobileNumber)) {
                          alert("Please enter a valid 10-digit mobile number.");
                          return;
                        }
                  
                        document.getElementById('mobileStep').style.display = 'none';
                        document.getElementById('otpStep').style.display = 'block';
                      });
                    }
                  
                    if (verifyOtpBtn) {
                      verifyOtpBtn.addEventListener('click', function () {
                        const otp = document.getElementById('otp').value.trim();
                        if (otp !== "123456") {
                          alert("Invalid OTP.");
                          return;
                        }
                  
                        document.getElementById('otpStep').style.display = 'none';
                        document.getElementById('detailsStep').style.display = 'block';
                      });
                    }
                  
                    const loginForm = document.querySelector("#loginForm");
                    if (loginForm) {
                      loginForm.addEventListener("submit", function (event) {
                        event.preventDefault();
                        const fullName = document.getElementById('fullName').value.trim();
                        const email = document.getElementById('email').value.trim();
                  
                        if (fullName === "" || !email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
                          alert("Please fill in valid name and email.");
                          return;
                        }
                  
                        alert("Login successful!");
                      });
                    }
                  
                   
                 
                  
            }, 100);
        })
        .catch(error => console.error("Error loading navbar:", error));   
});


