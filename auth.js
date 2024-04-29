// Function to check password strength
function checkPasswordStrength(password) {
  let strength = 0;

  // Check length
  if (password.length >= 8) {
    strength += 1;
  }

  // Check for lowercase letters
  if (/[a-z]/.test(password)) {
    strength += 1;
  }

  // Check for uppercase letters
  if (/[A-Z]/.test(password)) {
    strength += 1;
  }

  // Check for numbers
  if (/\d/.test(password)) {
    strength += 1;
  }

  // Check for special characters
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    strength += 1;
  }

  return strength;
}

// Function to save user data to localStorage
function saveUserData(userData) {
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  // Check if the username already exists
  const userExists = users.some((user) => user.username === userData.username);

  if (userExists) {
    showError(
      "Username already taken. Please choose a different username.",
      "error"
    );
    return;
  }

  // Add the new user data to the existing user data
  users.push(userData);

  // Save the updated user data to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Redirect to login.html after successful registration
  window.location.href = "login.html";
}

// Function to validate signup form
function validateSignup() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Reset error message
  showError("", "success");

  // Validate form fields
  if (!username || !email || !password || !confirmPassword) {
    showError("Please fill in all fields.", "error");
    return false;
  }

  if (password !== confirmPassword) {
    showError("Passwords do not match.", "error");
    return false;
  }

  if (password.length < 8) {
    showError("Password must be at least 8 characters long.", "error");
    return false;
  }

  const passwordStrength = checkPasswordStrength(password);
  if (passwordStrength < 3) {
    showError(
      "Password strength is too weak. Please use a stronger password.",
      "error"
    );
    return false;
  }

  // Save user data to localStorage
  const userData = { username, email, password };
  saveUserData(userData);

  return false; // Prevent form submission
}

// Function to validate login form
let currentUser = null; // Global variable to store the current user

function validateLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Reset error message
    showError('', 'success');

    // Validate form fields
    if (!username || !password) {
        showError('Please fill in all fields.', 'error');
        return false;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if the username and password match
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Store the username in the global variable
        currentUser = username;

        // Redirect to index.html after successful login
        window.location.href = 'index.html';
    } else {
        showError('Invalid username or password.', 'error');
    }

    return false; // Prevent form submission
}


// Function to show error message
function showError(message, type) {
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.textContent = message;
  errorMessageElement.classList.remove("error", "success");
  errorMessageElement.classList.add(type);
}
