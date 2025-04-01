// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Register with Email & Password
document.getElementById("register-form").addEventListener("submit", function (event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
  }

  auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          alert("Registration Successful!");
          window.location.href = "loginPage.html"; // Redirect to login after successful registration
      })
      .catch((error) => {
          alert(error.message);
      });
});

// Google Sign-up
document.getElementById("google-register").addEventListener("click", function () {
  signInWithGoogle();
});

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
      .then((result) => {
          let user = result.user;
          alert("Welcome " + user.displayName + "! Registration successful.");
          window.location.href = "dashboard.html"; // Redirect after successful login
      })
      .catch((error) => {
          console.error("Error during Google Sign-Up:", error);
          alert("Google Sign-Up failed. Try again.");
      });
}

