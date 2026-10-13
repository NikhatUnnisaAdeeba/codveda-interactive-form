const form = document.getElementById("signupForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");

const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (event) {
  // Stop the form from refreshing the page.
  event.preventDefault();

  // Clear old error messages.
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmError.textContent = "";

  formMessage.textContent = "";
  formMessage.className = "";

  // Remove old error borders.
  const inputs = form.querySelectorAll("input");

  inputs.forEach(function (input) {
    input.classList.remove("invalid");
  });

  let isValid = true;

  // Check the full name.
  if (fullName.value.trim() === "") {
    nameError.textContent = "Please enter your name.";
    fullName.classList.add("invalid");
    isValid = false;
  }

  // Check the email format.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.value.trim())) {
    emailError.textContent = "Please enter a valid email address.";
    email.classList.add("invalid");
    isValid = false;
  }

  // Check the password length.
  if (password.value.length < 8) {
    passwordError.textContent =
      "Password must contain at least 8 characters.";

    password.classList.add("invalid");
    isValid = false;
  }

  // Check whether both passwords match.
  if (confirmPassword.value !== password.value ||
      confirmPassword.value === "") {
    confirmError.textContent = "Passwords do not match.";
    confirmPassword.classList.add("invalid");
    isValid = false;
  }

  // Show the final result.
  if (isValid) {
    formMessage.textContent =
      "Form submitted successfully! This is a demo.";

    formMessage.classList.add("success");

    form.reset();
  } else {
    formMessage.textContent =
      "Please correct the errors above.";

    formMessage.classList.add("failure");
  }
});