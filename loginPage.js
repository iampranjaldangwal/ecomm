document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");
    
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission
        
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let isValid = true;

        // Email validation
        if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
            alert("Please enter a valid email.");
            isValid = false;
        }

        // Password validation
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            isValid = false;
        }

        if (isValid) {
            alert("Login successful! Redirecting...");
            loginForm.submit(); // Submit if all checks pass
        }
    });
});
