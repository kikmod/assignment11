document.addEventListener("DOMContentLoaded", function() {
  const signupLink = document.getElementById("signupLink");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  signupLink.addEventListener("click", function() {
    loginForm.classList.add("d-none");
    signupForm.classList.remove("d-none");
  });

  const signupBtn = document.getElementById("signupBtn");
  signupBtn.addEventListener("click", function(event) {
    event.preventDefault();

    clearValidationMessages();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (validateInputs(name, email, password)) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      displayMessage("Signup successful!", "success", "signupMessage");

      loginForm.classList.remove("d-none");
      signupForm.classList.add("d-none");
    }
  });

  const loginLink = document.getElementById("loginLink");
  loginLink.addEventListener("click", function() {
    loginForm.classList.remove("d-none");
    signupForm.classList.add("d-none");
  });

  const loginBtn = document.getElementById("loginBtn");
  loginBtn.addEventListener("click", function(event) {
    event.preventDefault();

    clearValidationMessages();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (validateLogin(email, password)) {
      window.location.href = "home.html"; 
    } else {
      displayMessage("Invalid email or password.", "error", "loginMessage");
    }
  });

  function validateInputs(name, email, password) {
    let isValid = true;

    if (!name || !email || !password) {
      displayMessage("All inputs are required.", "error", "signupMessage");
      isValid = false;
    } else {
      if (emailExists(email)) {
        displayMessage("This email already exists.", "error", "signupEmail");
        isValid = false;
      } else if (!validateEmail(email)) {
        displayMessage("Valid email is required.", "error", "signupEmail");
        isValid = false;
      }
      if (!validatePassword(password)) {
        displayMessage("Password must be at least 8 characters long and contain at least one letter and one number.", "error", "signupPassword");
        isValid = false;
      }
    }

    return isValid;
  }

  function validateLogin(email, password) {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    return email === storedEmail && password === storedPassword;
  }

  function emailExists(email) {
    return localStorage.getItem("email") === email;
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  }

  function displayMessage(message, type, elementId) {
    const messageDiv = document.getElementById(elementId);
    messageDiv.className = `validation-message ${type}`;
    messageDiv.textContent = message;
  }

  function clearValidationMessages() {
    const signupMessageDiv = document.getElementById("signupMessage");
    signupMessageDiv.textContent = '';
    signupMessageDiv.className = 'validation-message';

    const loginMessageDiv = document.getElementById("loginMessage");
    loginMessageDiv.textContent = '';
    loginMessageDiv.className = 'validation-message';
  }
});
